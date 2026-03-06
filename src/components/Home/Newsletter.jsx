const Newsletter = () => {
    return (
        <section className="py-20 bg-gray-50 border-y border-gray-100">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase">Subscribe for Updates</h2>
                <p className="text-gray-500 mb-8 font-medium">Be the first to know about new arrivals and exclusive tech deals.</p>
                <form className="flex flex-col sm:flex-row gap-3">
                    <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-700" required />
                    <button className="bg-rose-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-rose-800 transition">Subscribe</button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;