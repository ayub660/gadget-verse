"use client";
import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
                        Connect With <span className="text-rose-700">Us</span>
                    </h2>
                    <p className="text-gray-500 mt-2">Have a question? We'd love to hear from you.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="bg-rose-100 p-3 rounded-xl text-rose-700"><Phone size={24} /></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Call Us</p>
                                <p className="font-bold text-gray-800">+880 1700-000000</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="bg-rose-100 p-3 rounded-xl text-rose-700"><Mail size={24} /></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Email Us</p>
                                <p className="font-bold text-gray-800">hello@gadgetverse.com</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="bg-rose-100 p-3 rounded-xl text-rose-700"><MapPin size={24} /></div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Location</p>
                                <p className="font-bold text-gray-800">Dhaka, Bangladesh</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600">Full Name</label>
                                <input type="text" placeholder="John Doe" className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold text-gray-600">Subject</label>
                                <input type="text" placeholder="How can we help?" className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold text-gray-600">Message</label>
                                <textarea rows="5" placeholder="Write your message here..." className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition"></textarea>
                            </div>
                            <button className="md:col-span-2 bg-rose-700 text-white font-bold py-4 rounded-xl hover:bg-rose-800 transition-all shadow-lg shadow-rose-100 flex items-center justify-center gap-2">
                                <Send size={18} /> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;