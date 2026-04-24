import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Shop() {
    return (
        <AppLayout currentPath="/shop">
            <Head title="Shop - Dubai Street Kitties" />

            {/* SHOP HERO SECTION */}
            <section className="relative min-h-[600px] md:min-h-[750px] flex items-center justify-center bg-gradient-to-b from-[#f2b7a7] to-[#9fcfc5] overflow-hidden px-6">
                
                {/* Left Peeking Cat */}
                <div className="absolute -left-10 md:left-0 bottom-0 w-[250px] md:w-[450px] pointer-events-none z-10 transition-transform duration-500 hover:scale-105">
                    <img 
                        src="images/left-cat-peek.png" 
                        alt="Cat left" 
                        className="w-full object-contain"
                        style={{ maskImage: 'linear-gradient(to top, transparent 5%, black 20%)', WebkitMaskImage: 'linear-gradient(to top, transparent 5%, black 20%)' }}
                    />
                </div>

                {/* Right Peeking Cat */}
                <div className="absolute -right-10 md:right-0 bottom-0 w-[250px] md:w-[450px] pointer-events-none z-10 transition-transform duration-500 hover:scale-105">
                    <img 
                        src="images/Funny-Cat.png" 
                        alt="Cat right" 
                        className="w-full object-contain"
                        style={{ maskImage: 'linear-gradient(to top, transparent 5%, black 20%)', WebkitMaskImage: 'linear-gradient(to top, transparent 5%, black 20%)' }}
                    />
                </div>

                <div className="relative z-20 text-center max-w-3xl">
                    <h1 className="text-5xl md:text-[72px] font-bold text-gray-900 mb-8">Shop</h1>
                    <p className="text-base md:text-[18px] text-gray-700 font-medium leading-relaxed mb-12">
                        Support our rescue cats by purchasing merchandise! <br className="hidden md:block"/>
                        Every item features one of our rescued cats, and 100% of <br className="hidden md:block"/>
                        proceeds go directly to their medical care and the <br className="hidden md:block"/>
                        sanctuary.
                    </p>
                    
                    <button className="group relative overflow-hidden bg-gradient-to-r from-[#fac2ac] to-[#8bcbbd] hover:to-[#fac2ac] transition-all duration-500 rounded-2xl md:rounded-[24px] w-full max-w-[580px] py-8 md:py-10 shadow-lg">
                        <span className="relative z-10 text-xl md:text-2xl font-bold text-gray-800 tracking-wide">
                            Click Merchandise
                        </span>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10 transition-all duration-300 group-hover:h-2"></div>
                    </button>
                </div>
            </section>

            {/* JOIN OUR MISSION */}
            <section className="py-24 bg-white text-center px-6 border-t border-gray-50">
                <div className="w-16 h-16 mx-auto text-[#f2b7a7] mb-8 opacity-90"><img src="images/Message.svg" alt="paw print" className="w-full h-full" /></div>
                <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-8 leading-tight">Join Our Mission</h2>
                <p className="text-gray-500 max-w-2xl mx-auto italic leading-relaxed text-sm md:text-base">
                    Whether you adopt, donate, volunteer, or simply spread the word, every contribution makes a difference. Together, we can create a better future for Dubai's cats.
                </p>
            </section>
        </AppLayout>
    );
}
