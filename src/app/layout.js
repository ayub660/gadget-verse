import Header from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";
import AuthProvider from "@/provider/AuthProvider"; // পাথটি ঠিক আছে কি না নিশ্চিত করুন
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* AuthProvider-কে সবার উপরে দিন */}
        <AuthProvider> 
          <Header /> 
          <main className="min-h-[calc(100vh-200px)]">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}