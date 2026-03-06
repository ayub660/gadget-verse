"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen">
            <h1 className="text-3xl font-black text-gray-900 mb-8 uppercase italic">
                All <span className="text-rose-700">Gadgets</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all group">
                            <img src={product.image} alt={product.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 truncate">{product.title}</h3>
                                <p className="text-rose-700 font-black mt-2">${product.price}</p>
                                <Link href={`/products/${product._id}`}>
                                    <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-xl text-sm font-bold hover:bg-rose-700 transition">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No products found. Please add some from dashboard.</p>
                )}
            </div>
        </div>
    );
};

export default AllProductsPage;