import Link from "next/link";
import { Hammer, ArrowRight } from "lucide-react";

export default function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="text-white text-center lg:text-left max-w-xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                            <Hammer className="w-4 h-4" />
                            Free to List — Always
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
                            Ready to Share Your Craft with the World?
                        </h2>
                        <p className="text-white/80 text-lg">
                            Join over 1,200 independent artisans already selling on Craftfolio. No fees, no gatekeeping — just your work and the people who love it.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 shrink-0">
                        <Link
                            href="/register"
                            className="flex items-center gap-2 justify-center btn h-fit bg-white text-[#6366F1] px-8 py-4 text-base font-bold rounded-full hover:bg-stone-50 shadow-xl transition-all"
                        >
                            Start Selling Today
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/explore"
                            className="flex items-center gap-2 justify-center btn h-fit bg-white/10 text-white border border-white/30 px-8 py-4 text-base font-semibold rounded-full hover:bg-white/20 transition-all"
                        >
                            Browse Items First
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
