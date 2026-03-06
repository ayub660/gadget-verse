"use client";
import React from "react";
import Swal from "sweetalert2";

const AddProductPage = () => {
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const form = e.target;
        const product = {
            title: form.title.value,
            price: form.price.value,
            image: form.image.value,
            shortDesc: form.shortDesc.value,
            description: form.description.value,
            category: form.category.value,
        };

        // এখানে আপনার API কল হবে। আপাতত আমরা সাকসেস মেসেজ দেখাচ্ছি।
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product added successfully!",
            showConfirmButton: false,
            timer: 1500
        });
        form.reset();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100 my-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New <span className="text-rose-700">Gadget</span></h2>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="title" type="text" placeholder="Product Title" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-200" required />
                <input name="price" type="number" placeholder="Price ($)" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-200" required />
                <input name="image" type="url" placeholder="Image URL" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-200" required />
                <select name="category" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-200 text-gray-500">
                    <option value="smartphone">Smartphone</option>
                    <option value="laptop">Laptop</option>
                    <option value="watch">Smart Watch</option>
                </select>
                <input name="shortDesc" type="text" placeholder="Short Description (Max 50 chars)" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-200 md:col-span-2" maxLength="50" required />
                <textarea name="description" rows="4" placeholder="Full Detailed Description" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-200 md:col-span-2" required></textarea>

                <button type="submit" className="md:col-span-2 bg-rose-700 text-white font-bold py-3 rounded-xl hover:bg-rose-800 transition shadow-lg shadow-rose-100">
                    Upload Product
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;