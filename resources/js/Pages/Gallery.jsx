import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

export default function Gallery({ galleryImages = [], galleryTypes = [] }) {
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', ...galleryTypes];

    const filteredCats = activeTab === 'All'
        ? galleryImages
        : galleryImages.filter((cat) => cat.type === activeTab);

    return (
        <AppLayout currentPath="/gallery">
            <Head title="Gallery - Dubai Street Kitties" />

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-b from-[#f2b7a7] to-[#9fcfc5] py-16 sm:py-20 lg:h-[400px] lg:py-0 text-center px-6 flex flex-col items-center justify-center">
                {/* Decorative Paw Print Placeholders */}
                <div className="absolute top-10 left-10 opacity-20 transform -rotate-12"><svg className="w-16 h-16"></svg></div>
                <div className="absolute top-1/4 right-10 opacity-20 transform rotate-12"><svg className="w-20 h-20"></svg></div>
                <div className="absolute bottom-10 left-1/4 opacity-10"><svg className="w-12 h-12"></svg></div>
                <div className="absolute top-1/2 left-10 opacity-10"><svg className="w-10 h-10"></svg></div>

                <div className="relative z-10">
                    <h1 className="text-4xl md:text-[64px] font-bold text-gray-900 mb-4">Gallery</h1>
                    <p className="text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto">
                        Discover your new best friend at Dubai Kitties. Browse our adorable cats available for adoption.
                    </p>
                </div>
            </section>

            {/* INTRO SECTION */}
            <section className="py-20 max-w-[1240px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                    <div className="w-full md:w-1/2 relative flex justify-center">
                        {/* Abstract Shape Background */}
                        <div className="bg-[#edc4b2] absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[90%] rounded-full -z-10 opacity-60"></div>
                        <div className="absolute -top-6 -left-6 w-16 h-16"><svg></svg></div>
                        
                        <img 
                            src="images/gallery-cat.png" 
                            alt="Featured Cat" 
                            className="w-[85%] rounded-[100px] object-cover "
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 leading-tight mb-8">
                            Never too late to adopt, <span className="text-[#8bcbbd]">never too young to learn.</span>
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            At Dubai Street Kitties Cat Sanctuary, our mission is to build a future where every cat in the UAE is safe, healthy, and loved. Founded by Dina Taj and her local Emirati partner, our sanctuary represents the power of unity, compassion, and shared purpose.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Together, we are creating a model of animal welfare rooted in care, responsibility, and the values that make the UAE extraordinary.
                        </p>
                    </div>
                </div>
            </section>

            {/* TABS / FILTER */}
            <section className="py-8 border-b border-gray-100">
                <div className="max-w-[800px] mx-auto flex flex-wrap justify-center gap-4 md:gap-8 px-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
                                activeTab === tab
                                    ? 'bg-[#8bcbbd] text-[#1f453c] shadow-sm'
                                    : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </section>

            {/* GALLERY GRID */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredCats.map((cat) => (
                            <div 
                                key={cat.id} 
                                className="group relative aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm hover:shadow-md transition duration-300"
                            >
                                <img 
                                    src={cat.path} 
                                    alt={`Cat ${cat.id}`} 
                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                />
                                {/* Optional overlay icon placeholder */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="bg-white/90 p-3 rounded-full shadow-sm"><svg className="w-6 h-6"></svg></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filteredCats.length === 0 ? (
                        <div className="mt-8 rounded-2xl border border-dashed border-[#d8cbc5] bg-[#f8f3ef] px-6 py-10 text-center text-sm text-[#7a706c]">
                            No images available in this category yet.
                        </div>
                    ) : null}
                </div>
            </section>

            {/* JOIN OUR MISSION */}
            <section className="py-24 bg-white text-center px-6 border-t border-gray-50">
                <div className="w-16 h-16 mx-auto text-[#f2b7a7] mb-8 opacity-90"><img src="images/2-User.svg" alt="" /></div>
                <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-8 leading-tight">Join Our Mission</h2>
                <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                    Whether you adopt, donate, volunteer, or simply spread the word, every contribution makes a difference. Together, we can create a better future for Dubai's cats.
                </p>
            </section>
        </AppLayout>
    );
}
