"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { FaArrowRight, FaPlus } from "react-icons/fa";

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Ekhane kono force redirect rakha jabe na
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Product details ba See More click korle login check
    const handleProtectedAction = (e, targetUrl) => {
        if (status === "unauthenticated") {
            e.preventDefault(); // Link-e jaoa bondho korbe
            router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-rose-700 rounded-full animate-spin"></div>
        </div>
    );

    // Login thakle shob, na thakle 8-ti
    const displayedProducts = session ? products : products.slice(0, 8);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <header className="mb-12 flex justify-between items-center">
                <h1 className="text-4xl font-black text-gray-900 uppercase">
                    Our <span className="text-rose-700">Gadgets</span>
                </h1>
                {!session && (
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100 uppercase">
                        Guest Mode
                    </span>
                )}
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {displayedProducts.map((p) => (
                    <div key={p._id} className="group bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all h-[520px] flex flex-col">
                        <div className="h-56 bg-gray-50 rounded-2xl mb-4 overflow-hidden">
                            <img src={p.image} alt={p.title} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform" />
                        </div>
                        <h2 className="font-bold text-gray-800 text-lg line-clamp-1">{p.title}</h2>
                        <p className="text-rose-600 font-black text-xl mt-1">${p.price}</p>
                        <p className="text-gray-500 text-sm line-clamp-3 mt-2">{p.shortDescription || p.description}</p>

                        <div className="mt-auto">
                            <Link
                                href={`/products/${p._id}`}
                                onClick={(e) => handleProtectedAction(e, `/products/${p._id}`)}
                            >
                                <button className="w-full bg-gray-900 text-white py-3.5 rounded-2xl font-bold hover:bg-rose-700 transition-all flex items-center justify-center gap-2">
                                    View Details <FaArrowRight size={14} />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* See More Button */}
            {!session && products.length > 8 && (
                <div className="mt-16 flex flex-col items-center">
                    <p className="text-gray-400 text-sm mb-4 italic italic">Login to see {products.length - 8} more gadgets!</p>
                    <button
                        onClick={(e) => handleProtectedAction(e)}
                        className="bg-rose-700 text-white px-10 py-4 rounded-full font-black shadow-lg hover:bg-rose-800 transition-all flex items-center gap-2"
                    >
                        See More Products <FaPlus size={14} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllProductsPage;