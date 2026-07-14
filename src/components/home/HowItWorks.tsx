import { Search, Pencil, ShoppingBag, ShieldCheck } from "lucide-react";

const steps = [
    {
        icon: Search,
        step: "01",
        title: "Discover",
        description: "Browse thousands of handcrafted items across dozens of categories. Filter by craft, price, and seller location.",
        color: "bg-indigo-100",
        iconColor: "text-[#6366F1]",
    },
    {
        icon: Pencil,
        step: "02",
        title: "Create",
        description: "Artisans list their goods for free. Add photos, describe your process, and set your price — it takes minutes.",
        color: "bg-amber-100",
        iconColor: "text-[#F59E0B]",
    },
    {
        icon: ShoppingBag,
        step: "03",
        title: "Connect",
        description: "Message artisans directly, ask for custom orders, or simply purchase their existing creations with confidence.",
        color: "bg-emerald-100",
        iconColor: "text-[#10B981]",
    },
    {
        icon: ShieldCheck,
        step: "04",
        title: "Trust",
        description: "Every seller is verified. Read authentic reviews from real buyers before every purchase.",
        color: "bg-purple-100",
        iconColor: "text-purple-600",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-sm font-semibold tracking-widest text-[#6366F1] uppercase mb-2">
                        Simple Process
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-display">
                        How Craftfolio Works
                    </h2>
                    <p className="text-stone-500 text-base max-w-xl mx-auto">
                        Whether you are a buyer or a maker, getting started takes just moments.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map(({ icon: Icon, step, title, description, color, iconColor }) => (
                        <div key={step} className="flex flex-col items-center text-center gap-4">
                            {/* Icon circle */}
                            <div className={`relative w-16 h-16 rounded-2xl ${color} flex items-center justify-center shadow-sm`}>
                                <Icon className={`w-7 h-7 ${iconColor}`} />
                                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#6366F1] text-white text-xs font-bold flex items-center justify-center">
                                    {step}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg text-foreground font-display">{title}</h3>
                            <p className="text-sm text-stone-500 leading-relaxed">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
