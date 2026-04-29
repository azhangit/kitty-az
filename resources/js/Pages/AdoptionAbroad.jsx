import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

const steps = [
    { num: '01', title: 'Choose Your Cat', desc: 'Browse our available cats and find the perfect match for your family. We can help guide your selection.' },
    { num: '02', title: 'Application Process', desc: 'Complete our international adoption application and attend a virtual interview.' },
    { num: '03', title: 'Documentation', desc: 'Our team handles all necessary health certificates, vaccinations, and exit permits.' },
    { num: '04', title: 'Travel Arrangements', desc: 'We work with professional pet shippers to ensure a safe and comfortable journey.' },
    { num: '05', title: 'Arrival Support', desc: 'We guide you through the clearing process at your destination and arrange for pick-up.' },
    { num: '06', title: 'Lifetime Support', desc: 'We love to stay in touch and offer guidance as your new pet settles in.' },
];

const countries = [
    { 
        id: 'NA', 
        name: 'United States & Canada', 
        items: [
            { name: 'USA', flag: <img src="images/flags/usa.svg" alt="" /> },
            { name: 'Canada', flag: <img src="images/flags/canada.svg" alt="" /> }
        ] 
    },
    { 
        id: 'EU', 
        name: 'Europe', 
        items: [
            { name: 'UK', flag: <img src="images/flags/uk.svg" alt="" height={17.73} width={29.54} /> },
            { name: 'Germany', flag: <img src="images/flags/germany.svg" alt="" /> },
            { name: 'France', flag: <img src="images/flags/france.svg" alt="" /> },
            { name: 'Netherlands', flag: <img src="images/flags/netherlands.svg" alt="" /> },
            { name: 'Sweden', flag: <img src="images/flags/sweden.svg" alt="" /> }
        ] 
    },
    { 
        id: 'AP', 
        name: 'Asia Pacific', 
        items: [
            { name: 'Singapore', flag: <img src="images/flags/singapore.svg" alt="" /> },
            { name: 'Australia', flag: <img src="images/flags/australia.svg" alt="" /> },
            { name: 'Hong Kong', flag: <img src="images/flags/hongkong.svg" alt="" /> }
        ] 
    },
    { 
        id: 'ME', 
        name: 'Middle East', 
        items: [
            { name: 'Saudi Arabia', flag: <img src="images/flags/saudi-arabia.svg" alt="" /> },
            { name: 'Kuwait', flag: <img src="images/flags/kuwait.svg" alt="" /> },
            { name: 'Bahrain', flag: <img src="images/flags/bahrain.svg" alt="" /> }
        ] 
    },
];

const faqs = [
    {
        q: 'Can I adopt if I live outside the UAE?',
        a: 'Yes, we facilitate international adoptions to many countries across the globe.',
    },
    {
        q: 'How long does the international adoption process take?',
        a: 'The timeline varies depending on the destination country, usually ranging from a few weeks to several months due to health preparation and documentation.',
    },
    {
        q: 'What is included in the adoption fee?',
        a: 'The fee generally covers medical preparations, vaccinations, microchipping, exit permits, and the travel crate, but flights are typically quoted separately.',
    },
    {
        q: 'Do you ship cats alone on the flight alone?',
        a: 'We work with professional IATA-approved pet shippers or flight volunteers to ensure your cat travels safely.',
    },
    {
        q: 'What happens if I move countries after adoption?',
        a: 'You can definitely take your pet with you! You will just need to follow the import requirements for your new destination country.',
    },
    {
        q: 'Are there specific age restrictions for international adoption?',
        a: 'Cats usually need to be at least 4 to 7 months old before they can travel internationally, depending on the rabies vaccination requirements of the destination country.',
    },
];

export default function AdoptionAbroad() {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (idx) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };

    return (
        <AppLayout currentPath="/adoption-abroad">
            <Head title="Adoption Abroad - Dubai Street Kitties" />

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-b from-[#f2b7a7] to-[#9fcfc5] py-16 sm:py-20 lg:h-[400px] lg:py-0 text-center px-6 flex flex-col items-center justify-center">
                <div className="absolute top-10 left-10 max-h-[358px] transform -rotate-12"><img src="/images/left-paws.png" className='max-h-[358px]' alt="" /></div>
                <div className="absolute top-1/4 right-10 max-h-[358px]  transform rotate-12"><img src="/images/right-paws.png" alt="" className='max-h-[358px]' /></div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-[64px] font-bold text-gray-900 mb-6 leading-tight">Adoption Abroad</h1>
                    <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                        Love knows no borders. We facilitate international adoptions to help our cats find forever homes around the world.
                    </p>
                </div>
            </section>  

            {/* HOW IT WORKS */}
            <section className="py-24 bg-[#fafafa]">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-4xl md:text-[48px] font-bold text-gray-900 mb-4">How International Adoption Works</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-16 italic">We have streamlined the process to make international adoptions a smooth experience.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {steps.map((step) => (
                            <div key={step.num} className="bg-white p-8 rounded-[40px] text-left shadow-sm border border-gray-50 hover:shadow-md transition">
                                <div className="w-12 h-12 rounded-full bg-[#ffefe9] flex items-center justify-center text-[#f08063] font-bold mb-6">{step.num}</div>
                                <h4 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COUNTRIES WE SERVE */}
            <section className="py-24 bg-[#f3ece8]">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-4xl md:text-[48px] font-bold text-gray-900 mb-4">Countries We Serve</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-16 italic">We facilitate adoptions to many countries worldwide. Each location has specific requirements.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {countries.map((region) => (
                            <div key={region.id} className="bg-white p-8 rounded-[40px] text-left shadow-sm">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#FFB5A0] to-[#9BCDC2] mb-6 flex items-center justify-center text-[#f08063]"> <img src="images/flags/language.svg" alt="" /> </div>
                                <h4 className="text-lg font-bold text-[#f08063] mb-6">{region.name}</h4>
                                <ul className="space-y-4">
                                    {region.items.map((country) => (
                                        <li key={country.name} className="flex items-center gap-3 text-gray-700 font-medium text-sm md:text-base">
                                            {country.flag}
                                            {country.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHAT'S INCLUDED */}
            <section className="py-24 bg-white">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl md:text-[48px] font-bold text-gray-900 mb-4">What's Included</h2>
                            <p className="text-gray-500 mb-12">All necessary preparations for your cat's international journey.</p>
                            
                            <ul className="space-y-8">
                                {[
                                    { title: 'Full Medical Care', desc: 'All vaccinations, health tests, and treatments are up to date.', icon: <img src="images/heart.svg" alt="" /> },
                                    { title: 'Export Documentation', desc: 'Health certificates, export permits, and required paperwork.', icon: <img src="images/file-alt-solid.svg" alt="" /> },
                                    { title: 'Travel Arrangements', desc: 'IATA-approved pet shippers and airlines coordinated for your cat.', icon: <img src="images/plane-departure-solid.svg" alt="" /> },
                                    { title: 'Ongoing Support', desc: 'Guidance, advice and assistance from our team.', icon: <img src="images/clock.svg" alt="" /> },
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-6 items-start">
                                        <div className="w-10 h-10 flex-shrink-0 text-[#f08063] mt-1">{item.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="relative ">
                                <img 
                                    src="images/medical.png" 
                                    alt="Vet with cat" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ESTIMATED COSTS */}
            <section className="py-24 bg-[#f3ece8]">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-4xl md:text-[48px] font-bold text-gray-900 mb-4">Estimated Costs</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-16 italic">Costs vary by destination and travel method. We provide detailed estimates during the application process.</p>
                    
                    <div className="max-w-3xl mx-auto bg-white p-8 md:p-16 rounded-[40px] shadow-sm text-left">
                        <h4 className="text-xl font-bold text-gray-900 mb-10">Typical Cost Breakdown:</h4>
                        
                        <div className="space-y-6">
                            {[
                                { label: 'Medical & Documentation', cost: 'AED 800 - 1,500' },
                                { label: 'Export Permits & Certificates', cost: 'AED 500 - 1,000' },
                                { label: 'Travel Crate (IATA-approved)', cost: 'AED 300 - 800' },
                                { label: 'Flight / Air Relocation', cost: 'AED 1,000 - 8,000' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-50 border-dashed last:border-0">
                                    <span className="text-gray-700 font-medium">{item.label}</span>
                                    <span className="text-gray-500 font-bold">{item.cost}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t-2 border-[#f2b7a7] flex justify-between items-center">
                            <span className="text-xl font-bold text-[#f08063]">Estimated Total</span>
                            <span className="text-2xl font-bold text-[#f08063]">AED 2,600 - 11,300</span>
                        </div>
                        <p className="mt-8 text-xs text-gray-400 italic leading-relaxed">
                            * Please note that these are estimated only, and final costs may vary. Details vary per airline and per country of adoption.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-24 bg-white">
                <div className="max-w-[1000px] mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-[48px] font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-16 italic">Common questions about the international adoption process.</p>
                    
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => toggleFaq(idx)}
                                className={`bg-[#fafafa] p-6 md:p-8 rounded-[30px] text-left group transition cursor-pointer border border-transparent ${openFaq === idx ? 'bg-[#ffefe9] border-[#fac2ac]' : 'hover:bg-[#ffefe9]'}`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-800 text-sm md:text-base pr-4">{faq.q}</span>
                                    <div className={`w-8 h-8 rounded-full bg-white text-[#f08063] flex items-center justify-center font-bold shadow-sm transition-transform duration-300 flex-shrink-0 ${openFaq === idx ? 'rotate-45' : ''}`}>+</div>
                                </div>
                                {openFaq === idx && (
                                    <div className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* JOIN OUR MISSION */}
            <section className="py-24 bg-white text-center px-6">
                <div className="w-16 h-16 mx-auto text-[#f2b7a7] mb-8 opacity-90"><img src="images/2-User.svg" alt="" /></div>
                <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-8 leading-tight">Join Our Mission</h2>
                <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                    Whether you adopt, donate, volunteer, or simply spread the word, every contribution makes a difference. Together, we can create a better future for Dubai's cats.
                </p>
            </section>
        </AppLayout>
    );
}
