import Link from "next/link";
import { Package, Gem, Flame, Scissors, Leaf, Star } from "lucide-react";

const categories = [
    {
        name: "Ceramics",
        description: "Wheel-thrown mugs, bowls, and vessels",
        icon: Package,
        color: "from-orange-400 to-amber-500",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
    },
    {
        name: "Woodwork",
        description: "Carved boards, pens, and furniture",
        icon: Leaf,
        color: "from-emerald-500 to-teal-600",
        image: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=600&q=80",
    },
    {
        name: "Jewelry",
        description: "Forged rings, necklaces, and earrings",
        icon: Gem,
        color: "from-purple-500 to-indigo-600",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    },
    {
        name: "Leather",
        description: "Hand-stitched wallets, bags, and belts",
        icon: Scissors,
        color: "from-stone-500 to-neutral-600",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    },
    {
        name: "Candles & Soaps",
        description: "Soy candles, balms, and artisan soaps",
        icon: Flame,
        color: "from-pink-400 to-rose-500",
        image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/5a29bc4f-27b3-48c9-8a09-cb7a8dbb0adc.__CR0,0,1600,1200_PT0_SX800_V1___.jpg",
    },
    {
        name: "Textile & Fiber",
        description: "Woven textiles, macramé, and embroidery",
        icon: Star,
        color: "from-sky-400 to-blue-500",
        image: "https://i.pinimg.com/originals/6b/b3/99/6bb399bc151b882366a0caf9ffb92e63.jpg",
    },
];

export default function CategoriesGrid() {
    return (
        <section className="py-20 bg-[#F5F5F4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-sm font-semibold tracking-widest text-[#6366F1] uppercase mb-2">
                        Browse by Craft
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-display">
                        Shop by Category
                    </h2>
                    <p className="text-stone-500 text-base max-w-xl mx-auto">
                        From clay to canvas — explore the full range of handmade disciplines.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map(({ name, description, icon: Icon, color, image }) => (
                        <Link
                            key={name}
                            href={`/explore?category=${encodeURIComponent(name)}`}
                            className="group relative h-48 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            {/* Background image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                                style={{ backgroundImage: `url(${image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />

                            {/* Icon top-right */}
                            <div className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                                <Icon className="w-4 h-4 text-white" />
                            </div>

                            {/* Text bottom */}
                            <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                                <h3 className="font-bold text-lg text-white font-display">{name}</h3>
                                <p className="text-sm text-white/80 mt-0.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    {description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link
                        href="/explore"
                        className="btn h-fit bg-[#6366F1] text-white px-8 py-3 text-base font-semibold rounded-full hover:bg-[#4F46E5] transition-all shadow-md"
                    >
                        Browse All Items
                    </Link>
                </div>
            </div>
        </section>
    );
}
