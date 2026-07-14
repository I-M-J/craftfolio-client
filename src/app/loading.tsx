import "animate.css";
import { Hammer } from "lucide-react";

export default function Loading() {
    return (
        <div className="animate__animated animate__fadeIn fixed inset-0 z-[100] flex items-center justify-center bg-linear-to-tr from-indigo-50 via-[#FAFAF9] to-amber-50">
            <div className="flex flex-col items-center gap-6 px-6 text-center">

                <div className="animate__animated animate__heartBeat animate__infinite animate__slow flex h-24 w-24 items-center justify-center rounded-full border border-white/40 bg-white/60 shadow-md backdrop-blur-sm">
                    <Hammer className="h-12 w-12 text-[#6366F1]" />
                </div>

                <div className="animate__animated animate__fadeInUp animate__fast animate__delay-1s">
                    <h1 className="text-3xl font-bold tracking-wide text-foreground font-display mb-1">
                        Craftfolio
                    </h1>
                    <p className="max-w-[200px] text-sm font-medium tracking-wide text-foreground/60">
                        Curating handcrafted goods for you...
                    </p>
                </div>

                <span className="animate__animated animate__fadeIn animate__delay-1s loading loading-ring loading-md text-primary" />

            </div>
        </div>
    );
}
