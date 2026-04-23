import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function CatProfile() {
    const cat = {
        name: 'Luna',
        age: '2 years',
        gender: 'Female',
        breed: 'Domestic Short Hair',
        color: 'Black & White',
        fee: 'Free',
        personality: ['Affectionate', 'Playful'],
        story: 'Luna was found as a tiny kitten in a parking lot in Dubai Marina. She was timid at first but has blossomed into a loving, playful companion who adores cuddles and playtime.',
        healthNotes: 'Healthy, no known issues',
        goodWith: ['Kids', 'Cats'],
        images: [
            'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&q=80',
        ]
    };

    return (
        <AppLayout currentPath="/adopt">
            <Head title={`${cat.name}'s Profile - Dubai Street Kitties`} />

            <section className="py-12 bg-[#faf7f3]">
                <div className="max-w-[1240px] mx-auto px-6">
                    {/* Back Link */}
                    <Link 
                        href="/available-cats" 
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-10 font-medium transition-colors"
                    >
                        <span className="text-xl">←</span> Back to All Cats
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        {/* LEFT COLUMN: IMAGES */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="rounded-[40px] overflow-hidden shadow-sm aspect-square">
                                <img src={cat.images[0]} alt={cat.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {cat.images.slice(1).map((img, idx) => (
                                    <div key={idx} className="rounded-3xl overflow-hidden aspect-square border border-white shadow-sm">
                                        <img src={img} alt={`${cat.name} ${idx + 2}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: DETAILS */}
                        <div className="lg:col-span-7">
                            <h1 className="text-5xl md:text-[64px] font-bold text-gray-900 mb-8">{cat.name}</h1>
                            
                            {/* Primary Badges */}
                            <div className="flex flex-wrap gap-3 mb-10">
                                <span className="bg-[#ffefe9] text-[#f08063] font-bold px-6 py-2.5 rounded-full text-sm">{cat.age}</span>
                                <span className="bg-[#f3f6f5] text-[#8bcbbd] font-bold px-6 py-2.5 rounded-full text-sm">{cat.gender}</span>
                                <span className="bg-[#ffefe9] text-[#f08063] font-bold px-6 py-2.5 rounded-full text-sm">{cat.breed}</span>
                            </div>

                            {/* Info Box */}
                            <div className="grid grid-cols-2 bg-[#f3f6f5]/50 border border-white rounded-[32px] p-8 mb-10">
                                <div>
                                    <p className="text-sm text-gray-400 mb-2">Color</p>
                                    <p className="font-bold text-gray-900">{cat.color}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-2">Adoption Fee</p>
                                    <p className="font-bold text-gray-900">{cat.fee}</p>
                                </div>
                            </div>

                            {/* Personality */}
                            <div className="mb-10">
                                <h4 className="text-sm font-bold text-[#f08063] uppercase tracking-wider mb-4">Personality</h4>
                                <div className="flex flex-wrap gap-3">
                                    {cat.personality.map(trait => (
                                        <span key={trait} className="bg-[#ffefe9] text-[#f08063] font-bold px-6 py-2 rounded-full text-xs">
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Story */}
                            <div className="mb-10">
                                <h4 className="text-sm font-bold text-[#f08063] uppercase tracking-wider mb-4">Story</h4>
                                <p className="text-gray-500 leading-relaxed text-sm">{cat.story}</p>
                            </div>

                            {/* Medical Summary */}
                            <div className="mb-10">
                                <h4 className="text-sm font-bold text-[#f08063] uppercase tracking-wider mb-6">Medical summary</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {['Vaccinated', 'Sterilized', 'Microchipped'].map(item => (
                                        <div key={item} className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#8bcbbd]/20 flex items-center justify-center text-[#8bcbbd]"><svg className="w-5 h-5"></svg></div>
                                            <span className="text-xs text-gray-500 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Health Notes */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <div className="flex-grow bg-white border border-gray-100 rounded-full px-8 py-4 flex items-center">
                                    <p className="text-xs text-gray-400"><span className="font-bold text-gray-600">Health Notes:</span> {cat.healthNotes}</p>
                                </div>
                                <button className="bg-white border border-gray-100 text-gray-900 font-bold px-8 py-4 rounded-full text-xs shadow-sm hover:shadow-md transition">
                                    Download Report
                                </button>
                            </div>

                            {/* Good With */}
                            <div className="mb-12">
                                <h4 className="text-sm font-bold text-[#f08063] uppercase tracking-wider mb-4">Good With</h4>
                                <div className="flex flex-wrap gap-3">
                                    {cat.goodWith.map(trait => (
                                        <span key={trait} className="bg-[#ffefe9] text-[#f08063] font-bold px-8 py-2.5 rounded-full text-xs">
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full bg-gradient-to-r from-[#fac2ac] to-[#8bcbbd] text-gray-800 font-bold py-5 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-[1.01] mb-6">
                                Apply to Adopt {cat.name}
                            </button>
                            <p className="text-center text-[10px] text-gray-400 italic">All adoptions include full medical care and Lifetime support</p>

                            {/* Social Share Placeholder */}
                            <div className="flex justify-center gap-4 mt-8 text-gray-400">
                                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center"><svg className="w-4 h-4"></svg></div>
                                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center"><svg className="w-4 h-4"></svg></div>
                                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center"><svg className="w-4 h-4"></svg></div>
                                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center"><svg className="w-4 h-4"></svg></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* JOIN OUR MISSION */}
            <section className="py-24 bg-white text-center px-6">
                <div className="w-16 h-16 mx-auto text-[#f2b7a7] mb-8 opacity-90"><svg className="w-full h-full"></svg></div>
                <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-8 leading-tight">Join Our Mission</h2>
                <p className="text-gray-500 max-w-2xl mx-auto italic leading-relaxed text-sm md:text-base">
                    Whether you adopt, donate, volunteer, or simply spread the word, every contribution makes a difference. Together, we can create a better future for Dubai's cats.
                </p>
            </section>
        </AppLayout>
    );
}
