"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { signUp, signIn, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Hammer, User, Mail, Lock, Image as ImageIcon } from "lucide-react";

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    image?: string;
}

export default function RegisterPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [mounted, setMounted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && session?.user) {
            toast.success("You are already signed in");
            router.replace("/");
        }
    }, [session, router, mounted]);

    const onSubmit = async (data: RegisterFormData) => {
        const { error } = await signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            image: data.image,
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message || "Registration failed");
            return;
        }

        // Sync user to craftfolio_db users collection
        try {
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: data.name, email: data.email, image: data.image }),
            });
        } catch { /* best effort */ }

        toast.success("Account created! Welcome to Craftfolio");
        router.replace("/");
    };

    const handleGoogleSignIn = async () => {
        await signIn.social({ provider: "google" });
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
                    <h1 className="text-3xl font-bold font-display text-foreground">Create Account</h1>
                    <p className="mt-2 text-stone-500">Join the Craftfolio community</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset space-y-4">

                        <div>
                            <label className="label text-sm font-medium text-stone-700 mb-1">
                                <User className="w-4 h-4 inline mr-1" />
                                Full Name
                            </label>
                            <input
                                id="register-name"
                                type="text"
                                className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                placeholder="Your Full Name"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className="text-danger text-xs">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="label text-sm font-medium text-stone-700 mb-1">
                                <Mail className="w-4 h-4 inline mr-1" />
                                Email Address
                            </label>
                            <input
                                id="register-email"
                                type="email"
                                className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                placeholder="you@example.com"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-danger text-xs">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="label text-sm font-medium text-stone-700 mb-1">
                                <ImageIcon className="w-4 h-4 inline mr-1" />
                                Photo URL <span className="text-stone-400 font-normal">(optional)</span>
                            </label>
                            <input
                                id="register-photo"
                                type="text"
                                className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                placeholder="https://"
                                {...register("image")}
                            />
                        </div>

                        <div>
                            <label className="label text-sm font-medium text-stone-700 mb-1">
                                <Lock className="w-4 h-4 inline mr-1" />
                                Password
                            </label>
                            <input
                                id="register-password"
                                type="password"
                                className="input text-base h-fit w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                placeholder="Minimum 6 characters"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                })}
                            />
                            {errors.password && <p className="text-danger text-xs">{errors.password.message}</p>}
                        </div>

                        <button
                            id="register-submit"
                            type="submit"
                            className="btn h-fit w-full bg-[#6366F1] text-white px-4 py-3 text-base font-semibold rounded-full hover:bg-[#4F46E5] transition-all"
                        >
                            {isSubmitting
                                ? <span className="loading loading-spinner loading-md text-white" />
                                : "Create Account"
                            }
                        </button>

                        <button
                            id="register-google"
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
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#6366F1] font-semibold hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </section>
    );
}
