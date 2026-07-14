import Link from "next/link";
import { Hammer, Instagram, Twitter, Github, Facebook, Mail, MapPin, Phone } from "lucide-react";

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
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-lg bg-stone-700 hover:bg-[#6366F1] flex items-center justify-center transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-stone-700 hover:bg-[#6366F1] flex items-center justify-center transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://github.com/I-M-J" aria-label="Github" className="w-8 h-8 rounded-lg bg-stone-700 hover:bg-[#6366F1] flex items-center justify-center transition-colors">
                                <Github className="w-4 h-4" />
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
