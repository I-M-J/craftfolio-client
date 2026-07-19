import Link from "next/link";
import { Hammer, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#1F2937] text-stone-300 py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                                <Hammer className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-xl font-display text-white tracking-tight">
                                Craft<span className="text-[#6366F1]">folio</span>
                            </span>
                        </Link>
                        <p className="text-sm text-stone-400 leading-relaxed">
                            A marketplace where independent artisans share their handcrafted creations with the world — without the middleman.
                        </p>
                        <div className="flex items-center gap-3">
                            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-stone-700 hover:bg-[#6366F1] flex items-center justify-center transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                            </a>
                            <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-lg bg-stone-700 hover:bg-[#6366F1] flex items-center justify-center transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.632 5.905-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-stone-700 hover:bg-[#6366F1] flex items-center justify-center transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                            <a href="https://github.com/I-M-J" aria-label="Github" className="w-8 h-8 rounded-lg bg-stone-700 hover:bg-[#6366F1] flex items-center justify-center transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/explore" className="hover:text-[#6366F1] transition-colors">All Items</Link></li>
                            <li><Link href="/explore?category=Ceramics" className="hover:text-[#6366F1] transition-colors">Ceramics</Link></li>
                            <li><Link href="/explore?category=Woodwork" className="hover:text-[#6366F1] transition-colors">Woodwork</Link></li>
                            <li><Link href="/explore?category=Jewelry" className="hover:text-[#6366F1] transition-colors">Jewelry</Link></li>
                            <li><Link href="/explore?category=Leather" className="hover:text-[#6366F1] transition-colors">Leather</Link></li>
                            <li><Link href="/explore?category=Textile+%26+Fiber" className="hover:text-[#6366F1] transition-colors">Textiles</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-[#6366F1] transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-[#6366F1] transition-colors">Contact Us</Link></li>
                            <li><Link href="/items/add" className="hover:text-[#6366F1] transition-colors">Start Selling</Link></li>
                            <li><span className="hover:text-[#6366F1] transition-colors cursor-pointer">Shipping Policy</span></li>
                            <li><span className="hover:text-[#6366F1] transition-colors cursor-pointer">Returns & Refunds</span></li>
                            <li><span className="hover:text-[#6366F1] transition-colors cursor-pointer">Privacy Policy</span></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <Mail className="w-4 h-4 text-[#6366F1] mt-0.5 shrink-0" />
                                <span>hello@craftfolio.com</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Phone className="w-4 h-4 text-[#6366F1] mt-0.5 shrink-0" />
                                <span>+1 (800) 555-CRAFT</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-[#6366F1] mt-0.5 shrink-0" />
                                <span>Brooklyn, NY 11201, USA</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-stone-700/60 text-center text-sm text-stone-500">
                    <p>&copy; {new Date().getFullYear()} Craftfolio. All rights reserved. Made with ❤️ for artisans everywhere.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
