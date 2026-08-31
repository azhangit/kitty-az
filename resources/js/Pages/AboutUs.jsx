import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const stats = [
    { 
        icon: <img src="images/Heart.svg" alt="" />,
        value: '3,000', 
        label: 'Cats Rescued', 
        valueColor: 'text-[#f07b61]', 
        iconColor: 'text-[#f07b61]', 
        bgCircle: 'bg-[#ffede9]' 
    },
    { 
        icon: <img src="images/home-solid.svg" alt="" />,
        value: '1,000+', 
        label: 'Cats in Care', 
        valueColor: 'text-[#7abaac]', 
        iconColor: 'text-[#7abaac]', 
        bgCircle: 'bg-[#eef8f6]' 
    },
    { 
        icon: <img src="images/cut.svg" alt="" />,
        value: '1,000+', 
        label: 'TNR Efforts', 
        valueColor: 'text-[#f07b61]', 
        iconColor: 'text-[#f07b61]', 
        bgCircle: 'bg-[#ffede9]' 
    },
    { 
        icon: <img src="images/user.svg" alt="" />,
        value: '3', 
        label: 'Sanactuary Active', 
        valueColor: 'text-black', 
        iconColor: 'text-gray-700', 
        bgCircle: 'bg-white border border-gray-200' 
    },
];

const openingParagraphs = [
    'At Dubai Street Kitties, our mission is rooted in compassion, responsibility, and community. What began as two people rescuing injured and abandoned cats from the streets of the UAE has grown into a larger vision built on love, structure, and hope for a better future for animals.',
    'Over the past two years, we have rescued more than 3,000 cats, and today we continue caring for over 550 cats in our sanctuary and foster network. Every rescue represents a life that deserved another chance - a kitten abandoned in the heat, an injured cat found on the roadside, a mother struggling to protect her babies, or a sick animal left without care. Behind every rescue is a story of survival, rehabilitation, and healing.',
];

const missionParagraphs = [
    'I have lived in the UAE for over 20 years, and this country has become my home. Dubai Street Kitties was built from a deep love for this community and a desire to contribute positively to the society we live in. The UAE continues to evolve as a compassionate and forward-thinking nation, and we believe animal welfare is part of that vision.',
    'Our goal is not only to rescue cats, but to help build awareness, encourage responsibility, and inspire more people to become involved in supporting their communities.',
    'Stray animal overpopulation and abandonment are not issues unique to the UAE. They are global challenges faced by cities and shelters around the world. No individual, rescue, or government can solve these problems alone. Real change only happens when communities unite - through adoption, fostering, education, collaboration, and compassion.',
    'This is why we share our journey online. Not to seek praise, and never from a place of judgment, but to encourage kindness, awareness, and collective action. We want people to understand that even small acts of compassion can save lives.',
];

const visionPoints = [
    'A world-class sanctuary and rehabilitation center designed to provide rescued animals with safety, medical care, structure, and love.',
    'A peaceful sanctuary where injured cats can recover during long healing journeys.',
    'Protected spaces where kittens and pregnant mothers can be cared for with safety and compassion.',
    'Meaningful spaces where families and children can connect with animals in a compassionate environment.',
    'A future supported through professionalism, education, innovation, and strong community partnerships.',
    'Sustainable solutions created through people, businesses, rescuers, veterinarians, and local communities working together.',
];

const compassionActions = [
    'Every adoption changes a life.',
    'Every foster creates space for another rescue.',
    'Every act of support helps us continue.',
];

export default function AboutUs({ latestGalleryImages = [] }) {
    return (
        <AppLayout currentPath="/about-us">
            <Head title="About Us" />

            {/* HERO SECTION */}
            <section className="bg-gradient-to-b from-[#FFB5A0] to-[#9BCCC1] py-16 sm:py-20 lg:h-[400px] lg:py-0 text-center px-6 flex flex-col items-center justify-center">
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
                    <div className="w-full md:w-1/2 text-center">
                        <img src="images/sanctuary.png" alt="" className='dina-sanctuary mx-auto max-h-[139px]'/>
                        <h2 className="text-4xl md:text-[40px] font-bold text-gray-900 leading-tight mb-8">
                            A Vision of Compassion, <br />
                            <span className="text-[#8bcbbd]">Innovation, and Community</span>
                        </h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed">
                            {openingParagraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
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
                            {missionParagraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 relative">
                        <div className="absolute -top-10 -left-10 transform scale-150"><svg></svg></div>
                        <img 
                            src="/images/mission-promise.png" 
                            alt="Mission" 
                            className="rounded-[40px] w-full "
                        />
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="bg-gradient-to-b from-[#ECF2EE] to-[#FAF1EC] py-16 md:py-24">
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
                            Our long-term vision is to create a world-class sanctuary and rehabilitation center designed to provide rescued animals with safety, medical care, structure, and love.
                        </p>
                        <ul className="space-y-6">
                            {visionPoints.map((point) => (
                                <li key={point} className="flex gap-4 items-start">
                                    <div className="w-6 h-6 flex-shrink-0 mt-1 text-[#f08063]">
                                        <svg width="33" height="27" viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        <p className="mt-8 text-gray-600 leading-relaxed">
                            We envision a future where rescue is supported through professionalism, education, innovation, and strong community partnerships. A future where people, businesses, rescuers, veterinarians, and local communities work together to create sustainable solutions that improve the lives of animals while strengthening the compassion within society itself.
                        </p>
                    </div>
                </div>
            </section>

            {/* COMPASSION IN ACTION */}
            <section className="bg-[#f3ece8] py-20 px-6 text-center">
                <div className="max-w-[1000px] mx-auto">
                    <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-8">
                        Compassion <span className="text-[#8bcbbd]">Creates Change</span>
                    </h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        {compassionActions.map((action) => (
                            <div key={action} className="rounded-2xl bg-white px-5 py-6 text-base font-semibold text-[#4c403a] shadow-sm">
                                {action}
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 space-y-6 text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        <p className="text-lg font-semibold text-gray-900">Most importantly, every person who chooses compassion becomes part of something bigger than themselves.</p>
                        <p>Together, we can build a future where more animals are safe, loved, and given the second chance they deserve.</p>
                    </div>
                </div>
            </section>

            {/* GALLERY SECTION */}
            <section className="py-20 bg-white max-w-[1240px] mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {latestGalleryImages.map((img) => (
                        <div key={img.id} className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                            <img src={img.path} alt={img.type || `Gallery ${img.id}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                {latestGalleryImages.length === 0 ? (
                    <div className="mt-6 rounded-xl border border-dashed border-[#d8cbc5] bg-[#f8f3ef] px-4 py-8 text-center text-sm text-[#7a706c]">
                        Gallery images not available yet.
                    </div>
                ) : null}
                <div className="text-center mt-12">
                    <button className="bg-[#8bcbbd] text-[#1f453c] font-bold px-10 py-3 rounded-full hover:bg-[#7abeaf] transition shadow-sm">
                        See all
                    </button>
                </div>
            </section>

            {/* JOIN OUR MISSION */}
            <section className="py-20 bg-white text-center px-6 pb-32">
                <div className="w-20 h-20 mx-auto text-[#f2b7a7] mb-6 opacity-80"><img src="images/2-User.svg" alt="" /></div>
                <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-6">Join Our Mission</h2>
                <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Whether through adoption, fostering, education, collaboration, or support, every act of compassion helps us continue building a safer future for rescued animals.
                </p>
            </section>
        </AppLayout>
    );
}
