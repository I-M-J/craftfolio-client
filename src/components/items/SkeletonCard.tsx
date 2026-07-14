const SkeletonCard = () => {
    return (
        <div className="rounded-2xl bg-white shadow-sm border border-stone-100 overflow-hidden flex flex-col animate-pulse">
            {/* Image skeleton */}
            <div className="aspect-square w-full bg-stone-200" />

            {/* Content skeleton */}
            <div className="p-4 flex flex-col gap-3">
                {/* Category badge */}
                <div className="h-5 w-20 bg-stone-200 rounded-full" />

                {/* Title */}
                <div className="h-5 w-full bg-stone-200 rounded-md" />

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-3.5 w-full bg-stone-200 rounded-md" />
                    <div className="h-3.5 w-3/4 bg-stone-200 rounded-md" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3.5 h-3.5 bg-stone-200 rounded-full" />
                    ))}
                    <div className="h-3 w-16 bg-stone-200 rounded-md ml-1" />
                </div>

                {/* Price */}
                <div className="h-6 w-16 bg-stone-200 rounded-md" />

                {/* Button */}
                <div className="h-10 w-full bg-stone-200 rounded-full" />
            </div>
        </div>
    );
};

export default SkeletonCard;
