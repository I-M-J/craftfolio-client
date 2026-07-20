"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import {
    Menu,
    X,
    ChevronDown,
    User,
    LogOut,
    Plus,
    Package,
    Compass,
    Home,
    Info,
    Mail,
    Hammer,
} from "lucide-react";

const loggedOutLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/about", label: "About", icon: Info },
];

const loggedInLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/items/add", label: "Sell", icon: Plus },
    { href: "/items/manage", label: "My Items", icon: Package },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
    const { data: session, isPending } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSignOut = async () => {
        await signOut();
        setDropdownOpen(false);
        setMenuOpen(false);
    };

    const showSessionState = mounted && !isPending;
    const hasUser = showSessionState && !!session?.user;
    const navLinks = hasUser ? loggedInLinks : loggedOutLinks;

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-md">
                            <Hammer className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl font-display tracking-tight">
                            Craft<span className="text-[#6366F1]">folio</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="px-3 py-2 text-sm font-medium text-stone-600 hover:text-[#6366F1] rounded-lg hover:bg-indigo-50 transition-all"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center gap-3">
                        {!mounted || isPending ? (
                            <div className="w-8 h-8 rounded-full bg-indigo-100 animate-pulse" />
                        ) : session?.user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-indigo-200 hover:bg-indigo-50 transition-all"
                                >
                                    {session.user.image ? (
                                        <img
                                            src={session.user.image}
                                            alt={session.user.name}
                                            className="w-7 h-7 rounded-full object-cover"
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        <div className="w-7 h-7 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-xs font-bold">
                                            {session.user.name?.[0]?.toUpperCase() || "U"}
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-stone-700 max-w-[100px] truncate">
                                        {session.user.name?.split(" ")[0]}
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-stone-400" />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-52 bg-white border border-stone-100 rounded-xl shadow-xl py-1.5 z-50">
                                        <div className="px-4 py-2 border-b border-stone-100">
                                            <p className="text-sm font-semibold text-stone-800 truncate">{session.user.name}</p>
                                            <p className="text-xs text-stone-500 truncate">{session.user.email}</p>
                                        </div>
                                        <Link
                                            href="/items/add"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-indigo-50 hover:text-[#6366F1] transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add Item
                                        </Link>
                                        <Link
                                            href="/items/manage"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-indigo-50 hover:text-[#6366F1] transition-all"
                                        >
                                            <Package className="w-4 h-4" />
                                            My Items
                                        </Link>
                                        <Link
                                            href="/explore"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-indigo-50 hover:text-[#6366F1] transition-all"
                                        >
                                            <Compass className="w-4 h-4" />
                                            Explore
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-all"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-[#6366F1] hover:bg-indigo-50 rounded-lg transition-all"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-[#6366F1] hover:bg-[#4F46E5] rounded-lg shadow-sm transition-all"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-2">
                        {hasUser && (
                            <div className="w-7 h-7 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-xs font-bold">
                                {session?.user?.name?.[0]?.toUpperCase() || "U"}
                            </div>
                        )}
                        <button
                            className="p-2 rounded-lg text-stone-600 hover:bg-indigo-50 transition-all"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-stone-100 py-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-stone-600 hover:text-[#6366F1] hover:bg-indigo-50 rounded-lg transition-all"
                            >
                                <link.icon className="w-4 h-4" />
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
                            {hasUser && session?.user ? (
                                <>
                                    <div className="px-3 py-2.5 bg-indigo-50 rounded-xl">
                                        <p className="text-sm font-semibold text-stone-800 truncate">{session.user.name}</p>
                                        <p className="text-xs text-stone-500 truncate">{session.user.email}</p>
                                    </div>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg text-left transition-all"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 text-sm font-medium text-center text-[#6366F1] border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-all">Login</Link>
                                    <Link href="/register" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 text-sm font-medium text-center text-white bg-[#6366F1] rounded-lg hover:bg-[#4F46E5] transition-all">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
