import Image from "next/image";
import Link from "next/link";
import { Hammer, Heart, ShieldCheck, Globe, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us — Craftfolio",
    description: "Learn about Craftfolio, our mission to connect independent artisans with collectors who care about authenticity and craftsmanship.",
};

const values = [
    {
        icon: Hammer,
        title: "Craft First",
        description: "We celebrate the skill, time, and intention behind every handmade object. The process matters as much as the product.",
        color: "text-[#6366F1]",
        bg: "bg-indigo-50",
    },
    {
        icon: Heart,
        title: "Human Connection",
        description: "Every transaction on Craftfolio is a direct relationship between a maker and a collector. No algorithms. No mass production.",
        color: "text-red-500",
        bg: "bg-red-50",
    },
    {
        icon: ShieldCheck,
        title: "Authentic Quality",
        description: "Every seller is verified. Every review is from a real buyer. We protect the integrity of handmade commerce.",
        color: "text-[#10B981]",
        bg: "bg-emerald-50",
    },
    {
        icon: Globe,
        title: "Global Community",
        description: "Artisans and collectors from 40+ countries make up our community. Distance is not a barrier to discovering great craft.",
        color: "text-[#F59E0B]",
        bg: "bg-amber-50",
    },
];

const team = [
    {
        name: "Elena Vasquez",
        role: "Founder & Ceramicist",
        bio: "Former studio potter who realized buyers had no great way to find authentic handmade goods online.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    },
    {
        name: "Marcus Webb",
        role: "CTO & Woodworker",
        bio: "Software engineer and hobbyist woodworker who built the platform to serve real artisan needs.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    },
    {
        name: "Priya Sharma",
        role: "Head of Community",
        bio: "Former Etsy seller who joined to help build a healthier, fairer marketplace for independent makers.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white text-center px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                        <Users className="w-4 h-4" />
                        Our Story
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
                        Built by Makers,<br />for Makers
                    </h1>
                    <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
                        Craftfolio was born from a simple belief: handmade objects deserve a marketplace that respects them — one that puts craft, community, and authenticity above algorithms and volume.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-sm font-semibold tracking-widest text-[#6366F1] uppercase mb-4">How it Started</p>
                            <h2 className="text-3xl font-bold font-display text-foreground mb-6">
                                The Problem We Saw
                            </h2>
                            <div className="space-y-4 text-stone-600 leading-relaxed">
                                <p>
                                    In 2024, Elena Vasquez — a studio potter in Brooklyn — noticed that the major craft marketplaces had become oversaturated with mass-produced imitations listed as &quot;handmade.&quot; Real artisans were being buried.
                                </p>
                                <p>
                                    She partnered with Marcus Webb, a software engineer who hand-builds furniture as a hobby, to create a platform with stricter authenticity standards, zero listing fees, and tools built specifically for independent makers.
                                </p>
                                <p>
                                    Craftfolio launched in early 2025 with 50 artisans. Today it serves over 1,200 makers and 45,000 buyers across 40 countries.
                                </p>
                            </div>
                        </div>

                        <div className="relative h-80 rounded-2xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80"
                                alt="Artisan at work"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-[#F5F5F4] px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold tracking-widest text-[#6366F1] uppercase mb-2">What We Believe</p>
                        <h2 className="text-3xl font-bold font-display text-foreground mb-3">Our Values</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map(({ icon: Icon, title, description, color, bg }) => (
                            <div key={title} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                                    <Icon className={`w-6 h-6 ${color}`} />
                                </div>
                                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                                <p className="text-sm text-stone-500 leading-relaxed">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold tracking-widest text-[#6366F1] uppercase mb-2">The People</p>
                        <h2 className="text-3xl font-bold font-display text-foreground mb-3">Meet the Team</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        {team.map(({ name, role, bio, avatar }) => (
                            <div key={name} className="text-center">
                                <img
                                    src={avatar}
                                    alt={name}
                                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
                                />
                                <h3 className="font-bold text-foreground">{name}</h3>
                                <p className="text-sm text-[#6366F1] font-medium mb-2">{role}</p>
                                <p className="text-sm text-stone-500 leading-relaxed">{bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white text-center px-4">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-3xl font-bold font-display mb-4">Join Our Community</h2>
                    <p className="text-indigo-200 mb-8">Whether you make or collect — you belong here.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/explore" className="btn h-fit bg-white text-[#6366F1] px-8 py-3 text-base font-bold rounded-full hover:bg-stone-50 transition-all">
                            Start Exploring
                        </Link>
                        <Link href="/register" className="btn h-fit bg-white/10 border border-white/30 text-white px-8 py-3 text-base font-semibold rounded-full hover:bg-white/20 transition-all">
                            Start Selling
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
