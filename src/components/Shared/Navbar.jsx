"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
    Menu, X, ShoppingBag,
    PlusSquare, LogOut, LayoutDashboard,
    Settings, ChevronDown
} from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    const user = session?.user;

    const links = [
        { name: "Home", path: "/" },
        { name: "All Products", path: "/products" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* লোগো */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-rose-700 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                            <ShoppingBag className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-gray-900 uppercase">
                            GADGET<span className="text-rose-700">VERSE</span>
                        </span>
                    </Link>

                    {/* ডেস্কটপ মেনু */}
                    <div className="hidden md:flex space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className="text-gray-600 hover:text-rose-700 font-semibold transition-colors text-sm"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* ডানদিকের সেকশন (Auth) */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="relative group">
                                {/* প্রোফাইল বাটন */}
                                <button className="flex items-center gap-2 bg-gray-50 border border-gray-200 p-1 rounded-full hover:bg-gray-100 transition pr-3 outline-none">
                                    <img
                                        src={user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                        alt="profile"
                                        className="w-8 h-8 rounded-full border border-rose-200 object-cover"
                                    />
                                    <div className="flex flex-col items-start leading-tight">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Account</span>
                                        <span className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                                            {user?.name?.split(' ')[0]} <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" />
                                        </span>
                                    </div>
                                </button>

                                {/* ড্রপডাউন মেনু - (Hover এ দৃশ্যমান হবে) */}
                                <div className="absolute right-0 mt-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-1">
                                    <div className="bg-white border border-gray-100 rounded-xl shadow-2xl py-2 overflow-hidden">
                                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Logged in as</p>
                                            <p className="text-sm font-bold text-gray-800 truncate">{user?.email}</p>
                                        </div>

                                        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-rose-50 hover:text-rose-700 transition">
                                            <LayoutDashboard size={16} /> Dashboard
                                        </Link>
                                        <Link href="/dashboard/add-product" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-rose-50 hover:text-rose-700 transition">
                                            <PlusSquare size={16} /> Add Product
                                        </Link>
                                        <Link href="/dashboard/manage-products" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-rose-50 hover:text-rose-700 transition">
                                            <Settings size={16} /> Manage Products
                                        </Link>

                                        <div className="border-t border-gray-50 mt-1 pt-1">
                                            <button
                                                onClick={() => signOut({ callbackUrl: '/' })}
                                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition font-bold"
                                            >
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-rose-700 px-4 py-2 transition">
                                    Login
                                </Link>
                                <Link href="/register" className="bg-rose-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-rose-800 transition shadow-md shadow-rose-100 active:scale-95">
                                    Join Now
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* মোবাইল মেনু বাটন */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* মোবাইল ড্রপডাউন */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2 animate-in slide-in-from-top duration-300">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 text-base font-semibold text-gray-700 hover:bg-rose-50 hover:text-rose-700 rounded-xl"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-gray-50">
                        {user ? (
                            <>
                                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-semibold text-gray-700 hover:bg-rose-50 rounded-xl">Dashboard</Link>
                                <button onClick={() => signOut()} className="w-full text-left px-4 py-3 text-base font-bold text-red-600 hover:bg-red-50 rounded-xl">Logout</button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-3 font-bold text-gray-700 border border-gray-200 rounded-xl">Login</Link>
                                <Link href="/register" onClick={() => setIsOpen(false)} className="w-full text-center py-3 font-bold text-white bg-rose-700 rounded-xl">Join Now</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;