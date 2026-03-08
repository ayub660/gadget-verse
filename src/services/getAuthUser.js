import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getAuthUser = async () => {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return null;
        }

       
        return session.user;
    } catch (error) {
        console.error("Auth User Error:", error);
        return null;
    }
};