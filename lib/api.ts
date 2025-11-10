import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosError,
    AxiosResponse,
} from "axios";
import { User } from "@/types/user";
import { Order } from "@/types/order";
import { Product } from "@/types/product";

const API_BASE_URL = "https://flavour-bites-kq9n.onrender.com/api";

export interface ApiResponse<T = any> {
    data?: T;
    error?: string;
}

// Create axios instance
export const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor: attach access token (browser only)
axiosInstance.interceptors.request.use(
    (config: any) => {
        try {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("access_token");
                if (token) {
                    if (!config.headers) config.headers = {};
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
        } catch (e) {
            // ignore during SSR
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Simple refresh queue to avoid concurrent refresh calls
let isRefreshing = false;
let refreshQueue: Array<{
    resolve: (token?: string | null) => void;
    reject: (err?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    refreshQueue.forEach((p) => {
        if (error) p.reject(error);
        else p.resolve(token);
    });
    refreshQueue = [];
};

// Response interceptor: handle 401 and try refresh
axiosInstance.interceptors.response.use(
    (res: any) => res,
    async (error: any) => {
        const originalRequest = error.config as any & { _retry?: boolean };

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            let refreshToken: string | null = null;
            try {
                if (typeof window !== "undefined")
                    refreshToken = localStorage.getItem("refresh_token");
            } catch (e) {
                refreshToken = null;
            }

            if (!refreshToken) {
                // No refresh token - clear stored auth and notify listeners
                try {
                    if (typeof window !== "undefined") {
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("refresh_token");
                        localStorage.removeItem("user");
                    }
                } catch (e) {}
                if (typeof window !== "undefined")
                    window.dispatchEvent(new CustomEvent("auth:refreshFailed"));
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    refreshQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (token && originalRequest.headers)
                            originalRequest.headers[
                                "Authorization"
                            ] = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;
            try {
                const resp = await axios.post(
                    `${API_BASE_URL}/auth/token/refresh/`,
                    { refresh: refreshToken }
                );
                const newAccess = resp.data?.access as string | undefined;
                if (newAccess && typeof window !== "undefined") {
                    localStorage.setItem("access_token", newAccess);
                }
                if (typeof axiosInstance.defaults.headers !== "undefined") {
                    axiosInstance.defaults.headers.common =
                        axiosInstance.defaults.headers.common || {};
                    (axiosInstance.defaults.headers.common as any)[
                        "Authorization"
                    ] = newAccess ? `Bearer ${newAccess}` : "";
                }
                processQueue(null, newAccess || null);
                if (originalRequest.headers && newAccess)
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccess}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                // Refresh failed - clear auth and notify
                try {
                    if (typeof window !== "undefined") {
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("refresh_token");
                        localStorage.removeItem("user");
                    }
                } catch (e) {}
                if (typeof axiosInstance.defaults.headers !== "undefined") {
                    (axiosInstance.defaults.headers.common as any)[
                        "Authorization"
                    ] = "";
                }
                processQueue(err, null);
                if (typeof window !== "undefined")
                    window.dispatchEvent(new CustomEvent("auth:refreshFailed"));
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// Generic handler to normalize results
const handleApiCall = async <T>(
    request: Promise<any>
): Promise<ApiResponse<T>> => {
    try {
        const response = await request;
        return { data: response.data };
    } catch (err: any) {
        const message =
            err?.response?.data?.detail ||
            err?.response?.data?.message ||
            err?.message ||
            "An unexpected error occurred";
        return { error: message };
    }
};

// Auth API
export const authAPI = {
    login: async (phoneNumber: string, password: string) => {
        const res = await handleApiCall<any>(
            axiosInstance.post("/auth/login/", {
                phone_number: phoneNumber,
                password,
            })
        );
        if (res.data) {
            try {
                if (typeof window !== "undefined") {
                    localStorage.setItem(
                        "access_token",
                        res.data.tokens.access
                    );
                    localStorage.setItem(
                        "refresh_token",
                        res.data.tokens.refresh
                    );
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    // set default header
                    (axiosInstance.defaults.headers.common as any)[
                        "Authorization"
                    ] = `Bearer ${res.data.tokens.access}`;
                }
            } catch (e) {}
        }
        return res;
    },

    register: async (
        phoneNumber: string,
        fullName: string,
        password: string
    ) => {
        const res = await handleApiCall<any>(
            axiosInstance.post("/auth/register/", {
                phone_number: phoneNumber,
                full_name: fullName,
                password,
                password_confirm: password,
            })
        );
        if (res.data) {
            try {
                if (typeof window !== "undefined") {
                    localStorage.setItem(
                        "access_token",
                        res.data.tokens.access
                    );
                    localStorage.setItem(
                        "refresh_token",
                        res.data.tokens.refresh
                    );
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    (axiosInstance.defaults.headers.common as any)[
                        "Authorization"
                    ] = `Bearer ${res.data.tokens.access}`;
                }
            } catch (e) {}
        }
        return res;
    },

    logout: () => {
        try {
            if (typeof window !== "undefined") {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("user");
            }
        } catch (e) {}
        try {
            (axiosInstance.defaults.headers.common as any)["Authorization"] =
                "";
        } catch (e) {}
    },

    getCurrentUser: async (): Promise<User | null> => {
        try {
            if (typeof window !== "undefined") {
                const stored = localStorage.getItem("user");
                if (stored) return JSON.parse(stored) as User;
                // Try to fetch current user from backend (best-effort)
                const r = await handleApiCall<User>(
                    axiosInstance.get("/auth/profile/")
                );
                if (r.data) {
                    try {
                        localStorage.setItem("user", JSON.stringify(r.data));
                    } catch (e) {}
                    return r.data;
                }
            }
        } catch (e) {}
        return null;
    },
};

// Products API
export const productsAPI = {
    getAll: () => handleApiCall<Product[]>(axiosInstance.get("/products/")),
    getById: (id: string | number) =>
        handleApiCall<Product>(axiosInstance.get(`/products/${id}/`)),
};

// Orders API
export const ordersAPI = {
    getAll: () => handleApiCall<Order[]>(axiosInstance.get("/orders/")),
    create: (orderData: any) =>
        handleApiCall<Order>(axiosInstance.post("/orders/place/", orderData)),
    getById: (id: string) =>
        handleApiCall<Order>(axiosInstance.get(`/orders/${id}/`)),
    update: (id: string, orderData: any) =>
        handleApiCall<Order>(axiosInstance.put(`/orders/${id}/`, orderData)),
};

// Reviews API
export const reviewsAPI = {
    getAll: () => handleApiCall(axiosInstance.get("/reviews/")),
    create: (reviewData: any) =>
        handleApiCall(axiosInstance.post("/reviews/", reviewData)),
    getById: (id: string) =>
        handleApiCall(axiosInstance.get(`/reviews/${id}/`)),
    update: (id: string, reviewData: any) =>
        handleApiCall(axiosInstance.put(`/reviews/${id}/`, reviewData)),
    delete: (id: string) =>
        handleApiCall(axiosInstance.delete(`/reviews/${id}/`)),
};

// Cart API
export const cartAPI = {
    getCart: async () => {
        const res = await handleApiCall<any>(axiosInstance.get("/cart/"));
        if (res.data) {
            const cart = Array.isArray(res.data) ? res.data[0] : res.data;
            return { data: { items: cart?.items ?? [] } };
        }
        return res;
    },
    addItem: (productId: string | number, quantity: number) =>
        handleApiCall(
            axiosInstance.post("/cart/add_item/", {
                product_id: productId,
                quantity,
            })
        ),
    removeItem: (itemId: string | number) =>
        handleApiCall(
            axiosInstance.post("/cart/remove_item/", { item_id: itemId })
        ),
    updateQuantity: (itemId: string | number, quantity: number) =>
        handleApiCall(
            axiosInstance.post("/cart/update_quantity/", {
                item_id: itemId,
                quantity,
            })
        ),
    clearCart: () => handleApiCall(axiosInstance.post("/cart/clear/")),
};

export default axiosInstance;
