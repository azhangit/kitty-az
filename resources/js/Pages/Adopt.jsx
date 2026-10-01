import { Link } from '@inertiajs/react';
import SeoHead from '@/Components/SeoHead';
import AppLayout from '@/Layouts/AppLayout';

const afterAdoptionSupport = [
    {
        title: 'Personal guidance',
        desc: 'Tell us about your home, lifestyle, and the kitty you’re hoping to find. We’ll send you suitable matches and help you choose.',
    },
    {
        title: 'Trial adoption',
        desc: 'Get to know your cat at home before making a permanent commitment. If the match isn’t right, we’ll help you meet another suitable companion.',
    },
    {
        title: 'Free sanctuary check-ins',
        desc: 'Contact us to arrange a complimentary wellbeing check at the sanctuary. If your cat needs veterinary attention, we’ll guide you on the next steps.',
    },
    {
        title: 'A lifelong return commitment',
        desc: 'If an emergency means you can no longer care for your adopted cat, contact us. We always welcome our rescues back.',
    },
    {
        title: 'Free temporary care while you travel',
        desc: 'We can arrange for your adopted cat to stay with us while you’re away, with advance booking and available space.',
    },
    {
        title: 'Pet-sitting support',
        desc: 'We can arrange home visits for feeding, litter cleaning, cleaning your cat’s living area, wellbeing checks, playtime, and cuddles. Ask us about availability and fees.',
    },
    {
        title: 'Delivery and pickup',
        desc: 'If you live farther away or don’t have transport, we can arrange a driver to bring your adopted cat home or collect them when needed.',
    },
    {
        title: 'Ongoing advice',
        desc: 'You’re welcome to contact us with questions about settling in, behaviour, or caring for your cat.',
    },
    {
        title: 'Careful adoption screening',
        desc: 'Our adoption process helps ensure every rescue goes to a safe, suitable home with a plan for lifelong care.',
    },
];

export default function Adopt() {
    return (
        <AppLayout currentPath="/adopt">
            <SeoHead
                title="Cat Adoption in Dubai & Across the UAE"
                description="Find your perfect rescue companion in Dubai and across the UAE — with ongoing support, trial adoption, and a lifelong safety net from Dubai Street Kitties."
            />

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-b from-[#f2b7a7] to-[#9fcfc5] py-16 sm:py-20 lg:h-[400px] lg:py-0 text-center px-6 overflow-visible flex flex-col items-center justify-start lg:justify-center pt-10 sm:pt-12 lg:pt-0 pb-28 sm:pb-32 lg:pb-0">
                {/* Peeking Cats Placeholders */}
                <div className="absolute bottom-0 left-0 w-[200px] md:w-[350px]"><img src="images/adopt-left.png" alt="Cat left" className="w-full h-auto object-contain" /></div>
                <div className="absolute -bottom-7 right-0 w-[200px] md:-bottom-[3.25rem] md:w-[350px]"><img src="images/adopt-right.png" alt="Cat right" className="w-full h-auto object-contain" /></div>

                <div className="relative z-10 max-w-2xl mx-auto -translate-y-2 sm:-translate-y-4 lg:translate-y-0">
                    <h1 className="text-4xl md:text-[48px] lg:text-[56px] font-bold text-gray-900 mb-6 leading-tight">Cat Adoption in Dubai & Across the UAE</h1>
                    <p className="hidden text-lg font-medium text-gray-700 sm:block md:text-xl">
                        Find your perfect rescue companion—with ongoing support, trial adoption, and a lifelong safety net.
                    </p>
                </div>
            </section>

            {/* GIVE A SECOND CHANCE SECTION */}
            <section className="py-20 md:py-32 bg-white max-w-[1240px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                    <div className="w-full md:w-1/2 relative flex justify-center">
                        {/* Oval Image Frame */}
                        <div className="w-full">
                            <img 
                                src="images/founder-with-cats.png" 
                                alt="Founder with cats" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Teal rays placeholder */}
                        <div className="absolute -top-10 -left-10 w-24 h-24 text-[#8bcbbd]"><svg></svg></div>
                    </div>
                    
                    <div className="w-full text-center md:w-1/2">
                        <div className=" mb-8"><img src="images/sanctuary.png" alt="" className='mx-auto max-h-[139px]' /></div>
                        <h2 className="text-4xl md:text-[40px] font-bold text-gray-900 leading-tight">
                            Find Your Perfect Rescue Companion
                        </h2>
                        <h3 className="text-3xl md:text-[40px] font-bold text-[#8bcbbd] leading-tight mb-8">
                            With ongoing support and a lifelong safety net.
                        </h3>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-sm md:text-base">
                            <p>At Dubai Street Kitties, hundreds of rescued cats with different personalities, ages, and appearances are waiting for loving homes. Whether you’re looking for a playful kitten, a cuddly companion, or a calm older cat, we’ll help you find the right match.</p>
                            <p>Our adoption-ready cats are neutered, microchipped, vaccinated, and health-screened. We share each cat’s medical history and test results so you can adopt with confidence.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="relative overflow-visible bg-[#FAC8AE] py-24">
                {/* Background Doodles Placeholder */}
                <div className="absolute inset-0 opacity-5 pointer-events-none"><svg className="w-full h-full"></svg></div>

                {/* Corner Cats */}
                <div className="absolute bottom-0 left-0 w-[140px] md:-left-10 md:w-[350px]"><img src="images/black-cat.png" alt="Peeking black cat" className="w-full h-auto" /></div>
                <div className="pointer-events-none absolute -top-16 right-0 w-[180px] md:-top-20 md:-right-20 md:w-[369px]">
                    <img src="images/adult-gray-cat.png" alt="Jumping cat" className="w-full max-h-[676px] object-contain object-top" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Support that continues after adoption</h2>
                    <div className="space-y-5 text-gray-700 leading-relaxed text-sm md:text-base font-medium mb-10 text-left sm:text-center">
                        {afterAdoptionSupport.map((item) => (
                            <p key={item.title}>
                                <span className="font-bold text-gray-900">{item.title}:</span> {item.desc}
                            </p>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
                        <Link 
                            href="/available-cats"
                            className="inline-block bg-gradient-to-r from-[#fac2ac] to-[#8bcbbd] text-gray-800 font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105"
                        >
                            Adopt a Cat
                        </Link>
                        <Link 
                            href="/contact"
                            className="inline-block bg-white text-gray-800 font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105"
                        >
                            Become a Foster
                        </Link>
                        <Link 
                            href="/contact"
                            className="inline-block bg-white/80 text-gray-800 font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105"
                        >
                            Arrange a Visit
                        </Link>
                    </div>
                </div>
            </section>

            {/* JOIN OUR MISSION */}
            <section className="py-24 bg-white text-center px-6">
                <div className="w-16 h-16 mx-auto text-[#f2b7a7] mb-8 opacity-90"><img src="images/2-User.svg" alt="" /></div>
                <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-8 leading-tight">Let’s find your kitty</h2>
                <div className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base space-y-5">
                    <p>
                        Not ready to adopt? Foster a rescue cat. Fostering gives a rescued cat a loving temporary home while we search for their forever family. It can suit people who cannot yet make a lifelong commitment, are unsure about adoption, or have limited finances.
                    </p>
                    <p>
                        If you travel frequently, we’ll discuss your schedule and agree on a suitable fostering period and care arrangements before placement.
                    </p>
                    <p>
                        Send us a message or email with a little about yourself and the cat you’re hoping to welcome. We’ll share suitable options and answer your questions. You’re also welcome to arrange a visit to the sanctuary and meet our rescues in person.
                    </p>
                </div>
            </section>
        </AppLayout>
    );
}
