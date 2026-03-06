const SpecialOffer = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-20">
            <div className="bg-rose-700 rounded-[32px] overflow-hidden relative">
                <div className="grid md:grid-cols-2 items-center">
                    <div className="p-10 md:p-20 text-white relative z-10">
                        <span className="bg-white/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Limited Time Offer</span>
                        <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4 leading-tight uppercase">Get 30% Off <br /> on Smartwatches</h2>
                        <p className="text-rose-100 mb-10 text-lg">Experience the next generation of wearables with our exclusive discount.</p>
                        <button className="bg-white text-rose-700 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition shadow-xl">Shop The Sale</button>
                    </div>
                    <div className="hidden md:block relative h-full">
                        <img src="https://images.unsplash.com/photo-1544117518-29057b97e9d1?q=80&w=800" className="object-cover h-full w-full" alt="Offer" />
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-700 to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffer;