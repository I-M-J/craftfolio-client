import "animate.css";
import { Compass, House } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="animate__animated animate__fadeIn fixed inset-0 z-[100] flex items-center justify-center bg-linear-to-tr from-indigo-50 via-[#FAFAF9] to-amber-50">
            <div className="flex flex-col items-center gap-6 px-6 text-center">

                <div className="animate__animated animate__headShake animate__slow flex h-24 w-24 items-center justify-center rounded-full border border-white/40 bg-white/60 shadow-md backdrop-blur-sm">
                    <Compass className="h-12 w-12 text-[#6366F1]" />
                </div>

                <div className="animate__animated animate__fadeInUp animate__fast animate__delay-1s">
                    <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">
                        Error 404
                    </p>
                    <h1 className="text-3xl font-bold tracking-wide text-foreground font-display mb-1">
                        Page Not Found
                    </h1>
                    <p className="max-w-[220px] text-sm font-medium tracking-wide text-foreground/60">
                        Looks like this craft has wandered off the marketplace.
                    </p>
                </div>

                <div className="animate__animated animate__fadeInUp animate__fast animate__delay-2s flex gap-3">
                    <Link href="/" className="btn btn-sm gap-2 bg-[#6366F1] text-white border-none hover:bg-[#4F46E5]">
                        <House className="h-4 w-4" />
                        Go Home
                    </Link>
                    <Link href="/explore" className="btn btn-sm gap-2 bg-white text-foreground border border-stone-200 hover:bg-stone-50">
                        Explore Items
                    </Link>
                </div>

            </div>
        </div>
    );
}
