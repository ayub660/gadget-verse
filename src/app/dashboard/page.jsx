"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard, PlusCircle, Settings, ShoppingBag } from "lucide-react";

const DashboardPage = () => {
    const { data: session } = useSession();

    return (
        <div className="p-6 lg:p-12 bg-gray-50 min-h-screen">
            {/* Wellcome section */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6 mb-10">
                <img
                    src={session?.user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt="profile"
                    className="w-20 h-20 rounded-full border-4 border-rose-50"
                />
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-black text-gray-900">
                        Hello, <span className="text-rose-700">{session?.user?.name || "User"}</span>!
                    </h1>
                    <p className="text-gray-500 mt-1">Welcome to your GadgetVerse Control Center.</p>
                </div>
            </div>

            {/* Quick action card*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/dashboard/add-product" className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-rose-200 hover:shadow-md transition-all">
                    <div className="bg-rose-50 w-12 h-12 rounded-xl flex items-center justify-center text-rose-700 mb-4 group-hover:bg-rose-700 group-hover:text-white transition-colors">
                        <PlusCircle size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Add New Product</h3>
                    <p className="text-gray-500 text-sm mt-1">Upload new gadgets to your inventory.</p>
                </Link>

                <Link href="/dashboard/manage-products" className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-rose-200 hover:shadow-md transition-all">
                    <div className="bg-rose-50 w-12 h-12 rounded-xl flex items-center justify-center text-rose-700 mb-4 group-hover:bg-rose-700 group-hover:text-white transition-colors">
                        <Settings size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Manage Products</h3>
                    <p className="text-gray-500 text-sm mt-1">Edit or delete your existing listings.</p>
                </Link>

                <div className="p-6 bg-rose-700 rounded-2xl text-white shadow-lg shadow-rose-100">
                    <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                        <ShoppingBag size={24} />
                    </div>
                    <h3 className="text-lg font-bold">Total Sales</h3>
                    <p className="text-3xl font-black mt-1">$0.00</p>
                    <p className="text-rose-100 text-xs mt-2 italic">Feature coming soon...</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;