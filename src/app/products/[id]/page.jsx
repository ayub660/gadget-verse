"use client";
import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const SingleProductPage = ({ params: paramsPromise }) => {
    const params = use(paramsPromise);
    const [product, setProduct] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetch(`/api/products/${params.id}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then(data => setProduct(data))
            .catch(err => console.error("Error:", err));
    }, [params.id]);

    if (!product) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-10">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-rose-600 mb-6 font-bold">
                <ArrowLeft size={20} /> Back
            </button>
            <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-3xl shadow-xl border">
                <img src={product.image} alt="" className="w-full md:w-1/2 rounded-2xl object-cover h-80" />
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">{product.title}</h1>
                    <p className="text-2xl text-rose-600 font-bold">${product.price}</p>
                    <p className="text-gray-600">{product.description || product.shortDesc}</p>
                    <button className="bg-rose-600 text-white px-8 py-3 rounded-full font-bold">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;