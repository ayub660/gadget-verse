"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { FaEye, FaEyeSlash, FaCamera, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true);

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.value;

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password, image }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (res.ok) {

                Swal.fire({
                    title: "Registration Successful!",
                    text: "Wait a moment, we are logging you in...",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                });


                const loginRes = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (loginRes.ok) {
                    router.push("/dashboard");
                } else {
                    router.push("/login");
                }
            } else {
                Swal.fire({
                    title: "Error!",
                    text: data.message || "Registration failed",
                    icon: "error",
                    confirmButtonColor: "#be123c",
                });
            }
        } catch (error) {
            Swal.fire("Error!", "Something went wrong. Try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">
                        Create <span className="text-rose-700">Account</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Fill the form to join GadgetVerse</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block mb-1 ml-1 text-xs font-bold text-gray-600 uppercase">Full Name</label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                            <input
                                name="name"
                                type="text"
                                placeholder="Your name"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-700 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 ml-1 text-xs font-bold text-gray-600 uppercase">Email Address</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                            <input
                                name="email"
                                type="email"
                                placeholder="example@mail.com"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-700 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Profile Picture URL */}
                    <div>
                        <label className="block mb-1 ml-1 text-xs font-bold text-gray-600 uppercase">Profile Picture URL</label>
                        <div className="relative">
                            <FaCamera className="absolute left-3 top-3 text-gray-400" />
                            <input
                                name="image"
                                type="url"
                                placeholder="https://i.ibb.co/profile.jpg"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-700 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block mb-1 ml-1 text-xs font-bold text-gray-600 uppercase">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-700 outline-none transition-all"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-500 hover:text-rose-700 transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 font-bold text-white bg-rose-700 rounded-xl hover:bg-rose-800 shadow-lg shadow-rose-100 transition duration-300 active:scale-95 disabled:bg-gray-400"
                    >
                        {loading ? "Processing..." : "Register & Start"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="font-bold text-rose-700 hover:underline">
                        Login Here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;