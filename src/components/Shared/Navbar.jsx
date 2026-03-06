"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, ShoppingBag, PlusSquare, LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // মোবাইল মেনুর জন্য
    const [user, setUser] = useState(null); // আপাতত null, লগইন লজিক বসালে এখানে ডাটা আসবে

    // নেভবার লিঙ্কগুলো
    const links = [
        { name: "Home", path: "/" },
        { name: "All Products", path: "/products" },
        { name: "About", path: "/about" },
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* ১. লোগো */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <ShoppingBag className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-gray-900">
                            GADGET<span className="text-blue-600">VERSE</span>
                        </span>
                    </Link>

                    {/* ২. ডেস্কটপ মেনু (মাঝখানে) */}
                    <div className="hidden md:flex space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* ৩. ইউজার সেকশন (ডানপাশে) */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="relative group">
                                {/* ইউজার প্রোফাইল বাটন */}
                                <button className="flex items-center gap-2 bg-gray-50 border border-gray-200 p-1.5 pr-3 rounded-full hover:bg-gray-100 transition">
                                    <div className="bg-blue-100 p-1.5 rounded-full text-blue-600">
                                        <User size={18} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">My Account</span>
                                </button>

                                {/* প্রোফাইল ড্রপডাউন (Hover করলে আসবে) */}
                                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                        <p className="text-xs text-gray-400">Signed in as</p>
                                        <p className="text-sm font-bold text-gray-800">User Name</p>
                                    </div>

                                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition">
                                        <LayoutDashboard size={16} /> Dashboard
                                    </Link>
                                    <Link href="/dashboard/add-product" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition">
                                        <PlusSquare size={16} /> Add Product
                                    </Link>

                                    <div className="border-t border-gray-50 mt-1">
                                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition">
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-blue-600 px-4 py-2">
                                    Login
                                </Link>
                                <Link href="/register" className="bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-100">
                                    Join Now
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* মোবাইল মেনু বাটন */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* মোবাইল মেনু লিস্ট */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-50 px-4 py-6 space-y-4 shadow-inner">
                    {links.map((link) => (
                        <Link key={link.name} href={link.path} className="block text-lg font-medium text-gray-600" onClick={() => setIsOpen(false)}>
                            {link.name}
                        </Link>
                    ))}
                    <hr />
                    <Link href="/login" className="block text-lg font-bold text-blue-600">Login</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;