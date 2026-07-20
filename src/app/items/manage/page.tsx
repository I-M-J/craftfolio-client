"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getJwtToken } from "@/lib/getJwtToken";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Package, Star, Tag } from "lucide-react";
import { Item } from "@/types";

export default function ManageItemsPage() {
    const { data: session } = useSession();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    const SERVER = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

    useEffect(() => {
        if (!session?.user?.email) return;
        const fetchMyItems = async () => {
            try {
                const res = await fetch(`${SERVER}/items?sellerEmail=${encodeURIComponent(session.user.email)}&limit=50`);
                if (!res.ok) throw new Error("Failed");
                const data = await res.json() as { items: Item[] };
                setItems(data.items);
            } catch {
                setItems([]);
            } finally {
                setLoading(false);
            }
        };
        fetchMyItems();
    }, [session, SERVER]);

    const handleDelete = async (itemId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this item? This cannot be undone.");
        if (!confirmed) return;

        try {
            const token = await getJwtToken();

            const res = await fetch(`${SERVER}/items/${itemId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                const err = await res.json() as { message?: string };
                throw new Error(err.message || "Failed to delete");
            }

            toast.success("Item deleted");
            setItems((prev) => prev.filter((item) => item._id !== itemId));
        } catch (err) {
            toast.error((err as Error).message || "Failed to delete item");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <span className="loading loading-ring loading-lg text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5F4] py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-display text-foreground">My Listings</h1>
                        <p className="text-stone-500 mt-1">Manage your handcrafted items on Craftfolio</p>
                    </div>
                    <Link
                        href="/items/add"
                        className="flex items-center gap-2 btn h-fit bg-[#6366F1] text-white px-5 py-3 text-sm font-semibold rounded-full hover:bg-[#4F46E5] transition-all shadow-md"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Item
                    </Link>
                </div>

                {/* Empty state */}
                {items.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-2xl border border-stone-100">
                        <Package className="w-14 h-14 mx-auto mb-4 text-stone-300" />
                        <h2 className="text-xl font-bold text-foreground font-display mb-2">No listings yet</h2>
                        <p className="text-stone-500 text-sm max-w-xs mx-auto mb-6">
                            You have not listed any items yet. Share your first creation with the world!
                        </p>
                        <Link
                            href="/items/add"
                            className="btn h-fit bg-[#6366F1] text-white px-6 py-3 text-sm font-semibold rounded-full hover:bg-[#4F46E5] transition-all"
                        >
                            Create Your First Listing
                        </Link>
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-stone-400 mb-4">{items.length} listing{items.length !== 1 ? "s" : ""}</p>
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all p-4 flex gap-4 items-start"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                                        <Image
                                            src={item.imageUrl || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200"}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 flex-wrap">
                                            <div>
                                                <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                                                <span className="text-xs text-[#6366F1] font-medium">{item.category}</span>
                                            </div>
                                            <span className="text-lg font-bold text-foreground shrink-0">${item.price}</span>
                                        </div>

                                        <p className="text-sm text-stone-500 mt-1 line-clamp-1">{item.shortDescription}</p>

                                        {/* Tags */}
                                        {item.tags && item.tags.length > 0 && (
                                            <div className="flex items-center gap-1 mt-2 flex-wrap">
                                                <Tag className="w-3 h-3 text-stone-400" />
                                                {item.tags.slice(0, 3).map((tag) => (
                                                    <span key={tag} className="px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full text-xs">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Rating + actions */}
                                        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
                                                <span className="text-xs text-stone-500">
                                                    {item.avgRating > 0 ? item.avgRating.toFixed(1) : "No rating"} ({item.totalReviews} reviews)
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/items/${item._id}`}
                                                    className="text-xs px-3 py-1.5 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 transition-all"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/items/edit/${item._id}`}
                                                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-indigo-50 text-[#6366F1] hover:bg-indigo-100 transition-all"
                                                >
                                                    <Pencil className="w-3 h-3" />
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
