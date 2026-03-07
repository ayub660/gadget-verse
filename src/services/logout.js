import { signOut } from "next-auth/react";

export const handleLogout = async () => {
    try {
        // লগআউট করে ইউজারকে হোমপেজে পাঠিয়ে দিবে
        await signOut({ callbackUrl: "/", redirect: true });
    } catch (error) {
        console.error("Logout Error:", error);
    }
};