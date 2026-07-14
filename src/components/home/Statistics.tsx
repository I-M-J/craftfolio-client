"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { StatItem } from "@/types";

const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6", "#EC4899", "#F97316", "#14B8A6"];

const statsCards = [
    { label: "Active Artisans", value: "1,200+", description: "Independent makers on the platform" },
    { label: "Handmade Items", value: "12,000+", description: "Unique products listed globally" },
    { label: "Happy Buyers", value: "45,000+", description: "Satisfied customers and counting" },
    { label: "Avg. Rating", value: "4.8 ★", description: "Consistent 5-star quality craftsmanship" },
];

export default function Statistics() {
    const [data, setData] = useState<StatItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/stats`);
                if (!res.ok) throw new Error("Failed");
                const json = await res.json() as StatItem[];
                setData(json);
            } catch {
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <section className="py-20 bg-[#1F2937]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <p className="text-sm font-semibold tracking-widest text-[#6366F1] uppercase mb-2">
                        By the Numbers
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-display">
                        Craftfolio in Numbers
                    </h2>
                    <p className="text-stone-400 text-base max-w-xl mx-auto">
                        Real data from our growing community of artisans and collectors.
                    </p>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                    {statsCards.map(({ label, value, description }) => (
                        <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
                            <p className="text-3xl font-bold text-white font-display mb-1">{value}</p>
                            <p className="text-sm font-semibold text-[#6366F1] mb-1">{label}</p>
                            <p className="text-xs text-stone-500">{description}</p>
                        </div>
                    ))}
                </div>

                {/* Recharts Bar Chart */}
                {!loading && data.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h3 className="text-lg font-bold text-white font-display mb-6">Items by Category</h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={data} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                                <XAxis
                                    dataKey="category"
                                    tick={{ fill: "#9CA3AF", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: "#9CA3AF", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: "#374151",
                                        border: "none",
                                        borderRadius: "12px",
                                        color: "#fff",
                                        fontSize: "13px",
                                    }}
                                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                />
                                <Bar dataKey="count" name="Items" radius={[6, 6, 0, 0]}>
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </section>
    );
}
