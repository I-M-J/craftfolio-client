import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Item } from "@/types";

interface ItemCardProps {
    item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
    const { _id, title, shortDescription, price, category, imageUrl, avgRating, totalReviews } = item;

    return (
        <div className="group rounded-2xl bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-stone-100 overflow-hidden flex flex-col">
            {/* Image */}
            <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                <Image
                    src={imageUrl || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#6366F1] rounded-full border border-indigo-100">
                        {category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 gap-2">
                <h3 className="font-semibold text-foreground text-base leading-tight truncate">
                    {title}
                </h3>

                <p className="text-sm text-stone-500 line-clamp-2 flex-1">
                    {shortDescription}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    <div className="flex text-[#F59E0B]">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < Math.floor(avgRating) ? "fill-current" : "text-stone-300"}`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-stone-500 font-medium ml-1">
                        {avgRating > 0 ? avgRating.toFixed(1) : "New"} ({totalReviews})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mt-1">
                    <span className="text-lg font-bold text-foreground">
                        ${price}
                    </span>
                </div>

                {/* CTA */}
                <Link
                    href={`/items/${_id}`}
                    className="btn h-fit w-full bg-[#6366F1] text-white px-4 py-2.5 text-sm font-semibold rounded-full hover:bg-[#4F46E5] transition-colors mt-1"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ItemCard;
