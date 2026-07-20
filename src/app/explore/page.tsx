"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ItemCard from "@/components/items/ItemCard";
import SkeletonCard from "@/components/items/SkeletonCard";
import { Item, ItemsResponse } from "@/types";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { SERVER_URL, CATEGORIES as ALL_CATEGORIES } from "@/lib/constants";

const CATEGORIES = ["All", ...ALL_CATEGORIES];
const SORT_OPTIONS = [
    { value: "newest", label: "Newest First" },
    { value: "rating", label: "Highest Rated" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
];

export default function ExplorePage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // Filters
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "All");
    const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest");
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
    const [showFilters, setShowFilters] = useState(false);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.set("search", search);
            if (category && category !== "All") params.set("category", category);
            if (sortBy) params.set("sortBy", sortBy);
            if (minPrice) params.set("minPrice", minPrice);
            if (maxPrice) params.set("maxPrice", maxPrice);
            params.set("page", String(page));
            params.set("limit", "12");

            const url = `${SERVER_URL}/items?${params.toString()}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json() as ItemsResponse;
            setItems(data.items);
            setTotal(data.total);
            setTotalPages(data.totalPages);
        } catch {
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, [search, category, sortBy, minPrice, maxPrice, page]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchItems();
    };

    const clearFilters = () => {
        setSearch("");
        setCategory("All");
        setSortBy("newest");
        setMinPrice("");
        setMaxPrice("");
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 py-14 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-3">
                        Explore Handmade Items
                    </h1>
                    <p className="text-indigo-200 text-lg max-w-xl mx-auto mb-8">
                        Discover one-of-a-kind creations from independent artisans around the world.
                    </p>

                    {/* Search bar */}
                    <form onSubmit={handleSearch} className="flex max-w-xl mx-auto">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                            <input
                                id="explore-search"
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search ceramics, woodwork, jewelry..."
                                className="w-full pl-12 pr-4 py-3.5 rounded-l-full bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3.5 bg-[#F59E0B] text-white font-semibold rounded-r-full hover:bg-amber-600 transition-colors text-sm"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Category Tabs */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => { setCategory(cat); setPage(1); }}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                                    ${category === cat
                                        ? "bg-[#6366F1] text-white shadow-md shadow-indigo-200"
                                        : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 bg-white text-sm font-medium text-stone-600 hover:bg-stone-50 transition-all"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>
                        <select
                            id="explore-sort"
                            value={sortBy}
                            onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                            className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Expandable Filters */}
                {showFilters && (
                    <div className="bg-white border border-stone-100 rounded-2xl p-6 mb-6 flex flex-wrap gap-4 items-end shadow-sm">
                        <div>
                            <label className="block text-xs font-medium text-stone-500 mb-1">Min Price ($)</label>
                            <input
                                id="filter-min-price"
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                placeholder="0"
                                className="w-28 px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-stone-500 mb-1">Max Price ($)</label>
                            <input
                                id="filter-max-price"
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                placeholder="500"
                                className="w-28 px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            />
                        </div>
                        <button
                            onClick={() => { setPage(1); fetchItems(); }}
                            className="px-4 py-2 bg-[#6366F1] text-white text-sm font-semibold rounded-lg hover:bg-[#4F46E5] transition-all"
                        >
                            Apply
                        </button>
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                            <X className="w-4 h-4" />
                            Clear
                        </button>
                    </div>
                )}

                {/* Results count */}
                <p className="text-sm text-stone-500 mb-6">
                    {loading ? "Loading..." : `${total} item${total !== 1 ? "s" : ""} found`}
                </p>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading
                        ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
                        : items.map((item) => <ItemCard key={item._id} item={item} />)
                    }
                </div>

                {!loading && items.length === 0 && (
                    <div className="text-center py-24 text-stone-400">
                        <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium">No items found</p>
                        <p className="text-sm mt-1">Try adjusting your search or filters</p>
                        <button onClick={clearFilters} className="mt-4 px-6 py-2 bg-[#6366F1] text-white rounded-full text-sm font-medium hover:bg-[#4F46E5] transition-all">
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-12">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center disabled:opacity-40 hover:bg-stone-50 transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            const p = i + 1;
                            return (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-10 h-10 rounded-full text-sm font-medium transition-all
                                        ${page === p
                                            ? "bg-[#6366F1] text-white shadow-md"
                                            : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                                        }`}
                                >
                                    {p}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center disabled:opacity-40 hover:bg-stone-50 transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
