import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Support() {
    return (
        <AppLayout currentPath="/support">
            <Head title="Support Us - Dubai Street Kitties" />

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-b from-[#f2b7a7] to-[#9fcfc5] py-16 sm:py-20 lg:h-[400px] lg:py-0 text-center px-6 flex flex-col items-center justify-center">
                <div className="absolute bottom-0 left-0"><img src="/images/left-paws.png" alt="Cat hero" className="w-full object-contain max-h-[358px]" /></div>
                <div className="absolute top-2 -right-16 w-[300px] md:w-[450px]"><img src="/images/support-hero.png" alt="Cat hero" className=" h-[300px] md:h-[450px]" /></div>
                
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-[64px] font-bold text-gray-900 mb-6 leading-tight">Support Our Mission</h1>
                    <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                        Every contribution, big or small, helps us save lives. Together, we can give every cat a chance at happiness.
                    </p>
                </div>
            </section>

            {/* FITNESS SECTION */}
            <section className="py-24  bg-gradient-to-b from-[#FCEBEE] to-[#F8EDF5]">
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
                            <span className="bg-[#FFB5A0] text-[15px]  px-3 py-1 rounded-full tracking-wider">Primary Funding Source</span>
                            <h2 className="text-4xl md:text-[48px] font-bold text-gray-900 mt-6 mb-8 leading-tight">Get Fit, Save Cats</h2>
                            <p className="text-gray-500 mb-10 leading-relaxed">
                                Fitness With Dina is more than just a fitness app—it's a movement that directly supports Dubai Street Kitties. All profits from the app go towards sustaining our sanctuary, covering medical expenses, food, and shelter for rescued cats.
                            </p>
                            
                            <ul className="space-y-6 mb-12">
                                {[
                                    { title: 'Personalized Workout Plans', desc: 'Custom fitness routines tailored to your goals.', icon: <img src="/images/workout.svg" alt="" /> },
                                    { title: 'Community Support', desc: 'Join a community of fitness and animal lovers.', icon: <img src="/images/user.svg" alt="" /> },
                                    { title: 'Make a Real Impact', desc: 'Your subscription directly supports cat rescue operations.', icon: <img src="/images/heart.svg" alt="" /> },
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

                            <div className="bg-gradient-to-br from-[#FAC8AE] to-[#F4775B] p-8 rounded-[30px] shadow-sm">
                                <h4 className="font-bold">Join Today</h4>
                                <p className='mb-3'>Start your fitness journey and help save cats at the same time</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="bg-[#FFB5A0]  text-white px-6 py-3 rounded-full text-sm hover:bg-white hover:text-[#f08063] transition">Download on App Store</button>
                                    <button className="bg-white text-gray-800 font-bold px-6 py-3 rounded-full text-sm shadow-sm hover:shadow-md transition">Get on Google Play</button>
                                </div>
                            </div>
                                                            <p className='text-[#2B2B2B] my-5 text-[15px]'>* 100% of Fitness With Dina profits go directly to Dubai Street Kitties operations</p>

                        </div>
                    </div>
                </div>
            </section>

            {/* OTHER WAYS TO SUPPORT */}
            <section className="py-24 bg-[#F6EDE5]">
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
                                <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#f2b7a7] to-[#9fcfc5] flex items-center justify-center text-[#f08063] mb-8 group-hover:scale-110 transition"><img src="images/donate-solid.svg" alt="" /></div>
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
                                    <li key={idx} className="flex gap-2 items-center">
                                        <div className="text-[#2B2B2B]">                                        <svg width="33" height="27" viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg">
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
</svg></div>
                                        <span className="text-sm font-medium text-gray-400">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="bg-[#FDF8F5] text-gray-800 font-bold px-10 py-4 rounded-full text-sm hover:bg-[#8bcbbd] hover:text-white transform hover:scale-105 transition">Partner With Us</button>
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
            <section className="py-24 bg-[#F6EDE5]">
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
                                    { title: 'Social Media', desc: 'Help promote adoptable cats and share our mission.', icon:             <img src="/images/iphone.svg" alt="scissor" className="w-5 h-5 md:w-6 md:h-6" />
 },
                                    { title: 'Sanctuary Help', desc: 'Assist with daily care, cleaning, and socializing cats.', icon:             <img src="/images/user.svg" alt="scissor" className="w-5 h-5 md:w-6 md:h-6" />
 },
                                    { title: 'Foster', desc: 'If you can\'t commit to adopting now.', icon:             <img src="/images/vector.svg" alt="scissor" className="w-5 h-5 md:w-6 md:h-6" />
 },
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
            <section className="py-24 bg-gradient-to-b from-[#ECF2EE] to-[#FAF1EC]">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Support Makes a Difference</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-sm">Every beautiful cat is ready to find their forever homes. Each has a unique story and is waiting for someone to love.</p>
                    
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
                <div className="w-16 h-16 mx-auto text-[#f2b7a7] mb-8 opacity-90"><img src="images/2-User.svg" alt="" /></div>
                <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-8 leading-tight">Join Our Mission</h2>
                <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                    Whether you adopt, donate, volunteer, or simply spread the word, every contribution makes a difference. Together, we can create a better future for Dubai's cats.
                </p>
            </section>
        </AppLayout>
    );
}
