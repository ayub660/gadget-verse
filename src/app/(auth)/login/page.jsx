"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();


    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        const resp = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (resp?.ok) {
            Swal.fire({
                title: "Welcome Back!",
                text: "Login Successful",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
            });


            router.push(callbackUrl);
            router.refresh();
        } else {
            Swal.fire({
                title: "Error!",
                text: "Invalid Email or Password",
                icon: "error",
                confirmButtonColor: "#be123c",
            });
        }
    };

    const handleSocialLogin = async (provider) => {

        await signIn(provider, { callbackUrl: callbackUrl });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">
                        Welcome <span className="text-rose-700">Back</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Please enter your details to login</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1 ml-1 text-xs font-bold text-gray-600 uppercase">Email Address</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                name="email"
                                type="email"
                                placeholder="example@mail.com"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-700 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 ml-1 text-xs font-bold text-gray-600 uppercase">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-700 outline-none transition-all"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-rose-700 transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 font-bold text-white bg-rose-700 rounded-xl hover:bg-rose-800 shadow-lg shadow-rose-100 transition duration-300 active:scale-95"
                    >
                        Sign In
                    </button>
                </form>

                <div className="relative flex items-center justify-center w-full mt-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <span className="relative px-3 bg-white text-gray-400 text-xs uppercase font-medium">Or continue with</span>
                </div>

                <div className="mt-6">
                    <button
                        type="button"
                        onClick={() => handleSocialLogin("google")}
                        className="flex items-center justify-center w-full py-2.5 space-x-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition duration-300 shadow-sm active:scale-95"
                    >
                        <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
                        <span className="font-bold text-gray-700">Google Account</span>
                    </button>
                </div>

                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/register" className="font-bold text-rose-700 hover:underline">
                        Register Here
                    </Link>
                </p>
            </div>
        </div>
    );
};


const LoginPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
    </Suspense>
);

export default LoginPage;