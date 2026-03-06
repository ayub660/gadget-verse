import Hero from "@/components/Home/Hero";
import Categories from "@/components/Home/Categories";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import SpecialOffer from "@/components/Home/SpecialOffer";
import Testimonials from "@/components/Home/Testimonials";
import Newsletter from "@/components/Home/Newsletter";


export default function HomePage() {
  return (
    <main className="bg-white min-h-screen">
      {/* ১. হিরো সেকশন - সবার উপরে */}
      <Hero />
      
      {/* ২. ক্যাটাগরি সেকশন - ইউজার যাতে শুরুতেই প্রোডাক্ট টাইপ বুঝতে পারে */}
      <Categories />
      
      {/* ৩. ফিচার্ড প্রোডাক্টস - আপনার মেইন গ্যাজেট লিস্ট */}
      
      <FeaturedProducts></FeaturedProducts>
      
      {/* ৪. স্পেশাল অফার - ডিসকাউন্ট বা বড় কোনো ব্যানার */}
      <SpecialOffer />
      
      {/* ৫. টেস্টিমোনিয়াল - কাস্টমার রিভিউ */}
      <Testimonials />
      
      {/* ৬. নিউজলেটার - ইমেইল সাবস্ক্রিপশন */}
      <Newsletter />
      
      {/* ৭. কন্টাক্ট ইনফো - ফুটারের ঠিক উপরে */}
      <section className="py-20 max-w-7xl mx-auto px-4 border-t border-gray-100 text-center">
         <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-2">
               <h4 className="font-black text-rose-700 uppercase tracking-wider text-sm">Our Location</h4>
               <p className="text-gray-600 font-medium">123 Tech Avenue, Level 4, Dhaka</p>
            </div>
            <div className="space-y-2">
               <h4 className="font-black text-rose-700 uppercase tracking-wider text-sm">Quick Contact</h4>
               <p className="text-gray-600 font-medium">support@gadgetverse.com</p>
               <p className="text-gray-600 font-medium">+880 1234 567 890</p>
            </div>
            <div className="space-y-2">
               <h4 className="font-black text-rose-700 uppercase tracking-wider text-sm">Business Hours</h4>
               <p className="text-gray-600 font-medium">Sat - Thu: 10:00 AM - 08:00 PM</p>
            </div>
         </div>
      </section>
    </main>
  );
}