"use client";
import React, { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/products/${id}`)
                .then((res) => res.json())
                .then((data) => setProduct(data))
                .catch(err => console.error("Error fetching details:", err));
        }
    }, [id]);

    if (!product) return <div className="text-center py-20 font-bold">Loading Product...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
                <div className="rounded-2xl overflow-hidden bg-gray-50">
                    <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col justify-center space-y-6">
                    <span className="bg-rose-100 text-rose-700 text-xs font-black px-4 py-1 rounded-full uppercase w-fit">
                        {product.category}
                    </span>
                    <h1 className="text-4xl font-black text-gray-900 leading-tight">{product.title}</h1>
                    <p className="text-3xl font-bold text-rose-700">${product.price}</p>
                    <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-rose-700">
                        <p className="text-gray-600 leading-relaxed italic">"{product.description}"</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;