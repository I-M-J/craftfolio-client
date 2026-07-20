/**
 * Centralized constants for the Craftfolio client.
 * Import from here instead of repeating inline across pages.
 */

/** Base URL for the Craftfolio Express API. */
export const SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

/** Ordered list of item categories used in forms, filters, and navigation. */
export const CATEGORIES = [
    "Ceramics",
    "Woodwork",
    "Jewelry",
    "Leather",
    "Candles & Soaps",
    "Textile & Fiber",
    "Mixed Media",
    "Paper Craft",
    "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];
