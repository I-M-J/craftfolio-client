import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Craftfolio — Handmade Artisan Marketplace",
    description: "Discover unique handcrafted goods from independent artisans. Shop ceramics, woodwork, jewelry, textiles, leather, candles, and more.",
    keywords: "handmade, artisan, marketplace, ceramics, woodwork, jewelry, leather, candles",
    openGraph: {
        title: "Craftfolio — Handmade Artisan Marketplace",
        description: "Discover unique handcrafted goods from independent artisans.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="light" className="h-full antialiased">
            <body className="font-sans min-h-full flex flex-col">
                <Navbar />

                <main className="flex-1">
                    {children}
                </main>

                <Footer />

                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            borderRadius: "12px",
                            background: "#1F2937",
                            color: "#fff",
                        },
                    }}
                />
            </body>
        </html>
    );
}
