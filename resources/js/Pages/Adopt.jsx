import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Adopt() {
    return (
        <AppLayout currentPath="/adopt">
            <Head title="Adopt a Cat - Dubai Street Kitties" />

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-b from-[#f2b7a7] to-[#9fcfc5] py-20 md:py-32 text-center px-6 overflow-hidden min-h-[500px] flex flex-col justify-center">
                {/* Peeking Cats Placeholders */}
                <div className="absolute top-0 left-0 w-[200px] md:w-[350px] opacity-90"><img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80" alt="Cat left" className="w-full h-auto object-contain" /></div>
                <div className="absolute top-0 right-0 w-[200px] md:w-[350px] opacity-90"><img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80" alt="Cat right" className="w-full h-auto object-contain" /></div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-[64px] font-bold text-gray-900 mb-6">Adopt a Cat</h1>
                    <p className="text-lg md:text-xl text-gray-700 font-medium">
                        Find your perfect feline companion. Each cat has been vaccinated, sterilized, and microchipped.
                    </p>
                </div>
            </section>

            {/* GIVE A SECOND CHANCE SECTION */}
            <section className="py-20 md:py-32 bg-white max-w-[1240px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                    <div className="w-full md:w-1/2 relative flex justify-center">
                        {/* Oval Image Frame */}
                        <div className="w-full max-w-[450px] aspect-[4/5] rounded-[240px] overflow-hidden border-8 border-white shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1596701062351-8c2c14d18cd3?auto=format&fit=crop&w=1000&q=80" 
                                alt="Founder with cats" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Teal rays placeholder */}
                        <div className="absolute -top-10 -left-10 w-24 h-24 text-[#8bcbbd]"><svg></svg></div>
                    </div>
                    
                    <div className="w-full md:w-1/2">
                        <div className="w-32 h-32 mb-8"><svg className="w-full h-full"></svg></div>
                        <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 leading-tight mb-2">
                            Give a Cat a Second Chance
                        </h2>
                        <h3 className="text-3xl md:text-[44px] font-bold text-[#8bcbbd] leading-tight mb-8">
                            Behind every cat on this page is a story.
                        </h3>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-sm md:text-base">
                            <p>Many of them were found hungry, injured, abandoned, or struggling to survive on the streets. Some were rescued as tiny kittens, others spent years outside before someone finally stepped in to help. Each one arrived frightened, tired, and uncertain of the world – but with patience, care, and love, they have been given a chance to feel safe again.</p>
                            <p>Today, more than 500 rescued cats are being cared for in our sanctuary. While they are safe and protected here, a sanctuary is only meant to be a temporary refuge, not a lifelong home. What these cats truly need is something much more important: a family, stability, and a place where they can belong.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="relative py-24 bg-[#f8e9e1] overflow-hidden">
                {/* Background Doodles Placeholder */}
                <div className="absolute inset-0 opacity-5 pointer-events-none"><svg className="w-full h-full"></svg></div>

                {/* Corner Cats */}
                <div className="absolute -bottom-10 -left-10 w-[200px] md:w-[350px] opacity-90"><img src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1000&q=80" alt="Peeking black cat" className="w-full h-auto" /></div>
                <div className="absolute -bottom-10 -right-10 w-[250px] md:w-[450px] opacity-90 translate-y-10"><img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=80" alt="Jumping cat" className="w-full h-auto" /></div>

                <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                    <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base font-medium mb-10">
                        <p>Every adoption opens a door. When one cat finds a loving home, it allows another vulnerable cat from the streets to be rescued and given the same chance at safety.</p>
                        <p>Right now, we are at full capacity, and our ability to help new cats depends on how quickly we can find homes for those who are ready for adoption. This means that every adoption – and even every share of this page – can directly help change a life.</p>
                        <p>If you cannot adopt, simply sharing these cats with your friends, family, or community may be the moment that connects them with the person meant to love them forever.</p>
                        <p>By adopting, fostering, or sharing their stories, you are not just helping one cat – you are helping create space for many more lives to be saved.</p>
                    </div>

                    <Link 
                        href="/available-cats"
                        className="inline-block bg-gradient-to-r from-[#fac2ac] to-[#8bcbbd] text-gray-800 font-bold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105"
                    >
                        Adopt our Cats
                    </Link>
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
