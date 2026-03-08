"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, ShoppingCart, Star } from "lucide-react";

const ProductCard = ({ product }) => {
    return (
        <div className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-2xl hover:shadow-rose-100 transition-all duration-300">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 mb-4">
                <img
                    src={product?.image || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300"}
                    alt={product?.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-gray-700">4.8</span>
                </div>
            </div>

            <div className="space-y-2 text-left">
                <p className="text-[10px] font-bold text-rose-700 uppercase tracking-widest">{product?.category || "Gadget"}</p>
                <h3 className="font-bold text-gray-900 truncate group-hover:text-rose-700 transition-colors">
                    {product?.title}
                </h3>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-2">
                    <span className="text-xl font-black text-gray-900">${product?.price}</span>
                    <div className="flex gap-2">
                        <Link
                            href={`/products/${product?._id}`}
                            className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-rose-50 hover:text-rose-700 transition"
                        >
                            <Eye size={18} />
                        </Link>
                        <button className="p-2 bg-rose-700 text-white rounded-lg hover:bg-rose-800 transition shadow-md shadow-rose-100">
                            <ShoppingCart size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                // 8 ta product slice kora hocche
                setProducts(data.slice(0, 8));
            } catch (error) {
                console.error("Error fetching featured products:", error);
            } finally {
                // Fetch shesh hole loading false hobe
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    // Data load hoa porjonto ei spinner-ti dekhabe
    if (loading) return (
        <div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-rose-700 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium italic animate-pulse">Loading Featured Gadgets...</p>
        </div>
    );

    return (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-700">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                    Featured <span className="text-rose-700">Gadgets</span>
                </h2>
                <div className="w-16 h-1 bg-rose-700 mx-auto mt-2"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div className="mt-16 text-center">
                <Link href="/products">
                    <button className="px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-rose-700 transition-all active:scale-95 shadow-xl uppercase tracking-widest text-xs">
                        View All Gadgets
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default FeaturedProducts;