"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@craftfolio.com", color: "text-[#6366F1]", bg: "bg-indigo-50" },
    { icon: Phone, label: "Phone", value: "+1 (800) 555-CRAFT", color: "text-[#10B981]", bg: "bg-emerald-50" },
    { icon: MapPin, label: "Location", value: "Brooklyn, NY 11201, USA", color: "text-[#F59E0B]", bg: "bg-amber-50" },
    { icon: Clock, label: "Hours", value: "Mon–Fri, 9am – 6pm EST", color: "text-purple-500", bg: "bg-purple-50" },
];

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>();

    const onSubmit = async (data: ContactFormData) => {
        // Simulate a form submission
        await new Promise((resolve) => setTimeout(resolve, 1200));
        toast.success("Message sent! We'll get back to you within 24 hours.");
        reset();
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white text-center px-4">
                <div className="max-w-xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Get in Touch</h1>
                    <p className="text-indigo-200 text-lg">
                        Have a question, a partnership idea, or just want to say hello? We would love to hear from you.
                    </p>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-bold font-display text-foreground mb-8">Contact Information</h2>

                        <div className="space-y-4 mb-10">
                            {contactInfo.map(({ icon: Icon, label, value, color, bg }) => (
                                <div key={label} className="flex items-start gap-4">
                                    <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                                        <Icon className={`w-5 h-5 ${color}`} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">{label}</p>
                                        <p className="text-sm text-foreground font-medium">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-4">Follow Us</h3>
                            <div className="flex gap-3">
                                <a href="#" className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-[#6366F1] hover:text-white text-stone-500 flex items-center justify-center transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-[#6366F1] hover:text-white text-stone-500 flex items-center justify-center transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.632 5.905-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
                        <h2 className="text-2xl font-bold font-display text-foreground mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset space-y-4">

                                <div>
                                    <label className="label text-sm font-medium text-stone-700 mb-1">Your Name</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                        placeholder="Jane Smith"
                                        {...register("name", { required: "Name is required" })}
                                    />
                                    {errors.name && <p className="text-danger text-xs">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label className="label text-sm font-medium text-stone-700 mb-1">Email Address</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                        placeholder="jane@example.com"
                                        {...register("email", { required: "Email is required" })}
                                    />
                                    {errors.email && <p className="text-danger text-xs">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label className="label text-sm font-medium text-stone-700 mb-1">Subject</label>
                                    <input
                                        id="contact-subject"
                                        type="text"
                                        className="input text-base w-full px-4 py-2 border border-stone-300 rounded-lg mb-1"
                                        placeholder="How can we help?"
                                        {...register("subject", { required: "Subject is required" })}
                                    />
                                    {errors.subject && <p className="text-danger text-xs">{errors.subject.message}</p>}
                                </div>

                                <div>
                                    <label className="label text-sm font-medium text-stone-700 mb-1">Message</label>
                                    <textarea
                                        id="contact-message"
                                        className="w-full px-4 py-3 border border-stone-300 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                                        rows={5}
                                        placeholder="Tell us what's on your mind..."
                                        {...register("message", {
                                            required: "Message is required",
                                            minLength: { value: 10, message: "Message must be at least 10 characters" },
                                        })}
                                    />
                                    {errors.message && <p className="text-danger text-xs">{errors.message.message}</p>}
                                </div>

                                <button
                                    id="contact-submit"
                                    type="submit"
                                    className="btn h-fit w-full bg-[#6366F1] text-white px-4 py-3 text-base font-semibold rounded-full hover:bg-[#4F46E5] transition-all flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <span className="loading loading-spinner loading-md text-white" />
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
