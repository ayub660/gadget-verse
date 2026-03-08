"use client";
import React from "react";
import Swal from "sweetalert2";

const AddProductPage = () => {
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const form = e.target;

        const product = {
            title: form.title.value,
            price: parseFloat(form.price.value), // Number এ কনভার্ট করা জরুরি
            image: form.image.value,
            shortDesc: form.shortDesc.value,
            description: form.description.value,
            category: form.category.value,
        };

        // Loading spinner 
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait while we save your gadget.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            // Api Call 
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            if (res.ok) {
                // Success message
                Swal.fire({
                    icon: "success",
                    title: "Excellent!",
                    text: "Your product has been added to the galaxy!",
                    showConfirmButton: false,
                    timer: 2000,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                form.reset();
            } else {
                throw new Error("Failed to add product");
            }
        } catch (error) {
            // Error msg 
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Please check your connection.",
                confirmButtonColor: "#be123c",
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-gray-100 my-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-gray-800">Add New <span className="text-rose-700 underline decoration-rose-200">Gadget</span></h2>
                <p className="text-gray-500 mt-2">Fill in the details to list your premium product.</p>
            </div>

            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-600 ml-1">Title</label>
                    <input name="title" type="text" placeholder="iPhone 15 Pro" className="w-full p-3.5 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-rose-50 transition-all" required />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-600 ml-1">Price ($)</label>
                    <input name="price" type="number" placeholder="999" className="w-full p-3.5 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-rose-50 transition-all" required />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-600 ml-1">Image URL</label>
                    <input name="image" type="url" placeholder="https://..." className="w-full p-3.5 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-rose-50 transition-all" required />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-600 ml-1">Category</label>
                    <select name="category" className="w-full p-3.5 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-rose-50 transition-all bg-white text-gray-700">
                        <option value="smartphone">Smartphone</option>
                        <option value="laptop">Laptop</option>
                        <option value="watch">Smart Watch</option>
                        <option value="audio">Audio/Headphones</option>
                    </select>
                </div>

                <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-bold text-gray-600 ml-1">Tagline</label>
                    <input name="shortDesc" type="text" placeholder="Short and catchy description (Max 50 chars)" className="w-full p-3.5 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-rose-50 transition-all" maxLength="50" required />
                </div>

                <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-bold text-gray-600 ml-1">Full Description</label>
                    <textarea name="description" rows="4" placeholder="Describe the specifications and features..." className="w-full p-3.5 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-rose-50 transition-all" required></textarea>
                </div>

                <button type="submit" className="md:col-span-2 bg-gradient-to-r from-rose-600 to-rose-800 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-rose-100 mt-4">
                    🚀 Upload to Store
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;