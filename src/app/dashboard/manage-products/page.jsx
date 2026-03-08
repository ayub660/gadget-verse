"use client";
import { useEffect, useState } from "react";
import { Trash2, Eye } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        // SweetAlert Confirmation Dialog
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e11d48", // rose-600 color
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`/api/products/${id}`, {
                        method: "DELETE",
                    });

                    if (res.ok) {
                        setProducts(products.filter((p) => p._id !== id));
                        // Success SweetAlert
                        Swal.fire({
                            title: "Deleted!",
                            text: "The product has been deleted.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    } else {
                        Swal.fire("Error!", "Failed to delete the product.", "error");
                    }
                } catch (error) {
                    Swal.fire("Error!", "Something went wrong on the server.", "error");
                }
            }
        });
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 my-10 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Manage <span className="text-rose-700">Products</span>
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-rose-50 text-rose-700 uppercase text-xs font-bold">
                            <th className="p-4 rounded-l-xl">Product Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 rounded-r-xl text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {products.map((p) => (
                            <tr key={p._id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-semibold text-gray-700">{p.title}</td>
                                <td className="p-4 font-bold text-gray-900">${p.price}</td>
                                <td className="p-4 flex justify-center gap-3">
                                    <Link href={`/products/${p._id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                        <Eye size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(p._id)}
                                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;