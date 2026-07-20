"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import ItemCard from "@/components/items/ItemCard";
import { Item } from "@/types";
import { ArrowLeft, Calendar, Mail, Package, Star, Store, User } from "lucide-react";

interface SellerProfile {
    name: string;
    email: string;
    image?: string;
    role: string;
    createdAt: string;
}

export default function SellerProfilePage() {
    const { email } = useParams<{ email: string }>();
    const router = useRouter();
    const { data: session } = useSession();
    const [mounted, setMounted] = useState(false);

    const [seller, setSeller] = useState<SellerProfile | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const SERVER = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!email) return;

        const decodedEmail = decodeURIComponent(email);

        const fetchSellerData = async () => {
            try {
                // Fetch seller profile
                const sellerRes = await fetch(`${SERVER}/users/email/${encodeURIComponent(decodedEmail)}`);
                if (!sellerRes.ok) {
                    if (sellerRes.status === 404) {
                        throw new Error("Seller profile not found");
                    }
                    throw new Error("Failed to fetch seller profile");
                }
                const sellerData = await sellerRes.json() as SellerProfile;
                setSeller(sellerData);

                // Fetch seller items
                const itemsRes = await fetch(`${SERVER}/items?sellerEmail=${encodeURIComponent(decodedEmail)}&limit=100`);
                if (itemsRes.ok) {
                    const itemsData = await itemsRes.json() as { items: Item[] };
                    setItems(itemsData.items);
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchSellerData();
    }, [email, SERVER]);

    if (!mounted || loading) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <span className="loading loading-ring loading-lg text-primary" />
            </div>
        );
    }

    if (error || !seller) {
        return (
            <div className="min-h-screen bg-stone-50 py-24 px-4">
                <div className="max-w-md mx-auto text-center bg-white rounded-3xl p-8 border border-stone-100 shadow-sm">
                    <Store className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold font-display text-stone-850 mb-2">Shop Not Found</h2>
                    <p className="text-stone-500 text-sm mb-6">
                        {error || "The seller profile you are looking for does not exist or has been deleted."}
                    </p>
                    <Link
                        href="/explore"
                        className="btn h-fit bg-[#6366F1] text-white px-6 py-3 text-sm font-semibold rounded-full hover:bg-[#4F46E5] transition-all"
                    >
                        Back to Explore
                    </Link>
                </div>
            </div>
        );
    }

    const decodedEmail = decodeURIComponent(email);
    const isOwnShop = session?.user?.email === decodedEmail;

    // Calculate seller metrics
    const totalListings = items.length;
    const itemsWithReviews = items.filter(i => i.totalReviews > 0);
    const avgRating = itemsWithReviews.length > 0
        ? itemsWithReviews.reduce((sum, item) => sum + item.avgRating, 0) / itemsWithReviews.length
        : 0;
    const totalReviews = items.reduce((sum, item) => sum + item.totalReviews, 0);

    const initial = seller.name ? seller.name[0].toUpperCase() : "S";

    return (
        <div className="min-h-screen bg-[#F5F5F4]">
            {/* Elegant Header Banner */}
            <div className="h-48 md:h-60 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar: Profile Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm flex flex-col items-center text-center">
                            {/* Avatar */}
                            {seller.image ? (
                                <img
                                    src={seller.image}
                                    alt={seller.name}
                                    className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover -mt-16 bg-white animate__animated animate__zoomIn"
                                />
                            ) : (
                                <div className="w-28 h-28 rounded-full border-4 border-white shadow-md bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-3xl font-extrabold -mt-16 animate__animated animate__zoomIn">
                                    {initial}
                                </div>
                            )}

                            {/* Name & Title */}
                            <h1 className="text-2xl font-bold font-display text-stone-850 mt-4 leading-tight">
                                {seller.name}
                            </h1>
                            <span className="mt-1 px-3 py-1 bg-indigo-50 text-[#6366F1] rounded-full text-xs font-semibold uppercase tracking-wider">
                                {seller.role === "admin" ? "Platform Admin" : "Artisan Seller"}
                            </span>

                            {/* Info Rows */}
                            <div className="w-full space-y-3.5 mt-6 border-t border-stone-100 pt-6 text-left text-sm text-stone-600">
                                <div className="flex items-center gap-2.5">
                                    <Mail className="w-4 h-4 text-[#6366F1] shrink-0" />
                                    <span className="truncate">{seller.email}</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <Calendar className="w-4 h-4 text-[#6366F1] shrink-0" />
                                    <span>
                                        Joined {new Date(seller.createdAt).toLocaleDateString("en-US", {
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>

                            {/* CTAs */}
                            {isOwnShop && (
                                <div className="w-full space-y-2 mt-6">
                                    <Link
                                        href="/items/manage"
                                        className="btn h-fit w-full bg-[#6366F1] text-white py-3 text-sm font-semibold rounded-full hover:bg-[#4F46E5] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Package className="w-4 h-4" />
                                        Manage My Listings
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Back navigation */}
                        <Link
                            href="/explore"
                            className="flex items-center gap-2 text-stone-500 hover:text-[#6366F1] text-sm font-medium transition-colors px-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Explore Catalog
                        </Link>
                    </div>

                    {/* Right Main Panel: Listings */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Stats Dashboard */}
                        <div className="grid grid-cols-3 gap-4 bg-white rounded-3xl p-6 border border-stone-100 shadow-sm animate__animated animate__fadeInDown">
                            <div className="text-center p-2">
                                <span className="block text-2xl md:text-3xl font-extrabold text-foreground">{totalListings}</span>
                                <span className="text-xs text-stone-500 uppercase font-semibold tracking-wider">Listings</span>
                            </div>
                            <div className="text-center p-2 border-x border-stone-100">
                                <span className="block text-2xl md:text-3xl font-extrabold text-foreground flex items-center justify-center gap-1">
                                    {avgRating > 0 ? avgRating.toFixed(1) : "-"}
                                    {avgRating > 0 && <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline animate__animated animate__bounceIn" />}
                                </span>
                                <span className="text-xs text-stone-500 uppercase font-semibold tracking-wider">Avg Rating</span>
                            </div>
                            <div className="text-center p-2">
                                <span className="block text-2xl md:text-3xl font-extrabold text-foreground">{totalReviews}</span>
                                <span className="text-xs text-stone-500 uppercase font-semibold tracking-wider">Total Reviews</span>
                            </div>
                        </div>

                        {/* Shop Products Section */}
                        <div>
                            <h2 className="text-2xl font-bold font-display text-stone-850 mb-6 flex items-center gap-2">
                                <Store className="w-6 h-6 text-[#6366F1]" />
                                Store Creations ({totalListings})
                            </h2>

                            {items.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-3xl border border-stone-100">
                                    <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                                    <h3 className="text-lg font-bold text-stone-800">No items listed</h3>
                                    <p className="text-sm text-stone-500 mt-1 max-w-xs mx-auto">
                                        This artisan has not published any handcrafted items yet.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate__animated animate__fadeIn">
                                    {items.map((item) => (
                                        <ItemCard key={item._id} item={item} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
