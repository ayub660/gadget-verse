import Link from "next/link";
import { ArrowRight, Smartphone, Cpu, Watch } from "lucide-react";

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-white py-20 sm:py-32">
            {/* Background Deep Glow - একদম হালকা (Muted) */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-10 pointer-events-none">
                <div className="aspect-square w-[500px] rounded-full bg-gradient-to-br from-rose-700/20 to-red-900/10"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold uppercase tracking-wider mb-6 border border-rose-100">
                        <Cpu size={14} /> Premium Gadget Destination
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tight mb-8">
                        Experience Tech <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-red-800">
                            In A New Light
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10 leading-relaxed font-medium">
                        Browse through our curated collection of high-end gadgets.
                        Build your future with technology that matters.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/products"
                            className="w-full sm:w-auto px-8 py-4 bg-rose-700 text-white font-bold rounded-xl hover:bg-rose-800 transition shadow-lg shadow-rose-200 flex items-center justify-center gap-2"
                        >
                            Explore Products <ArrowRight size={20} />
                        </Link>

                        <Link
                            href="/dashboard/add-product"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-100 hover:border-rose-700 hover:text-rose-700 transition flex items-center justify-center gap-2"
                        >
                            Add New Device
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;