import Link from "next/link";
import { Eye, ShoppingCart, Star } from "lucide-react";


const ProductCard = ({ product }) => {
    return (
        <div className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-2xl hover:shadow-rose-100 transition-all duration-300">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 mb-4">
                <img
                    src={product?.image || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300"}
                    alt={product?.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-gray-700">4.8</span>
                </div>
            </div>

            <div className="space-y-2 text-left">
                <p className="text-[10px] font-bold text-rose-700 uppercase tracking-widest">{product?.category}</p>
                <h3 className="font-bold text-gray-900 truncate group-hover:text-rose-700 transition-colors">
                    {product?.name}
                </h3>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-2">
                    <span className="text-xl font-black text-gray-900">${product?.price}</span>
                    <div className="flex gap-2">
                        <Link
                            href={`/products/${product?._id}`}
                            className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-rose-50 hover:text-rose-700 transition"
                        >
                            <Eye size={18} />
                        </Link>
                        <button className="p-2 bg-rose-700 text-white rounded-lg hover:bg-rose-800 transition shadow-md shadow-rose-100">
                            <ShoppingCart size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const FeaturedProducts = () => {

    const products = [
        { _id: "1", name: "Flagship Smartphone", price: 999, category: "Mobile", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=300" },
        { _id: "2", name: "Premium Noise Cancelling Headphones", price: 349, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300" },
        { _id: "3", name: "Smart Watch Elite Series", price: 299, category: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300" },
    ];

    return (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                    Featured <span className="text-rose-700">Gadgets</span>
                </h2>
                <div className="w-16 h-1 bg-rose-700 mx-auto mt-2"></div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
};
export default FeaturedProducts;