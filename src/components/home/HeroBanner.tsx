"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
    {
        id: 1,
        title: "Handmade with Soul",
        subtitle: "Discover unique pieces crafted by independent artisans. Every item tells a story.",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80",
        button: "Explore the Collection",
    },
    {
        id: 2,
        title: "Ceramics & Stoneware",
        subtitle: "From wheel-thrown mugs to hand-built vessels — each piece is one of a kind.",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=1920&q=80",
        button: "Shop Ceramics",
    },
    {
        id: 3,
        title: "Artisan Woodwork",
        subtitle: "Carved from reclaimed wood — furniture, gifts, and everyday objects with character.",
        image: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=1920&q=80",
        button: "Shop Woodwork",
    },
];

export default function HeroBanner() {
    const [current, setCurrent] = useState(0);

    const goNext = useCallback(
        () => setCurrent((prev) => (prev + 1) % slides.length),
        []
    );
    const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    useEffect(() => {
        const timer = setInterval(goNext, 5500);
        return () => clearInterval(timer);
    }, [goNext]);

    const slide = slides[current];

    return (
        <section className="relative h-[580px] md:h-[680px] w-full overflow-hidden">
            <Image
                key={current}
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover animate__animated animate__fadeIn transition-transform duration-500 hover:scale-105"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />

            <div
                key={`text-${current}`}
                className="animate__animated animate__fadeInUp relative z-10 flex h-full flex-col justify-center px-8 md:px-20 gap-6"
            >
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 font-medium mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                        New Arrivals Every Week
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight mb-4">
                        {slide.title}
                    </h1>
                    <p className="text-lg text-stone-200 mb-8 max-w-xl">
                        {slide.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/explore"
                            className="btn bg-[#6366F1] text-white border-none rounded-full px-8 py-3 text-base font-semibold h-fit hover:bg-[#4F46E5] shadow-lg shadow-indigo-900/30 transition-all"
                        >
                            {slide.button}
                        </Link>
                        <Link
                            href="/items/add"
                            className="btn bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full px-8 py-3 text-base font-semibold h-fit hover:bg-white/20 transition-all"
                        >
                            Start Selling
                        </Link>
                    </div>
                </div>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${index === current ? "w-8 bg-[#6366F1]" : "w-2.5 bg-white/50"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Prev/Next */}
            <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                aria-label="Previous slide"
            >
                ‹
            </button>
            <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                aria-label="Next slide"
            >
                ›
            </button>
        </section>
    );
}
