"use client";
import React, { useEffect, useState } from "react";

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch("/api/products");
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    if (loading) return <div className="text-center py-20">Loading Gadgets...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">All Gadgets</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map(p => (
                    <div key={p._id} className="border p-4 rounded-xl shadow-sm">
                        <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded-lg" />
                        <h2 className="font-bold mt-2">{p.title}</h2>
                        <p className="text-rose-600 font-bold">${p.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProductsPage;