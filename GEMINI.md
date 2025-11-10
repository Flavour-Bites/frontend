# Gemini Workspace: Flavour Bites Frontend

This document provides context for the "Flavour Bites" frontend application.

## Project Overview

This is a Next.js e-commerce application for a bakery named "Flavour Bites." It showcases homemade baked goods like cakes, cookies, and pastries. The application features a product catalog, a shopping cart, and pages for individual products, ordering, and contact.

## Key Technologies

*   **Framework:** [Next.js](https://nextjs.org/) (using the App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (built on Radix UI)
*   **Icons:** [Lucide React](https://lucide.dev/)

## Project Structure

*   `app/`: Contains the application's routes and pages (e.g., `/`, `/products`, `/order`).
*   `components/`: Reusable React components used throughout the application (e.g., `Navbar`, `Footer`, `ProductCard`).
*   `context/`: Holds React Context providers, such as `CartContext` for managing the shopping cart state.
*   `data/`: Contains static data, including the list of products in `products.ts`.
*   `public/`: Stores static assets like images and SVGs.
*   `lib/`: Utility functions.

## Building and Running

To get the application running locally, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

3.  **Build for Production:**
    ```bash
    npm run build
    ```

4.  **Run in Production Mode:**
    ```bash
    npm run start
    ```

## Development Conventions

*   The project uses TypeScript for type safety.
*   Styling is done primarily with Tailwind CSS.
*   Components are organized in the `components/` directory, with UI primitives in `components/ui/`.
*   Product data is managed statically in the `data/products.ts` file. Any updates to products should be made there.

---

## Gemini Session Summary (November 8, 2025)

This section summarizes the work performed during the current session.

### Identified Issues (from `todo.md`):

1.  **State Management Refactor:** `AuthContext` and `CartContext` were tightly coupled with `localStorage` and the API layer, leading to complex and buggy code.
2.  **API Layer Cleanup:** The `api.ts` file mixed API logic with state management, had inconsistent error handling, and used a hardcoded fallback for the API URL.
3.  **UI/UX Bugs:** The `ProductCard` component provided false feedback to users when adding items to the cart.
4.  **Data Mismatch:** The frontend expected `averageRating` and `reviewCount` in product data, but the backend did not provide them.
5.  **Dependency Management:** The `axios` dependency was outdated.

### Completed Tasks:

1.  **State Management Refactor:**
    *   **`AuthContext.tsx`:** Refactored to decouple from `localStorage` and `authAPI`, simplify state management, remove custom event handling, and centralize API logic.
    *   **`CartContext.tsx`:** Refactored to use a `useReducer` hook, encapsulate `localStorage` interactions, optimize API usage (e.g., single `clearCart` call), and add loading/error states.
    *   **`types/user.ts`:** Created a new file to define the `User` interface.

2.  **API Layer Cleanup:**
    *   **`lib/api.ts`:** Refactored to remove `localStorage` interactions from `authAPI` functions, standardize error handling, remove custom event dispatching, and simplify the `axios` interceptor. Added a `clearCart` function to `cartAPI`.
    *   **API URL:** Confirmed that `process.env.NEXT_PUBLIC_API_BASE_URL` is used, allowing for environment variable configuration.

3.  **UI/UX Bugs:**
    *   **`components/ProductCard.tsx`:** Fixed the false feedback issue by awaiting `addToCart`, handling errors, and using the `isLoading` state from `useCart` to disable the button.

4.  **Data Mismatch:**
    *   **`components/ProductCard.tsx`:** Removed the display of `averageRating` and `reviewCount` as they are not provided by the backend.
    *   **`app/products/page.tsx`:** Removed hardcoded `averageRating` and `reviewCount` from the product transformation logic and made these properties optional in the `FrontendProduct` interface.
    *   **`types/product.ts`:** Made `averageRating` and `reviewCount` optional in the `Product` type definition.

5.  **Dependency Management:**
    *   **`package.json`:** Updated the `axios` dependency to the latest version (`^1.7.2`).
    *   **`npm install`:** Attempted to run `npm install` via a new `update-deps` script, but encountered PowerShell execution policy issues.

### Current Status:

All identified refactoring and bug-fixing tasks have been completed in the codebase. However, due to PowerShell execution policy restrictions, `npm install` could not be executed by the agent.

**Next Steps for User:**

1.  **Run `npm install`:** Please run `npm install` in your terminal to update the project dependencies, especially `axios`.
2.  **Run `npm run build`:** After installing dependencies, run `npm run build` to verify that all changes compile correctly without errors.
3.  **Test Application:** Thoroughly test the application, especially authentication, cart functionality, and product display, to ensure all fixes are working as expected.

Please let me know if you have any further questions or tasks.