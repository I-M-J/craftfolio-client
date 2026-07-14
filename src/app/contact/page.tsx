"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send, Clock, Instagram, Twitter } from "lucide-react";
import type { Metadata } from "next";

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
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-[#6366F1] hover:text-white text-stone-500 flex items-center justify-center transition-all">
                                    <Twitter className="w-5 h-5" />
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
