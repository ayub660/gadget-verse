import { Smartphone, Laptop, Watch, Headphones, Camera, Cpu } from "lucide-react";

const categories = [
    { name: "Mobiles", icon: <Smartphone />, count: "120+ Items" },
    { name: "Laptops", icon: <Laptop />, count: "80+ Items" },
    { name: "Watches", icon: <Watch />, count: "50+ Items" },
    { name: "Audio", icon: <Headphones />, count: "100+ Items" },
    { name: "Cameras", icon: <Camera />, count: "30+ Items" },
    { name: "Hardware", icon: <Cpu />, count: "60+ Items" },
];

const Categories = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-black text-gray-900 mb-10 uppercase tracking-tight text-center">
                    Browse by <span className="text-rose-700">Category</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((cat, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 text-center hover:border-rose-700 hover:shadow-xl hover:shadow-rose-50 transition-all cursor-pointer group">
                            <div className="text-gray-400 group-hover:text-rose-700 transition-colors flex justify-center mb-4">
                                {cat.icon}
                            </div>
                            <h3 className="font-bold text-gray-900 text-sm">{cat.name}</h3>
                            <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">{cat.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;