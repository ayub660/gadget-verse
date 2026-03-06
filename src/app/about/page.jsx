"use client";
import React from "react";
import { ShieldCheck, Zap, Globe, Users } from "lucide-react";

const AboutPage = () => {
    const features = [
        { icon: <ShieldCheck size={30} />, title: "Authentic Gadgets", desc: "We ensure 100% original products from top global brands." },
        { icon: <Zap size={30} />, title: "Fast Delivery", desc: "Get your favorite gadgets delivered to your doorstep in 24 hours." },
        { icon: <Globe size={30} />, title: "Global Warranty", desc: "Enjoy official brand warranty with every purchase you make." },
        { icon: <Users size={30} />, title: "24/7 Support", desc: "Our dedicated support team is always here to help you." },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-rose-50 py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
                        We Bring The <span className="text-rose-700">Future</span> To You
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        GadgetVerse is more than just an e-commerce platform. We are a community of tech enthusiasts dedicated to bringing the latest and greatest technology to everyone.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-shadow group">
                            <div className="text-rose-700 mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">{f.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;