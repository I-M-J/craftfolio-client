"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Hammer, Mail, Lock } from "lucide-react";

interface LoginFormData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const { data: session, isPending } = useSession();
    const [mounted, setMounted] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>();

    const handleQuickLogin = (email: string) => {
        setValue("email", email);
        if (email === "admin@craftfolio.com") {
            setValue("password", "Admin@1234");
        } else if (email === "demo@craftfolio.com") {
            setValue("password", "Demo@1234");
        } else {
            setValue("password", "Seller@1234");
        }
        toast.success("Credentials populated! Click Sign In to log in.");
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && session?.user) {
            toast.success("You are already signed in");
            router.replace(callbackUrl);
        }
    }, [session, router, callbackUrl, mounted]);

    const onSubmit = async (data: LoginFormData) => {
        const { error } = await signIn.email({
            email: data.email,
            password: data.password,
            callbackURL: callbackUrl,
        });

        if (error) {
            toast.error(error.message || "Login failed");
            return;
        }

        toast.success("Welcome back!");
        router.replace(callbackUrl);
    };

    const handleGoogleSignIn = async () => {
        await signIn.social({
            provider: "google",
            callbackURL: callbackUrl,
        });
    };

    if (!mounted || isPending || session?.user) {
        return (
            <section className="bg-[#F5F5F4] min-h-dvh flex items-center justify-center">
                <span className="animate__animated animate__fadeIn loading loading-ring loading-md text-primary" />
            </section>
        );
    }

    return (
        <section className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#F5F5F4] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-stone-100">

                <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                        <Hammer className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold font-display text-foreground">Sign In</h1>
                    <p className="mt-2 text-stone-500">Welcome back to Craftfolio</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset space-y-4">

                        <div>
                            <label className="label text-sm font-medium text-stone-700 mb-1">
                                <Mail className="w-4 h-4 inline mr-1" />
                                Email Address
                            </label>
                            <input
                                id="login-email"
                                type="email"
                                className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                placeholder="you@example.com"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-danger text-xs">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="label text-sm font-medium text-stone-700 mb-1">
                                <Lock className="w-4 h-4 inline mr-1" />
                                Password
                            </label>
                            <input
                                id="login-password"
                                type="password"
                                className="input text-base h-fit w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                placeholder="Your password"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-danger text-xs">{errors.password.message}</p>}
                        </div>

                        <button
                            id="login-submit"
                            type="submit"
                            className="btn h-fit w-full bg-[#6366F1] text-white px-4 py-3 text-base font-semibold rounded-full hover:bg-[#4F46E5] transition-all"
                        >
                            {isSubmitting
                                ? <span className="loading loading-spinner loading-md text-white" />
                                : "Sign In"
                            }
                        </button>

                        <button
                            id="login-google"
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="btn h-fit w-full bg-white text-stone-700 border border-stone-300 px-4 py-3 text-base font-semibold rounded-full hover:bg-stone-50 transition-all"
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                            Continue with Google
                        </button>

                    </fieldset>
                </form>

                <p className="text-center text-sm text-stone-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-[#6366F1] font-semibold hover:underline">
                        Register here
                    </Link>
                </p>

                <div className="mt-4 p-4 bg-indigo-50/70 border border-indigo-100/50 rounded-2xl text-xs text-stone-600 space-y-3">
                    <p className="font-bold text-stone-800 text-sm">Quick Developer Login:</p>
                    <div className="flex flex-wrap gap-1.5">
                        <button
                            type="button"
                            onClick={() => handleQuickLogin("admin@craftfolio.com")}
                            className="px-2.5 py-1.5 bg-white hover:bg-indigo-100 border border-indigo-200 rounded-lg text-stone-700 font-medium transition-colors cursor-pointer"
                        >
                            Admin Account
                        </button>
                        <button
                            type="button"
                            onClick={() => handleQuickLogin("demo@craftfolio.com")}
                            className="px-2.5 py-1.5 bg-white hover:bg-indigo-100 border border-indigo-200 rounded-lg text-stone-700 font-medium transition-colors cursor-pointer"
                        >
                            Demo Account
                        </button>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-stone-600 font-medium mb-1">Select a Marketplace Seller:</label>
                        <select
                            onChange={(e) => {
                                if (e.target.value) {
                                    handleQuickLogin(e.target.value);
                                    e.target.value = "";
                                }
                            }}
                            className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1.5 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-indigo-400 cursor-pointer"
                            defaultValue=""
                        >
                            <option value="" disabled>Choose seller...</option>
                            <option value="maya@craftfolio.com">Maya Chen (Ceramics, Candles, Flowers, Beeswax)</option>
                            <option value="layla@craftfolio.com">Layla Osman (Fiber Art, Woodwork, Tote Bags, Pens)</option>
                            <option value="james@craftfolio.com">James Kowalski (Leather, Jewelry, Linen, Origami)</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    );
}
