"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

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
                title: "Success!",
                text: "Login Successful",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
            router.push("/dashboard");
            router.refresh();
        } else {
            Swal.fire({
                title: "Error!",
                text: "Invalid Email or Password",
                icon: "error",
                confirmButtonColor: "#2563eb",
            });
        }
    };

    const handleSocialLogin = (provider) => {
        signIn(provider, { callbackUrl: "/" });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

                {/* Email Password Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                        {/* Eye Icon Button */}
                        <button
                            type="button"
                            className="absolute right-3 top-[38px] text-gray-500 hover:text-blue-600 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                    >
                        Sign In
                    </button>
                </form>

                <div className="relative flex items-center justify-center w-full mt-6 border-t">
                    <span className="absolute px-3 bg-white text-gray-500 text-sm">OR</span>
                </div>

                {/* Social Login Buttons */}
                <div className="flex flex-col gap-3 mt-6">
                    <button
                        onClick={() => handleSocialLogin("google")}
                        className="flex items-center justify-center w-full py-2 space-x-2 border rounded-lg hover:bg-gray-50 transition duration-300 shadow-sm"
                    >
                        <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
                        <span>Continue with Google</span>
                    </button>
                </div>

                <p className="text-sm text-center text-gray-600 pt-2">
                    Don't have an account?{" "}
                    <Link href="/register" className="font-semibold text-blue-600 hover:underline">
                        Register Here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;