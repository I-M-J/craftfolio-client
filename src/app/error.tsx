"use client";

import { AlertTriangle, RotateCcw, House } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-background px-4">
            <div className="flex flex-col items-center gap-6 text-center max-w-md">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 border border-red-100">
                    <AlertTriangle className="h-10 w-10 text-danger" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-foreground font-display mb-2">
                        Something went wrong
                    </h1>
                    <p className="text-sm text-foreground/60 max-w-[260px] mx-auto">
                        {error.message || "An unexpected error occurred. Please try again."}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={reset}
                        className="btn btn-sm gap-2 bg-[#6366F1] text-white border-none hover:bg-[#4F46E5]"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Try Again
                    </button>
                    <Link href="/" className="btn btn-sm gap-2 bg-white text-foreground border border-stone-200 hover:bg-stone-50">
                        <House className="h-4 w-4" />
                        Go Home
                    </Link>
                </div>

            </div>
        </div>
    );
}
