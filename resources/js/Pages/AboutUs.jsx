import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const stats = [
    { 
        icon: <svg className="w-5 h-5 md:w-6 md:h-6"></svg>,
        value: '2,500', 
        label: 'Cats Rescued', 
        valueColor: 'text-[#f07b61]', 
        iconColor: 'text-[#f07b61]', 
        bgCircle: 'bg-[#ffede9]' 
    },
    { 
        icon: <svg className="w-5 h-5 md:w-6 md:h-6"></svg>,
        value: '350+', 
        label: 'Successful Adoptions', 
        valueColor: 'text-[#7abaac]', 
        iconColor: 'text-[#7abaac]', 
        bgCircle: 'bg-[#eef8f6]' 
    },
    { 
        icon: <svg className="w-5 h-5 md:w-6 md:h-6"></svg>,
        value: '200+', 
        label: 'TNR Efforts', 
        valueColor: 'text-[#f07b61]', 
        iconColor: 'text-[#f07b61]', 
        bgCircle: 'bg-[#ffede9]' 
    },
    { 
        icon: <svg className="w-5 h-5 md:w-6 md:h-6"></svg>,
        value: '5', 
        label: 'Years Active', 
        valueColor: 'text-black', 
        iconColor: 'text-gray-700', 
        bgCircle: 'bg-white border border-gray-200' 
    },
];

const galleryImages = [
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=600&q=80',
];

export default function AboutUs() {
    return (
        <AppLayout currentPath="/about-us">
            <Head title="About Us - Dubai Street Kitties" />

            {/* HERO SECTION */}
            <section className="bg-gradient-to-b from-[#f2b7a7] to-[#9fcfc5] py-20 md:py-32 text-center px-6">
                <h1 className="text-4xl md:text-[64px] font-bold text-gray-900 mb-4">About Us</h1>
                <p className="text-lg md:text-xl text-gray-700 font-medium">Dubai Street Kitties Cat Sanctuary</p>
            </section>

            {/* VISION SECTION */}
            <section className="py-20 max-w-[1200px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                    <div className="w-full md:w-1/2 relative">
                        {/* Abstract Shape Placeholders */}
                        
                        <img 
                            src="/images/dina-about-us.png" 
                            alt="Vision" 
                            className=" w-full object-cover "
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <p className="text-[#f08063] font-bold tracking-widest text-xs uppercase mb-4">Dubai Street Kitties Cat Sanctuary</p>
                        <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 leading-tight mb-8">
                            A Vision of Compassion, <br />
                            <span className="text-[#8bcbbd]">Innovation, and Community</span>
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

            {/* MISSION SECTION */}
            <section className="py-20 bg-white max-w-[1200px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-24">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 leading-tight mb-8">
                            Mission <span className="text-[#8bcbbd]">& Promise</span>
                        </h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed">
                            <p>We are dedicated to supporting the UAE's vision for a compassionate and forward-thinking society. Every day, our team provides medical care, love, and rehabilitation to hundreds of rescued cats, helping them heal and prepare for their forever homes.</p>
                            <p>With over 2,500 cats rescued and more than 400 currently thriving at our sanctuary, we are proud to be part of a growing movement of kindness and responsibility toward animals.</p>
                            <p>Our mission goes beyond rescue – it's about education, structure, and innovation. We are building systems that ensure every cat receives the best possible care while promoting awareness about responsible ownership, health, and community involvement.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 relative">
                        <div className="absolute -top-10 -left-10 transform scale-150"><svg></svg></div>
                        <img 
                            src="/images/mission-promise.png" 
                            alt="Mission" 
                            className="rounded-[40px] w-full h-[450px] object-cover shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="bg-[#f3f6f5] py-16 md:py-24">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                        {stats.map((stat) => (
                            <article key={stat.label} className="text-center flex flex-col items-center">
                                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-full ${stat.bgCircle} ${stat.iconColor}`}>
                                    {stat.icon}
                                </div>
                                <div className={`text-[42px] md:text-[50px] font-semibold leading-none ${stat.valueColor}`}>
                                    {stat.value}
                                </div>
                                <p className="mt-2 text-[14px] md:text-[15px] text-gray-500 font-medium">{stat.label}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR VISION DETAILS */}
            <section className="py-20 bg-white max-w-[1200px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                    <div className="w-full md:w-1/2 relative">
                        <img 
                            src="/images/vision.png" 
                            alt="Our Vision" 
                            className=""
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-4xl md:text-[46px] font-bold text-gray-900 leading-tight mb-4">Our Vision:</h2>
                        <h3 className="text-4xl md:text-[46px] font-bold text-[#8bcbbd] leading-tight mb-6">A Model for the Future</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            We aim to be the region's benchmark in rescue, care, and welfare policy through an integrated approach of education, legal reform, and direct action in partnership with the UAE.
                        </p>
                        <ul className="space-y-6">
                            {[
                                'Support and rehabilitated over five years with unwavering love and dedication.',
                                'Advocate animal welfare laws that offer robust safeguards and services.',
                                'Dedicatedly promoting and education across the community.',
                                'Drive sustainable change in alignment with UAE environmental goals.',
                            ].map((point, idx) => (
                                <li key={idx} className="flex gap-4 items-start">
                                    <div className="w-6 h-6 flex-shrink-0 mt-1 text-[#f08063]"><svg width="33" height="27" viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_43_681)">
<path d="M16.6039 14.4034C11.6307 14.5229 7.16073 18.8606 7.1498 23.8355C7.1498 24.8638 7.8316 26.2216 8.65195 26.8154C9.26448 27.2571 10.6208 26.7973 11.6089 26.5692C12.1703 26.4388 12.6771 26.0116 13.1621 25.6531C15.7434 23.7558 18.2847 23.7269 20.8296 25.7183C21.2562 26.0514 21.7302 26.4279 22.2333 26.5293C23.2287 26.7321 24.6105 27.2064 25.1939 26.7538C26.0069 26.1274 26.6523 24.7479 26.6377 23.6979C26.5721 18.7918 21.577 14.2803 16.6002 14.3998L16.6039 14.4034Z" fill="#FFB5A0"/>
<path d="M26.8784 5.63017C26.5539 2.59597 24.9388 0.195408 22.8605 0.0143704C20.9063 -0.155805 18.6312 1.87182 18.1317 4.52222C17.8801 5.84379 17.8874 7.28123 18.1317 8.60281C18.4416 10.2973 19.5281 11.6008 21.3511 11.8724C23.1085 12.1331 24.4502 11.1554 25.256 9.74335C25.9815 8.47608 26.3534 7.00968 26.8821 5.63379L26.8784 5.63017Z" fill="#FFB5A0"/>
<path d="M6.39883 5.35498C6.62853 7.54192 7.28845 9.37765 8.82342 10.826C10.6647 12.5675 13.0017 12.2598 14.4018 10.1489C16.1884 7.46227 15.4592 2.94356 12.9179 0.934036C11.0767 -0.521509 8.99114 -0.282539 7.78796 1.71974C7.13167 2.81683 6.84729 4.13479 6.39518 5.35498H6.39883Z" fill="#FFB5A0"/>
<path d="M7.36134 14.7038C6.39515 13.0962 5.79356 11.5574 4.72893 10.4603C3.34709 9.03735 1.26522 9.6565 0.419348 11.4705C-0.535906 13.5199 0.196942 16.793 2.14026 17.948C2.93509 18.4224 4.49558 18.6577 5.08988 18.2015C6.06336 17.4592 6.5337 16.0652 7.36499 14.7002L7.36134 14.7038Z" fill="#FFB5A0"/>
<path d="M26.0689 14.6859C26.4153 16.7823 27.2757 18.2234 28.7086 18.5275C30.59 18.9258 31.8187 17.8613 32.3984 16.3442C32.8906 15.0588 33.1312 13.5309 32.9307 12.1912C32.8031 11.3331 31.7931 10.1998 30.9582 9.9608C30.1269 9.72545 28.6904 10.1744 28.1107 10.837C27.1773 11.8979 26.7252 13.3824 26.0726 14.6859H26.0689Z" fill="#FFB5A0"/>
</g>
<defs>
<clipPath id="clip0_43_681">
<rect width="33" height="27" fill="white" transform="matrix(-1 0 0 1 33 0)"/>
</clipPath>
</defs>
</svg>
</div>
                                    <p className="text-gray-600 text-sm md:text-base">{point}</p>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 text-gray-600 italic">I made with your cat in Dubai has safe homes, access medical care, and a future built together with purpose and kindness.</p>
                    </div>
                </div>
            </section>

            {/* GUIDED BY FAITH */}
            <section className="bg-[#f3ece8] py-20 px-6 text-center">
                <div className="max-w-[1000px] mx-auto">
                    <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-8">
                        Guided by Faith <span className="text-[#8bcbbd]">& National Values</span>
                    </h2>
                    <div className="space-y-6 text-gray-500 max-w-3xl mx-auto leading-relaxed">
                        <p>Our work reflects the values of mercy and responsibility that lie at the heart of both Islam and UAE culture. We believe that compassion toward animals is a form of service and an expression of humanity.</p>
                        <p>By aligning our mission with national ethics, we strive to create a sanctuary that honors preservation, empowerment, and care for all living beings.</p>
                    </div>
                </div>
            </section>

            {/* GALLERY SECTION */}
            <section className="py-20 bg-white max-w-[1240px] mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {galleryImages.map((img, idx) => (
                        <div key={idx} className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <button className="bg-[#8bcbbd] text-[#1f453c] font-bold px-10 py-3 rounded-full hover:bg-[#7abeaf] transition shadow-sm">
                        See all
                    </button>
                </div>
            </section>

            {/* JOIN OUR MISSION */}
            <section className="py-20 bg-white text-center px-6 pb-32">
                <div className="w-20 h-20 mx-auto text-[#f2b7a7] mb-6 opacity-80"><svg className="w-full h-full"></svg></div>
                <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-6">Join Our Mission</h2>
                <p className="text-gray-500 max-w-2xl mx-auto italic leading-relaxed">
                    At Dubai Street Kitties, volunteering is more than helping - it's a way to join a family dedicated to kindness and making a real difference in the lives of our feline friends.
                </p>
            </section>
        </AppLayout>
    );
}


