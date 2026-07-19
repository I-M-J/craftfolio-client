"use client";

import { useForm } from "react-hook-form";
import { useSession } from "@/lib/auth-client";
import { getJwtToken } from "@/lib/getJwtToken";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Hammer, Image as ImageIcon, Tag, DollarSign, BookOpen, FileText, Layers } from "lucide-react";
import { AddItemFormData } from "@/types";

const CATEGORIES = ["Ceramics", "Woodwork", "Jewelry", "Leather", "Candles & Soaps", "Textile & Fiber", "Mixed Media", "Paper Craft", "Other"];

export default function AddItemPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AddItemFormData>();

    const onSubmit = async (data: AddItemFormData) => {
        if (!session?.user) {
            toast.error("You must be signed in to add an item");
            return;
        }

        try {
            const token = await getJwtToken();

            const payload = {
                title: data.title,
                shortDescription: data.shortDescription,
                fullDescription: data.fullDescription,
                category: data.category,
                price: Number(data.price),
                imageUrl: data.imageUrl || "",
                sellerName: session.user.name,
                tags: data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json() as { message?: string };
                throw new Error(err.message || "Failed to add item");
            }

            toast.success("Item listed successfully!");
            router.push("/items/manage");
        } catch (err) {
            toast.error((err as Error).message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F4] py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                        <Hammer className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold font-display text-foreground">List Your Creation</h1>
                    <p className="text-stone-500 mt-2">Share your handmade work with artisan collectors worldwide.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset space-y-5">

                            {/* Title */}
                            <div>
                                <label className="label text-sm font-medium text-stone-700 mb-1">
                                    <Hammer className="w-4 h-4 inline mr-1" />
                                    Item Title
                                </label>
                                <input
                                    id="add-title"
                                    type="text"
                                    className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                    placeholder="e.g. Hand-thrown Stoneware Mug"
                                    {...register("title", { required: "Title is required" })}
                                />
                                {errors.title && <p className="text-danger text-xs">{errors.title.message}</p>}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="label text-sm font-medium text-stone-700 mb-1">
                                    <Layers className="w-4 h-4 inline mr-1" />
                                    Category
                                </label>
                                <select
                                    id="add-category"
                                    className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                    {...register("category", { required: "Category is required" })}
                                >
                                    <option value="">Select a category</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-danger text-xs">{errors.category.message}</p>}
                            </div>

                            {/* Price */}
                            <div>
                                <label className="label text-sm font-medium text-stone-700 mb-1">
                                    <DollarSign className="w-4 h-4 inline mr-1" />
                                    Price (USD)
                                </label>
                                <input
                                    id="add-price"
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                    placeholder="24.00"
                                    {...register("price", {
                                        required: "Price is required",
                                        min: { value: 0.01, message: "Price must be greater than 0" },
                                    })}
                                />
                                {errors.price && <p className="text-danger text-xs">{errors.price.message}</p>}
                            </div>

                            {/* Short Description */}
                            <div>
                                <label className="label text-sm font-medium text-stone-700 mb-1">
                                    <FileText className="w-4 h-4 inline mr-1" />
                                    Short Description
                                </label>
                                <input
                                    id="add-short-desc"
                                    type="text"
                                    className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                    placeholder="One sentence overview for item card"
                                    {...register("shortDescription", { required: "Short description is required", maxLength: { value: 120, message: "Max 120 characters" } })}
                                />
                                {errors.shortDescription && <p className="text-danger text-xs">{errors.shortDescription.message}</p>}
                            </div>

                            {/* Full Description */}
                            <div>
                                <label className="label text-sm font-medium text-stone-700 mb-1">
                                    <BookOpen className="w-4 h-4 inline mr-1" />
                                    Full Description
                                </label>
                                <textarea
                                    id="add-full-desc"
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                                    rows={5}
                                    placeholder="Describe your item's story, materials, dimensions, and care instructions..."
                                    {...register("fullDescription", {
                                        required: "Full description is required",
                                        minLength: { value: 20, message: "Description must be at least 20 characters" },
                                    })}
                                />
                                {errors.fullDescription && <p className="text-danger text-xs">{errors.fullDescription.message}</p>}
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="label text-sm font-medium text-stone-700 mb-1">
                                    <ImageIcon className="w-4 h-4 inline mr-1" />
                                    Image URL
                                </label>
                                <input
                                    id="add-image"
                                    type="text"
                                    className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                    placeholder="https://images.unsplash.com/..."
                                    {...register("imageUrl")}
                                />
                                {errors.imageUrl && <p className="text-danger text-xs">{errors.imageUrl.message}</p>}
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="label text-sm font-medium text-stone-700 mb-1">
                                    <Tag className="w-4 h-4 inline mr-1" />
                                    Tags <span className="font-normal text-stone-400">(comma-separated)</span>
                                </label>
                                <input
                                    id="add-tags"
                                    type="text"
                                    className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                    placeholder="handmade, ceramic, mug"
                                    {...register("tags")}
                                />
                            </div>

                            <button
                                id="add-item-submit"
                                type="submit"
                                className="btn h-fit w-full bg-[#6366F1] text-white px-4 py-3 text-base font-semibold rounded-full hover:bg-[#4F46E5] transition-all"
                            >
                                {isSubmitting
                                    ? <span className="loading loading-spinner loading-md text-white" />
                                    : "Publish Listing"
                                }
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}
