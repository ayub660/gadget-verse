import Link from "next/link";
import { ShoppingBag, Facebook, Twitter, Instagram, Mail, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* ১. ব্র্যান্ড এবং ডেসক্রিপশন */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2.5 mb-6 group">
                            <div className="bg-rose-700 p-2 rounded-xl group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-rose-100">
                                <ShoppingBag className="text-white" size={22} />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-gray-900 italic uppercase">
                                GADGET<span className="text-rose-700">VERSE</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                            Elevate your lifestyle with the most innovative tech. We deliver premium gadgets with quality and trust right to your doorstep.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                                <div key={idx} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-rose-700 hover:text-white hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-sm">
                                    <Icon size={18} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ২. এক্সপ্লোর লিঙ্কস (সঠিক রাউট সহ) */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-7 text-xs uppercase tracking-[0.2em]">Explore Gear</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'All Products', path: '/products' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Contact', path: '/contact' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.path}
                                        className="text-gray-500 hover:text-rose-700 text-sm transition-all duration-300 font-bold flex items-center gap-1 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-[2px] bg-rose-700 transition-all duration-300"></span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ৩. ম্যানেজমেন্ট সেকশন (ড্যাশবোর্ড রাউট) */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-7 text-xs uppercase tracking-[0.2em]">Management</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'User Dashboard', path: '/dashboard' },
                                { name: 'Add New Product', path: '/dashboard/add-product' },
                                { name: 'Manage Inventory', path: '/dashboard/manage-products' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.path}
                                        className="text-gray-500 hover:text-rose-700 text-sm transition-all duration-300 font-bold flex items-center gap-1 group"
                                    >
                                        {link.name}
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ৪. কন্টাক্ট ইনফো */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-7 text-xs uppercase tracking-[0.2em]">Get in Touch</h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-rose-50 rounded-lg text-rose-700">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Store Location</p>
                                    <p className="text-sm text-gray-700 font-bold italic">Madhupur, Tangail, Bangladesh</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-rose-50 rounded-lg text-rose-700">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Email Support</p>
                                    <p className="text-sm text-gray-700 font-bold">support@gadgetverse.com</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* নিচের কপিরাইট অংশ */}
                <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest text-center md:text-left">
                            © {new Date().getFullYear()} GadgetVerse • All Systems Operational
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                        <div className="text-[11px] text-gray-400 font-bold flex gap-4 uppercase tracking-widest">
                            <span className="hover:text-rose-700 cursor-pointer transition-colors">Privacy Policy</span>
                            <span className="hover:text-rose-700 cursor-pointer transition-colors">Terms of Service</span>
                        </div>
                        <div className="h-4 w-[1px] bg-gray-200 hidden md:block"></div>
                        <p className="text-[11px] font-black text-gray-900 italic">
                            Built with <span className="text-rose-700">Next.js & MongoDB</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;