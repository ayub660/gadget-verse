import Link from "next/link";
import { ShoppingBag, Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-50 border-t border-gray-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* ১. ব্র্যান্ড এবং ডেসক্রিপশন */}
                    <div className="col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <ShoppingBag className="text-white" size={20} />
                            </div>
                            <span className="text-xl font-black tracking-tighter text-gray-900">
                                GADGET<span className="text-blue-600">VERSE</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Explore the latest in tech. We bring the most innovative gadgets right to your doorstep with quality and trust.
                        </p>
                    </div>

                    {/* ২. গুরুত্বপূর্ণ লিঙ্কস (অল্প এবং প্রয়োজনীয়) */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-wider">Useful Links</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-gray-500 hover:text-blue-600 text-sm transition font-medium">Home</Link></li>
                            <li><Link href="/products" className="text-gray-500 hover:text-blue-600 text-sm transition font-medium">All Products</Link></li>
                            <li><Link href="/dashboard" className="text-gray-500 hover:text-blue-600 text-sm transition font-medium">Dashboard</Link></li>
                            <li><Link href="/dashboard/add-product" className="text-gray-500 hover:text-blue-600 text-sm transition font-medium">Add Product</Link></li>
                        </ul>
                    </div>

                    {/* ৩. কন্টাক্ট এবং সোশ্যাল */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-wider">Contact Us</h4>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-3 text-gray-500 text-sm">
                                <MapPin size={16} className="text-blue-600" />
                                Dhanmondi, Dhaka, Bangladesh
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 text-sm">
                                <Mail size={16} className="text-blue-600" />
                                hello@gadgetverse.com
                            </li>
                        </ul>
                        <div className="flex gap-4">
                            <Facebook size={18} className="text-gray-400 hover:text-blue-600 cursor-pointer transition" />
                            <Instagram size={18} className="text-gray-400 hover:text-pink-600 cursor-pointer transition" />
                            <Twitter size={18} className="text-gray-400 hover:text-blue-400 cursor-pointer transition" />
                        </div>
                    </div>

                </div>

                {/* নিচের কপিরাইট অংশ */}
                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-xs">
                        © {new Date().getFullYear()} GadgetVerse. Built for tech enthusiasts.
                    </p>
                    <div className="flex gap-6 text-xs text-gray-400 italic">
                        Developed with Next.js & MongoDB
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;