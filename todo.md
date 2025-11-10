# Flavour Bites - Project To-Do List

This document outlines suggestions for enhancing the "Flavour Bites" website to become a leading home-baked goods ordering platform, building upon the initial project proposal.

## High-Priority Technical Debt and Bugs

This section lists critical technical issues that need to be addressed to improve the stability, maintainability, and user experience of the application.

*   **State Management Refactor:**
    *   `AuthContext` and `CartContext` are tightly coupled with `localStorage` and the API layer, leading to complex and buggy code. They need to be refactored to be the single source of truth for their respective states.
    *   The contexts should manage their state internally and provide clear loading, success, and error states to the components that consume them.

*   **API Layer Cleanup:**
    *   The `api.ts` file mixes API logic with state management (writing to `localStorage`). This should be refactored to be a pure API communication layer.
    *   Error handling in the API layer is inconsistent and needs to be standardized.
    *   The hardcoded fallback for the API URL should be replaced with a more robust configuration solution (e.g., environment variables).

*   **UI/UX Bugs:**
    *   The `ProductCard` component provides false feedback to users when adding items to the cart. This is a critical bug that needs to be fixed.
    *   The UI should provide clear feedback to the user during asynchronous operations (e.g., adding to cart, logging in) by using loading spinners or disabling buttons.

*   **Data Mismatch:**
    *   There is a data mismatch between the frontend components and the backend API. The frontend expects `averageRating` and `reviewCount` in the product data, but the backend does not provide them. This needs to be addressed by either updating the backend to provide the missing data or removing the corresponding UI elements from the frontend.

*   **Dependency Management:**
    *   The `axios` dependency is outdated and should be updated to a more recent version to mitigate potential security vulnerabilities.

## 1. Enhance Customer Experience

To provide a seamless and enjoyable ordering process:

*   **Integrated Shopping Cart:** Implement a full shopping cart system allowing customers to add multiple items before checkout, rather than a simple order form.
*   **Secure Online Payments:** Integrate secure payment gateways (e.g., Stripe, PayPal, or local options) to enable direct online transactions.
*   **Customer Accounts:** Allow users to create accounts for saving delivery information, viewing order history, and facilitating quicker re-orders.
*   **Real-Time Order Tracking:** Develop a system to provide customers with live updates on their order status (e.g., "Confirmed," "In the Kitchen," "Out for Delivery").

## 2. Build Trust and Engagement

To foster loyalty and attract new customers:

*   **Customer Reviews and Ratings:** Implement a feature for customers to leave reviews and ratings for products, providing valuable social proof.
*   **High-Quality, Unique Photography:** Replace placeholder images with professional, appealing photographs of actual products to showcase their quality and appeal.
*   **Detailed Product Pages:** Expand product information to include comprehensive descriptions, ingredient lists, allergen warnings, and customization options (e.g., frosting choices, personalized messages).

## 3. Streamline Business Operations

To ensure efficient management for the bakery owner (to be integrated with the Django backend):

*   **Comprehensive Admin Dashboard:** Develop a secure backend interface for managing products (adding, editing, removing), updating prices, uploading images, and handling inventory.
*   **Order Management System:** Create a system within the admin dashboard to view, process, and update the status of all incoming orders, along with customer details.
*   **Inventory Control:** Implement functionality to track product stock levels automatically, marking items as "Sold Out" to prevent overselling.