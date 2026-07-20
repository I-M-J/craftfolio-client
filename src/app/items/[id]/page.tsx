"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowLeft, Tag, User, Calendar, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { getJwtToken } from "@/lib/getJwtToken";
import { Item, Review } from "@/types";
import { SERVER_URL } from "@/lib/constants";

interface ReviewFormData {
    rating: string;
    comment: string;
}

export default function ItemDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { data: session } = useSession();
    const [mounted, setMounted] = useState(false);

    const [item, setItem] = useState<Item | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loadingItem, setLoadingItem] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);

    const SERVER = SERVER_URL;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ReviewFormData>();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`${SERVER}/items/${id}`);
                if (!res.ok) { router.push("/not-found"); return; }
                const data = await res.json() as Item;
                setItem(data);
            } catch {
                router.push("/not-found");
            } finally {
                setLoadingItem(false);
            }
        };
        fetchItem();
    }, [id, SERVER, router]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`${SERVER}/reviews?itemId=${id}`);
                if (!res.ok) return;
                const data = await res.json() as Review[];
                setReviews(data);
            } catch { /* ignore */ } finally {
                setLoadingReviews(false);
            }
        };
        fetchReviews();
    }, [id, SERVER]);

    const onSubmitReview = async (data: ReviewFormData) => {
        if (!session?.user) {
            toast.error("You must be signed in to leave a review");
            return;
        }

        try {
            const token = await getJwtToken();

            const res = await fetch(`${SERVER}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    itemId: id,
                    rating: parseInt(data.rating),
                    comment: data.comment,
                    reviewerName: session.user.name,
                    reviewerAvatar: session.user.image,
                }),
            });

            if (!res.ok) throw new Error("Failed to post review");

            toast.success("Review submitted!");
            reset();

            // Refresh reviews and item
            const [reviewsRes, itemRes] = await Promise.all([
                fetch(`${SERVER}/reviews?itemId=${id}`),
                fetch(`${SERVER}/items/${id}`),
            ]);
            if (reviewsRes.ok) setReviews(await reviewsRes.json() as Review[]);
            if (itemRes.ok) setItem(await itemRes.json() as Item);
        } catch {
            toast.error("Failed to submit review. Please try again.");
        }
    };

    const handleDeleteReview = async (reviewId: string) => {
        if (!session?.user) return;
        try {
            const token = await getJwtToken();

            const res = await fetch(`${SERVER}/reviews/${reviewId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed");
            toast.success("Review deleted");
            setReviews((prev) => prev.filter((r) => r._id !== reviewId));
        } catch {
            toast.error("Failed to delete review");
        }
    };

    if (loadingItem) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <span className="loading loading-ring loading-lg text-primary" />
            </div>
        );
    }

    if (!item) return null;

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back link */}
                <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-[#6366F1] transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Explore
                </Link>

                {/* Main layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {/* Image */}
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-100 shadow-sm">
                        <Image
                            src={item.imageUrl || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-[#6366F1] uppercase font-semibold tracking-wide mb-2">{item.category}</p>
                            <h1 className="text-3xl sm:text-4xl font-bold font-display text-foreground leading-tight mb-3">
                                {item.title}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <div className="flex text-[#F59E0B]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.avgRating) ? "fill-current" : "text-stone-300"}`} />
                                    ))}
                                </div>
                                <span className="text-sm text-stone-500">
                                    {item.avgRating > 0 ? item.avgRating.toFixed(1) : "No rating"} ({item.totalReviews} {item.totalReviews === 1 ? "review" : "reviews"})
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="border-y border-stone-200 py-5">
                            <span className="text-4xl font-bold text-foreground">${item.price}</span>
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <p className="text-stone-600 text-base leading-relaxed">{item.fullDescription}</p>
                        </div>

                        {/* Meta */}
                        <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-2 text-sm text-stone-500">
                                <User className="w-4 h-4 text-[#6366F1]" />
                                <span>By <Link href={`/sellers/${encodeURIComponent(item.sellerEmail)}`} className="font-semibold text-[#6366F1] hover:text-[#4F46E5] hover:underline transition-colors">{item.sellerName}</Link></span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-stone-500">
                                <Calendar className="w-4 h-4 text-[#6366F1]" />
                                <span>Listed {new Date(item.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                            </div>
                            {item.tags && item.tags.length > 0 && (
                                <div className="flex items-start gap-2 text-sm text-stone-500 flex-wrap">
                                    <Tag className="w-4 h-4 text-[#6366F1] mt-0.5 shrink-0" />
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.tags.map((tag) => (
                                            <span key={tag} className="px-2.5 py-0.5 bg-indigo-50 text-[#6366F1] rounded-full text-xs font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* If owner, show edit/delete */}
                        {mounted && session?.user?.email === item.sellerEmail && (
                            <div className="flex gap-3 pt-2">
                                <Link
                                    href={`/items/edit/${item._id}`}
                                    className="btn h-fit px-5 py-2.5 text-sm font-semibold rounded-full bg-[#6366F1] text-white hover:bg-[#4F46E5] transition-all"
                                >
                                    Edit Item
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-stone-200">
                    {/* Reviews list */}
                    <div>
                        <h2 className="text-2xl font-bold font-display text-foreground mb-6">
                            Reviews ({item.totalReviews})
                        </h2>

                        {loadingReviews ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="animate-pulse bg-white rounded-2xl p-5 border border-stone-100 space-y-3">
                                        <div className="h-4 bg-stone-200 rounded w-1/3" />
                                        <div className="h-4 bg-stone-200 rounded w-full" />
                                        <div className="h-4 bg-stone-200 rounded w-2/3" />
                                    </div>
                                ))}
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="text-stone-400 text-sm bg-stone-50 rounded-2xl p-8 text-center border border-stone-100">
                                <Star className="w-8 h-8 mx-auto mb-3 opacity-30" />
                                <p>No reviews yet. Be the first to share your experience!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <div key={review._id} className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm space-y-2">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold text-sm text-foreground">{review.reviewerName}</p>
                                                <div className="flex text-[#F59E0B] mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-current" : "text-stone-300"}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            {(session?.user?.email === review.reviewerEmail) && (
                                                <button
                                                    onClick={() => handleDeleteReview(review._id)}
                                                    className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    aria-label="Delete review"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-sm text-stone-600 leading-relaxed">{review.comment}</p>
                                        <p className="text-xs text-stone-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Review form */}
                    <div>
                        <h2 className="text-2xl font-bold font-display text-foreground mb-6">
                            Leave a Review
                        </h2>

                        {!mounted || !session?.user ? (
                            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center">
                                <p className="text-stone-600 text-sm mb-4">You must be signed in to leave a review.</p>
                                <Link href="/login" className="btn h-fit bg-[#6366F1] text-white px-6 py-2.5 text-sm font-semibold rounded-full hover:bg-[#4F46E5] transition-all">
                                    Sign In to Review
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmitReview)} className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm space-y-4">
                                <fieldset className="fieldset space-y-4">
                                    <div>
                                        <label className="label text-sm font-medium text-stone-700 mb-1">Rating</label>
                                        <select
                                            id="review-rating"
                                            className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                            {...register("rating", { required: "Please select a rating" })}
                                        >
                                            <option value="">Select Rating</option>
                                            <option value="5">★★★★★ Excellent (5)</option>
                                            <option value="4">★★★★ Great (4)</option>
                                            <option value="3">★★★ Good (3)</option>
                                            <option value="2">★★ Fair (2)</option>
                                            <option value="1">★ Poor (1)</option>
                                        </select>
                                        {errors.rating && <p className="text-danger text-xs">{errors.rating.message}</p>}
                                    </div>

                                    <div>
                                        <label className="label text-sm font-medium text-stone-700 mb-1">Your Review</label>
                                        <textarea
                                            id="review-comment"
                                            className="w-full px-4 py-3 border border-stone-300 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                                            rows={4}
                                            placeholder="Share your experience with this item..."
                                            {...register("comment", { required: "Please write a review", minLength: { value: 10, message: "Review must be at least 10 characters" } })}
                                        />
                                        {errors.comment && <p className="text-danger text-xs">{errors.comment.message}</p>}
                                    </div>

                                    <button
                                        id="review-submit"
                                        type="submit"
                                        className="btn h-fit w-full bg-[#6366F1] text-white px-4 py-3 text-base font-semibold rounded-full hover:bg-[#4F46E5] transition-all"
                                    >
                                        {isSubmitting
                                            ? <span className="loading loading-spinner loading-md text-white" />
                                            : "Submit Review"
                                        }
                                    </button>
                                </fieldset>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
