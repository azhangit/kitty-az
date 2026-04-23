import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Support() {
    return (
        <AppLayout currentPath="/support">
            <Head title="Support Us - Dubai Street Kitties" />

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-b from-[#f2b7a7] to-[#9fcfc5] py-20 md:py-32 text-center px-6 overflow-hidden min-h-[400px] flex flex-col justify-center">
                <div className="absolute"><img src="/images/left-paws.png" alt="Cat hero" className="w-full" /></div>
                <div className="absolute top-0 right-0 w-[300px] md:w-[450px] opacity-90"><img src="/images/support-hero.png" alt="Cat hero" className="w-full" /></div>
                
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-[64px] font-bold text-gray-900 mb-6 leading-tight">Support Our Mission</h1>
                    <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                        Every contribution, big or small, helps us save lives. Together, we can give every cat a chance at happiness.
                    </p>
                </div>
            </section>

            {/* FITNESS SECTION */}
            <section className="py-24 bg-white">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                        <div className="w-full md:w-1/2 relative">
                            <div className="rounded-[40px] overflow-hidden aspect-square /20">
                                <img 
                                    src="/images/orange-bg.png" 
                                    alt="Fitness with Dina" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <span className="bg-[#ffefe9] text-[#f08063] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Fitness Training App</span>
                            <h2 className="text-4xl md:text-[48px] font-bold text-gray-900 mt-6 mb-8 leading-tight">Get Fit, Save Cats</h2>
                            <p className="text-gray-500 mb-10 leading-relaxed">
                                Fitness With Dina is more than just a fitness app—it's a mission-driven way to support Dubai Street Kitties. All profits from the app go directly to sustaining our sanctuary, covering medical expenses, food, and shelter for rescued cats.
                            </p>
                            
                            <ul className="space-y-6 mb-12">
                                {[
                                    { title: 'Personalized Workout Plans', desc: 'Custom fitness routines tailored to your goals.', icon: <svg></svg> },
                                    { title: 'Community Support', desc: 'Join a community of fitness and animal lovers.', icon: <svg></svg> },
                                    { title: 'Make a Real Impact', desc: 'Your subscription directly supports cat rescue operations.', icon: <svg></svg> },
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4 items-start">
                                        <div className="w-8 h-8 flex-shrink-0 text-[#8bcbbd] mt-1">{item.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                                            <p className="text-gray-500 text-xs">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-gradient-to-r from-[#f2b7a7] to-[#fac2ac] p-8 rounded-[30px] shadow-sm">
                                <h4 className="text-white font-bold mb-6">Join Today</h4>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="bg-white text-gray-800 font-bold px-6 py-3 rounded-full text-sm shadow-sm hover:shadow-md transition">Shop App Store</button>
                                    <button className="bg-transparent border border-white text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-white hover:text-[#f08063] transition">Get It On Play Store</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OTHER WAYS TO SUPPORT */}
            <section className="py-24 bg-[#f3ece8]">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-4xl md:text-[48px] font-bold text-gray-900 mb-4">Other Ways to Support</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-16 italic">There are many ways you can help us continue our mission to rescue and rehome Dubai's street cats.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { 
                                title: 'Shop Merchandise', 
                                desc: 'Are you a cat lover? We have amazing cat merchandise. All proceeds go directly to the cats at our sanctuary.', 
                                points: ['Support your local rescue cats', 'High quality shirts, hoodies, etc.', 'Designed with love for cats', 'Perfect gift for cat lovers'],
                                button: 'Visit Shop',
                                link: '/shop'
                            },
                            { 
                                title: 'Direct Support', 
                                desc: 'Make a one-time or monthly donation to help provide essential care and food for our rescued cats.', 
                                points: ['Food and nutrition', 'Medical supplies', 'Shelter maintenance', 'Spay and neuter'],
                                button: 'Get in Touch',
                                link: '/contact'
                            },
                            { 
                                title: 'Cat Sponsorship', 
                                desc: 'Choose a specific cat to support. Your monthly contribution helps pay for the care of your sponsored cat.', 
                                points: ['Monthly updates and photos', 'Healthcare costs cover', 'Personalized certificate', 'Visit your sponsored cat'],
                                button: 'View Cats to Sponsor',
                                link: '/adopt'
                            },
                        ].map((card, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-[40px] shadow-sm flex flex-col items-center group hover:shadow-md transition">
                                <div className="w-14 h-14 rounded-full bg-[#ffefe9] flex items-center justify-center text-[#f08063] mb-8 group-hover:scale-110 transition"><svg className="w-6 h-6"></svg></div>
                                <h4 className="text-xl font-bold text-gray-900 mb-6">{card.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8">{card.desc}</p>
                                <ul className="text-left space-y-3 mb-10 text-xs text-gray-600 self-start">
                                    {card.points.map((p, i) => (
                                        <li key={i} className="flex gap-3"><span className="text-[#8bcbbd]">✓</span> {p}</li>
                                    ))}
                                </ul>
                                <button className="mt-auto bg-[#8bcbbd]/20 text-[#1f453c] font-bold px-8 py-3 rounded-full text-sm hover:bg-[#8bcbbd] hover:text-white transition w-full">{card.button}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CORPORATE PARTNERSHIP */}
            <section className="py-24 bg-white">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-24">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl md:text-[40px] font-bold text-gray-900 mb-8 leading-tight">Corporate Partnership</h2>
                            <p className="text-gray-500 mb-10 leading-relaxed text-sm">
                                Partnership with us is an opportunity to make a lasting impact while meeting your corporate social responsibility goals.
                            </p>
                            <ul className="space-y-5 mb-12">
                                {[
                                    'Unique partnership options',
                                    'Brand Visibility',
                                    'Employee Engagement',
                                    'Shared community opportunities',
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4 items-center">
                                        <div className="w-5 h-5 text-[#f08063]"><svg></svg></div>
                                        <span className="text-sm font-medium text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="bg-gray-50 text-gray-800 font-bold px-10 py-4 rounded-full text-sm hover:bg-[#8bcbbd] hover:text-white transform hover:scale-105 transition">Partner With Us</button>
                        </div>
                        <div className="w-full md:w-1/2 relative">
                            <div className="rounded-[40px] overflow-hidden ">
                                <img 
                                    src="/images/corporate-partnership.png" 
                                    alt="Corporate" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute top-4 right-4 text-gray-200/50"><svg className="w-16 h-16"></svg></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VOLUNTEER YOUR TIME */}
            <section className="py-24 bg-[#fbfbfb]">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                        <div className="w-full md:w-1/2">
                            <div className="rounded-[40px] overflow-hidden shadow-xl aspect-[4/3]">
                                <img 
                                    src="/images/volunteer.png" 
                                    alt="Volunteer" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl md:text-[40px] font-bold text-gray-900 mb-8 leading-tight">Volunteer Your Time</h2>
                            <p className="text-gray-500 mb-10 leading-relaxed text-sm">
                                Donating your time and skills is just as valuable as financial support. We are always looking for passionate individuals to help with various aspects of our rescue operations.
                            </p>
                            <ul className="space-y-8 mb-12">
                                {[
                                    { title: 'Social Media', desc: 'Help promote adoptable cats and share our mission.', icon: <svg></svg> },
                                    { title: 'Sanctuary Help', desc: 'Assist with daily care, cleaning, and socializing cats.', icon: <svg></svg> },
                                    { title: 'Foster', desc: 'If you can\'t commit to adopting now.', icon: <svg></svg> },
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-5 items-start">
                                        <div className="w-8 h-8 flex-shrink-0 text-[#8bcbbd] mt-1">{item.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                                            <p className="text-gray-500 text-xs">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full bg-[#f2b7a7] text-white font-bold py-4 rounded-full shadow-sm hover:shadow-md transition">Volunteer With Us</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-24 bg-[#f3f6f5]">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Support Makes a Difference</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-16 italic text-sm">Every beautiful cat is ready to find their forever homes. Each has a unique story and is waiting for someone to love.</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { value: '500+', label: 'Lives Saved', color: 'text-[#f07b61]' },
                            { value: '350+', label: 'Successful Adoptions', color: 'text-[#8bcbbd]' },
                            { value: '200+', label: 'TNR Efforts', color: 'text-[#f07b61]' },
                            { value: '100%', label: 'Transparency', color: 'text-gray-900' },
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-3`}>{stat.value}</div>
                                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
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
