'use client';
import React from 'react';
import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { cartAPI } from '../lib/api';
import { Product } from '@/types/product';

interface CartItem extends Product {
  quantity: number;
  productId: string; // original product id
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
  cartItems: CartItem[]; // alias for items for components expecting cartItems
}

type CartAction =
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const getGuestCart = (): CartItem[] => {
  try {
    const localCart =
      typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
    const raw = localCart ? JSON.parse(localCart) : [];
    // Normalize legacy guest items lacking productId (use id)
    return Array.isArray(raw)
      ? raw.map((item: any) => ({
        ...item,
        productId: item.productId ?? item.id,
      }))
      : [];
  } catch (error) {
    return [];
  }
};

const setGuestCart = (items: CartItem[]) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  } catch (error) {
    console.error('Failed to save guest cart to localStorage', error);
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isLoading: true,
    error: null,
  });
  const { isAuthenticated } = useAuth();

  const fetchCart = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    if (isAuthenticated) {
      const response = await cartAPI.getCart();
      if (response.data?.items) {
        const cartItems: CartItem[] = response.data.items.map((item: any) => ({
          ...item.product,
          id: item.id.toString(), // use cart item id for UI actions
          productId: item.product.id.toString(),
          quantity: item.quantity,
          // Normalize possible backend string price / ingredients text
          price: typeof item.product.price === 'string' ? parseFloat(item.product.price) : item.product.price,
          ingredients: Array.isArray(item.product.ingredients)
            ? item.product.ingredients
            : (item.product.ingredients
              ? String(item.product.ingredients).split(',').map((s: string) => s.trim()).filter(Boolean)
              : []),
        }));
        dispatch({ type: 'SET_ITEMS', payload: cartItems });
      } else {
        dispatch({ type: 'SET_ITEMS', payload: [] });
      }
    } else {
      // guest cart
      const guest = getGuestCart();
      dispatch({ type: 'SET_ITEMS', payload: guest });
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleApiCall = async (
    apiCall: () => Promise<any>,
    successMessage?: string
  ) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await apiCall();
      if (response.error) throw new Error(response.error);
      if (successMessage)
        toast.success(successMessage);
      await fetchCart();
    } catch (error: any) {
      const errorMessage = error.message || 'An unexpected error occurred.';
      toast.error(errorMessage);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (product: Product, quantity: number) => {
    if (isAuthenticated) {
      await handleApiCall(
        () => cartAPI.addItem(product.id, quantity)
      );
    } else {
      const updatedCart = [...state.items];
      const existingItem = updatedCart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        updatedCart.push({ ...product, quantity, id: product.id, productId: product.id });
      }
      setGuestCart(updatedCart);
      dispatch({ type: 'SET_ITEMS', payload: updatedCart });
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    const itemToRemove = state.items.find((item) => item.id === cartItemId);
    if (!itemToRemove) return;

    if (isAuthenticated) {
      await handleApiCall(
        () => cartAPI.removeItem(cartItemId)
      );
    } else {
      const updatedCart = state.items.filter((item) => item.id !== cartItemId);
      setGuestCart(updatedCart);
      dispatch({ type: 'SET_ITEMS', payload: updatedCart });
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
      return;
    }

    if (isAuthenticated) {
      await handleApiCall(
        () => cartAPI.updateQuantity(cartItemId, quantity)
      );
    } else {
      const updatedCart = state.items.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      );
      setGuestCart(updatedCart);
      dispatch({ type: 'SET_ITEMS', payload: updatedCart });
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      await handleApiCall(() => cartAPI.clearCart(), 'Cart cleared!');
    } else {
      setGuestCart([]);
      dispatch({ type: 'SET_ITEMS', payload: [] });
      toast.success('Cart cleared!');
    }
  };

  const cartCount = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        cartItems: state.items,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
