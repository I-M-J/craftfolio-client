import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Sarah Mitchell",
        role: "Interior Designer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "I found the most gorgeous ceramic bowls for my client's dining table. The seller even included a handwritten note about the clay she used. This is what shopping should feel like.",
    },
    {
        id: 2,
        name: "James Okonkwo",
        role: "Artisan Woodworker",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "I listed my first cheese board on Craftfolio and sold it within 48 hours. The platform is incredibly easy to use and the community of buyers genuinely appreciates handmade quality.",
    },
    {
        id: 3,
        name: "Priya Patel",
        role: "Gift Shop Owner",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "I stock my entire shop with Craftfolio finds. The quality is consistently excellent and every seller I have worked with has been professional and responsive. Highly recommend.",
    },
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-[#F5F5F4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-sm font-semibold tracking-widest text-[#6366F1] uppercase mb-2">
                        What People Say
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-display">
                        Loved by Makers & Collectors
                    </h2>
                    <p className="text-stone-500 text-base max-w-xl mx-auto">
                        Real reviews from real people who have experienced the Craftfolio difference.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map(({ id, name, role, avatar, rating, text }) => (
                        <div key={id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
                            <Quote className="w-8 h-8 text-[#6366F1]/30" />

                            <p className="text-stone-600 text-sm leading-relaxed flex-1">
                                &ldquo;{text}&rdquo;
                            </p>

                            <div className="flex text-[#F59E0B]">
                                {[...Array(rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                                <img
                                    src={avatar}
                                    alt={name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{name}</p>
                                    <p className="text-xs text-stone-500">{role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
