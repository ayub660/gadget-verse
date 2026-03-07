"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    // সুন্দর লোডিং স্টেট
    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium italic">Loading Gadgets for you...</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-extrabold mb-10 text-gray-900 italic tracking-tight">All Gadgets</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map(p => (
                    /* কার্ড ডিজাইন: লম্বাটে লুক এবং হোভার ইফেক্ট */
                    <div
                        key={p._id}
                        className="group flex flex-col bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-in-out h-[450px]"
                    >
                        {/* ইমেজ কন্টেইনার - লম্বাটে দেখানোর জন্য aspect-square ব্যবহার করা হয়েছে */}
                        <div className="relative w-full h-64 overflow-hidden rounded-xl bg-gray-50">
                            <img
                                src={p.image}
                                alt={p.title}
                                className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* কন্টেন্ট সেকশন */}
                        <div className="flex flex-col flex-grow mt-5">
                            <h2 className="font-bold text-gray-800 text-lg line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                                {p.title}
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">Premium Quality Gadget</p>

                            {/* প্রাইজ এবং বাটন নিচের দিকে রাখার জন্য mt-auto */}
                            <div className="mt-auto">
                                <p className="text-rose-600 font-black text-2xl mb-4">${p.price}</p>
                                <Link href={`/products/${p._id}`}>
                                    <button className="w-full bg-black text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-800 active:scale-95 transition-all duration-300">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProductsPage;