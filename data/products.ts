// Minimal local fallback product data used when backend is unavailable.
export const products = [
    {
        id: "cake-vanilla",
        name: "Vanilla Cake",
        description: "A simple vanilla cake.",
        price: 9.99,
        category: "cake",
        image: "/images/vanilla-cake.jpg",
        ingredients: ["flour", "sugar", "eggs", "vanilla"],
    },
];

export type LocalProduct = (typeof products)[number];
