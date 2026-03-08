import { signOut } from "next-auth/react";

export const handleLogout = async () => {
    try {
       
        await signOut({ callbackUrl: "/", redirect: true });
    } catch (error) {
        console.error("Logout Error:", error);
    }
};