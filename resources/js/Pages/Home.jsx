import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const stats = [
    { 
        icon: (
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        ),
        value: '2,500', 
        label: 'Cats Rescued', 
        valueColor: 'text-[#f07b61]', 
        iconColor: 'text-[#f07b61]', 
        bgCircle: 'bg-[#ffede9]' 
    },
    { 
        icon: (
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.592 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        ),
        value: '350+', 
        label: 'Successful Adoptions', 
        valueColor: 'text-[#7abaac]', 
        iconColor: 'text-[#7abaac]', 
        bgCircle: 'bg-[#eef8f6]' 
    },
    { 
        icon: (
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 10.5l-3-3m-4.5-4.5a3 3 0 100 6 3 3 0 000-6zm4.5 4.5l-3 3m10.5-3a3 3 0 100-6 3 3 0 000 6zm-10.5 3l4.5 4.5m-4.5-4.5l-4.5 4.5" />
            </svg>
        ),
        value: '200+', 
        label: 'TNR Efforts', 
        valueColor: 'text-[#f07b61]', 
        iconColor: 'text-[#f07b61]', 
        bgCircle: 'bg-[#ffede9]' 
    },
    { 
        icon: (
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        ),
        value: '5', 
        label: 'Years Active', 
        valueColor: 'text-black', 
        iconColor: 'text-gray-700', 
        bgCircle: 'bg-white border border-gray-200' 
    },
];

const supportPoints = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        ),
        title: 'Fitness With Dina',
        detail: 'Join my own online fitness application, available in...',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        ),
        title: 'Amazon Wishlist supplies',
        detail: 'Our Amazon Wish List includes essential items to...',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.592 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        ),
        title: 'Foster',
        detail: "If you can't commit to adopting you",
    },
];

export default function Home({ availableCats = [] }) {
    return (
        <AppLayout currentPath="/">
            <Head title="Dubai Street Kitties" />

            {/* HERO SECTION */}
            <section className="relative h-[450px] md:h-[550px] lg:h-[650px] flex items-center bg-gray-900">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="/images/home-hero.png"
                        alt="Cat rescue hero background"
                        className="w-full h-full object-cover object-[center_35%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                </div>

                <div className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 text-white pt-8">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-semibold leading-[1.1] tracking-tight">
                            Every Cat Deserves<br />
                            Love & <span className="text-[#85c3b6]">A Second Chance</span>
                        </h1>
                        <p className="mt-5 sm:mt-6 text-[15px] sm:text-[17px] text-white/90 max-w-xl leading-relaxed">
                            Rescuing, rehabilitating, and rehoming Dubai's street cats with compassion and care.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Link
                                href={route('cats.available')}
                                className="inline-flex justify-center items-center rounded-full bg-[#fac2ac] px-7 py-3.5 text-[14px] font-semibold text-[#30160d] transition hover:bg-[#efa68a]"
                            >
                                View Cats for Adoption
                            </Link>
                            <a
                                href="#"
                                className="inline-flex justify-center items-center rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-[#111] transition hover:bg-gray-100"
                            >
                                Support Our Mission
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="bg-white py-16 md:py-24 border-b border-gray-100/50">
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

            {/* AVAILABLE CATS SECTION */}
            <section className="bg-[#fbf9f8] py-20 md:py-28">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
                        <h2 className="text-[34px] md:text-[44px] font-semibold text-gray-900 leading-tight">Meet Our Available Cats</h2>
                        <p className="mt-4 text-[14px] md:text-[16px] text-gray-500 leading-relaxed max-w-xl mx-auto">
                            These beautiful souls are ready to find their forever homes. Each one has a unique story and is
                            waiting for someone to love.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {availableCats.map((cat) => (
                            <article key={cat.id} className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col">
                                <div className="h-[280px] w-full relative">
                                    <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-6 md:p-8 text-center flex-1 flex flex-col">
                                    <h3 className="text-[26px] md:text-[28px] font-bold text-gray-900">{cat.name}</h3>
                                    
                                    <div className="mt-2.5 flex items-center justify-center gap-2 text-[13px] md:text-[14px] text-gray-400 font-medium">
                                        <span>{cat.age}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span>{cat.gender}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span>{cat.breed}</span>
                                    </div>
                                    
                                    <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                                        {(cat.traits || []).map((trait) => (
                                            <span key={trait} className="rounded-full bg-[#ffefe9] px-4 py-1.5 text-[12px] md:text-[13px] font-medium text-[#f08063]">
                                                {trait}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-auto pt-8">
                                        <Link href={route('cat-profile.show', cat.id)} className="block w-full rounded-full border border-gray-100 bg-[#f8f9fa] px-6 py-3.5 text-[14px] font-semibold text-[#111] transition hover:bg-gray-100">
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                        {availableCats.length === 0 && (
                            <article className="md:col-span-2 lg:col-span-3 bg-white rounded-3xl border border-gray-100 p-10 text-center text-gray-500">
                                No available cats right now. Please check back soon.
                            </article>
                        )}
                    </div>
                    
                    <div className="mt-14 md:mt-16 text-center">
                        <Link href={route('cats.available')} className="inline-flex items-center justify-center rounded-full bg-[#8bcbbd] px-8 py-3.5 text-[14px] md:text-[15px] font-semibold text-[#1f453c] transition hover:bg-[#7abeaf]">
                            See All Available Cats
                        </Link>
                    </div>
                </div>
            </section>

            {/* SUPPORT OUR MISSION SECTION */}
            <section className="bg-[#f3f6f5] py-20 md:py-28">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-[34px] md:text-[46px] font-semibold text-gray-900 leading-tight">Support Our Mission</h2>
                            <p className="mt-5 text-[15px] md:text-[16px] leading-[1.6] text-gray-600 mb-10">
                                Every contribution helps us provide medical care, food, and shelter to cats in need. Our
                                sanctuary is sustained through community support and the profits from Fitness With Dina.
                            </p>
                            
                            <ul className="space-y-8">
                                {supportPoints.map((point) => (
                                    <li key={point.title} className="flex gap-5 items-start">
                                        <div className="flex-shrink-0 mt-1 text-[#f07b61]">
                                            {point.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-[18px] md:text-[20px] font-semibold text-gray-900 leading-snug">{point.title}</h4>
                                            <p className="mt-1.5 text-[14px] md:text-[15px] text-gray-500 leading-relaxed">{point.detail}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="mt-10">
                                <a href="#" className="inline-flex items-center justify-center rounded-full bg-[#fac2ac] px-8 py-3.5 text-[14px] md:text-[15px] font-semibold text-[#30160d] transition hover:bg-[#efa68a]">
                                    Learn More
                                </a>
                            </div>
                        </div>
                        
                        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                            <div className="rounded-[30px] overflow-hidden aspect-[4/3] w-full shadow-lg">
                                <img
                                    src="/images/our-mission.png"
                                    alt="Cat near food bowl"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
