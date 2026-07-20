"use client";

import { useEffect, useState } from "react";
import ItemCard from "@/components/items/ItemCard";
import SkeletonCard from "@/components/items/SkeletonCard";
import { Item } from "@/types";
import { SERVER_URL } from "@/lib/constants";

export default function FeaturedItems() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch(`${SERVER_URL}/items/featured`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json() as Item[];
                setItems(data);
            } catch {
                setItems([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-sm font-semibold tracking-widest text-[#6366F1] uppercase mb-2">
                        Handpicked for You
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-display">
                        Featured Creations
                    </h2>
                    <p className="text-stone-500 text-base max-w-xl mx-auto">
                        Our most celebrated artisan goods — each one individually crafted with care and intention.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading
                        ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                        : items.map((item) => <ItemCard key={item._id} item={item} />)
                    }
                </div>

                {!loading && items.length === 0 && (
                    <div className="text-center py-20 text-stone-400">
                        <p>No featured items yet. Be the first to add one!</p>
                    </div>
                )}
            </div>
        </section>
    );
}
