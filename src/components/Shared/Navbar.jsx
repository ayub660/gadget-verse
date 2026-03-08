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
    const { data: session, status } = useSession();
    const user = session?.user;

    const links = [
        { name: "Home", path: "/" },
        { name: "All Products", path: "/products" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">


                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="bg-rose-700 p-2 rounded-xl group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-rose-200">
                            <ShoppingBag className="text-white" size={22} />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-gray-900 italic uppercase">
                            GADGET<span className="text-rose-700">VERSE</span>
                        </span>
                    </Link>


                    <div className="hidden md:flex items-center space-x-2">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className="px-4 py-2 text-gray-700 hover:text-rose-700 font-bold transition-all duration-300 text-sm hover:bg-rose-50 rounded-xl"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>


                    <div className="hidden md:flex items-center gap-4">
                        {status === "authenticated" ? (
                            <div className="relative group">
                                {/* Profile Button*/}
                                <button className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-1.5 rounded-2xl hover:border-rose-300 transition-all duration-300 outline-none">
                                    <div className="relative">
                                        <img
                                            key={user?.image}
                                            src={user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                            alt="profile"
                                            referrerPolicy="no-referrer"
                                            className="w-9 h-9 rounded-xl border-2 border-white object-cover shadow-sm"
                                        />
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                    </div>
                                    <div className="flex flex-col items-start pr-2">
                                        <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest leading-none mb-1">Active</span>
                                        <span className="text-sm font-bold text-gray-900 flex items-center gap-1 leading-none">
                                            {user?.name?.split(' ')[0] || "User"}
                                            <ChevronDown size={14} className="group-hover:rotate-180 transition-transform text-gray-400" />
                                        </span>
                                    </div>
                                </button>

                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-1">
                                    <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 overflow-hidden">
                                        <div className="px-5 py-3 border-b border-gray-50 mb-2">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Email Address</p>
                                            <p className="text-sm font-bold text-gray-800 truncate">{user?.email}</p>
                                        </div>

                                        <div className="px-2 space-y-1">
                                            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-all">
                                                <LayoutDashboard size={18} /> Dashboard
                                            </Link>
                                            <Link href="/dashboard/add-product" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-all">
                                                <PlusSquare size={18} /> Add Product
                                            </Link>
                                            <Link href="/dashboard/manage-products" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-all">
                                                <Settings size={18} /> Manage Gadgets
                                            </Link>
                                        </div>

                                        <div className="px-2 mt-2 pt-2 border-t border-gray-50">
                                            <button
                                                onClick={() => signOut({ callbackUrl: '/' })}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold"
                                            >
                                                <LogOut size={18} /> Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login" className="text-sm font-bold text-gray-700 hover:text-rose-700 px-4 py-2 transition-all">
                                    Login
                                </Link>
                                <Link href="/register" className="bg-rose-700 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-rose-800 transition-all shadow-lg shadow-rose-100 active:scale-95">
                                    Join Now
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile butoon */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 p-2 hover:bg-gray-100 rounded-xl transition-all">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu*/}
            <div className={`md:hidden absolute w-full bg-white border-b shadow-xl transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'}`}>
                <div className="p-5 space-y-3">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            onClick={() => setIsOpen(false)}
                            className="block px-5 py-4 text-base font-bold text-gray-800 hover:bg-rose-50 hover:text-rose-700 rounded-2xl transition-all"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-gray-100">
                        {user ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                    <img src={user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="w-12 h-12 rounded-xl object-cover" alt="profile" />
                                    <div>
                                        <p className="font-bold text-gray-900">{user?.name}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </div>
                                </div>
                                <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full text-center py-4 font-bold text-red-600 bg-red-50 rounded-2xl">Logout</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/login" onClick={() => setIsOpen(false)} className="text-center py-4 font-bold text-gray-800 bg-gray-50 rounded-2xl">Login</Link>
                                <Link href="/register" onClick={() => setIsOpen(false)} className="text-center py-4 font-bold text-white bg-rose-700 rounded-2xl">Join Now</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;