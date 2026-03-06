import { Quote } from "lucide-react";

const reviews = [
    { name: "John Doe", role: "Tech Enthusiast", text: "GadgetVerse has the best collection of latest tech. The shipping was incredibly fast!" },
    { name: "Sarah Khan", role: "Software Engineer", text: "Quality products and amazing customer service. Highly recommended for any gadget lover." },
    { name: "Rahat Ahmed", role: "Gamer", text: "Found the exact gaming peripherals I was looking for. The prices are very competitive." },
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-black text-gray-900 mb-16 uppercase tracking-tight">
                    What Our <span className="text-rose-700">Clients Say</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((rev, i) => (
                        <div key={i} className="p-8 bg-gray-50 rounded-2xl relative">
                            <Quote className="text-rose-200 absolute top-6 left-6" size={40} />
                            <p className="text-gray-600 italic mb-6 relative z-10">{rev.text}</p>
                            <h4 className="font-bold text-gray-900">{rev.name}</h4>
                            <p className="text-xs text-rose-700 font-bold uppercase tracking-widest mt-1">{rev.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;