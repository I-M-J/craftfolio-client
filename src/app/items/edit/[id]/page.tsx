"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "@/lib/auth-client";
import { getJwtToken } from "@/lib/getJwtToken";
import toast from "react-hot-toast";
import { Pencil, Layers, DollarSign, FileText, BookOpen, Image as ImageIcon, Tag } from "lucide-react";
import { Item, AddItemFormData } from "@/types";
import { SERVER_URL, CATEGORIES } from "@/lib/constants";

export default function EditItemPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { data: session } = useSession();
    const [item, setItem] = useState<Item | null>(null);
    const [loadingItem, setLoadingItem] = useState(true);

    const SERVER = SERVER_URL;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AddItemFormData>();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`${SERVER}/items/${id}`);
                if (!res.ok) { router.push("/items/manage"); return; }
                const data = await res.json() as Item;

                // Only the owner can edit
                if (session?.user && data.sellerEmail !== session.user.email) {
                    toast.error("You can only edit your own items");
                    router.push("/items/manage");
                    return;
                }

                setItem(data);
                reset({
                    title: data.title,
                    shortDescription: data.shortDescription,
                    fullDescription: data.fullDescription,
                    category: data.category,
                    price: data.price,
                    imageUrl: data.imageUrl,
                    tags: data.tags?.join(", ") || "",
                });
            } catch {
                router.push("/items/manage");
            } finally {
                setLoadingItem(false);
            }
        };
        if (session !== undefined) fetchItem();
    }, [id, session, SERVER, router, reset]);

    const onSubmit = async (data: AddItemFormData) => {
        try {
            const token = await getJwtToken();

            const payload = {
                title: data.title,
                shortDescription: data.shortDescription,
                fullDescription: data.fullDescription,
                category: data.category,
                price: Number(data.price),
                imageUrl: data.imageUrl || "",
                tags: data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
            };

            const res = await fetch(`${SERVER}/items/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json() as { message?: string };
                throw new Error(err.message || "Failed to update");
            }

            toast.success("Item updated successfully!");
            router.push("/items/manage");
        } catch (err) {
            toast.error((err as Error).message || "Failed to update item");
        }
    };

    if (loadingItem) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <span className="loading loading-ring loading-lg text-primary" />
            </div>
        );
    }

    if (!item) return null;

    return (
        <div className="min-h-screen bg-[#F5F5F4] py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#F59E0B] to-amber-600 flex items-center justify-center">
                        <Pencil className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold font-display text-foreground">Edit Listing</h1>
                    <p className="text-stone-500 mt-2">Update your item details below.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset space-y-5">

                            <div>
                                <label className="label text-sm font-medium text-stone-700 mb-1">
                                    <FileText className="w-4 h-4 inline mr-1" />
                                    Item Title
                                </label>
                                <input type="text" className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                    {...register("title", { required: "Title is required" })} />
                                {errors.title && <p className="text-danger text-xs">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="label text-sm font-medium text-stone-700 mb-1">
                                    <Layers className="w-4 h-4 inline mr-1" />
                                    Category
                                </label>
                                <select className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                    {...register("category", { required: "Category is required" })}>
                                    {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                                {errors.category && <p className="text-danger text-xs">{errors.category.message}</p>}
                            </div>

                            <div>
                                <label className="label text-sm font-medium text-stone-700 mb-1">
                                    <DollarSign className="w-4 h-4 inline mr-1" />
                                    Price (USD)
                                </label>
                                <input type="number" step="0.01" className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                    {...register("price", { required: "Price is required", min: { value: 0.01, message: "Must be > 0" } })} />
                                {errors.price && <p className="text-danger text-xs">{errors.price.message}</p>}
                            </div>

                            <div>
                                <label className="label text-sm font-medium text-stone-700 mb-1">
                                    <FileText className="w-4 h-4 inline mr-1" />
                                    Short Description
                                </label>
                                <input type="text" className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                    {...register("shortDescription", { required: "Required", maxLength: { value: 120, message: "Max 120 chars" } })} />
                                {errors.shortDescription && <p className="text-danger text-xs">{errors.shortDescription.message}</p>}
                            </div>

                            <div>
                                <label className="label text-sm font-medium text-stone-700 mb-1">
                                    <BookOpen className="w-4 h-4 inline mr-1" />
                                    Full Description
                                </label>
                                <textarea className="w-full px-4 py-3 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                                    rows={5}
                                    {...register("fullDescription", { required: "Required", minLength: { value: 20, message: "Min 20 chars" } })} />
                                {errors.fullDescription && <p className="text-danger text-xs">{errors.fullDescription.message}</p>}
                            </div>

                            <div>
                                <label className="label text-sm font-medium text-stone-700 mb-1">
                                    <ImageIcon className="w-4 h-4 inline mr-1" />
                                    Image URL
                                </label>
                                <input type="text" className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                    placeholder="https://" {...register("imageUrl")} />
                            </div>

                            <div>
                                <label className="label text-sm font-medium text-stone-700 mb-1">
                                    <Tag className="w-4 h-4 inline mr-1" />
                                    Tags <span className="text-stone-400 font-normal">(comma-separated)</span>
                                </label>
                                <input type="text" className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                    placeholder="ceramic, mug, handmade" {...register("tags")} />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="submit"
                                    className="btn h-fit flex-1 bg-[#6366F1] text-white px-4 py-3 text-base font-semibold rounded-full hover:bg-[#4F46E5] transition-all">
                                    {isSubmitting ? <span className="loading loading-spinner loading-md text-white" /> : "Save Changes"}
                                </button>
                                <button type="button" onClick={() => router.push("/items/manage")}
                                    className="btn h-fit px-4 py-3 text-base font-semibold rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all">
                                    Cancel
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}
