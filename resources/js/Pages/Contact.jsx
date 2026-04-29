import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Contact() {
    return (
        <AppLayout currentPath="/contact">
            <Head title="Contact Us - Dubai Street Kitties" />

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-b from-[#f2b7a7] to-[#9fcfc5] py-16 sm:py-20 lg:h-[400px] lg:py-0 text-center px-6 flex flex-col items-center justify-center">
                {/* Decorative Paw Print Placeholders */}
                <div className="absolute top-10 left-10  transform -rotate-12"><img src="images/left-paws.png" alt="" className='max-h-[358px]' /></div>
                <div className="absolute top-1/4 right-10  transform rotate-12"><img src="images/right-paws.png" alt="" className='max-h-[358px]' /></div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-[64px] font-bold text-gray-900 mb-6 leading-tight">Get In Touch</h1>
                    <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                        Have questions about adoption, volunteering, or supporting our mission? We'd love to hear from you!
                    </p>
                </div>
            </section>

            {/* MAIN CONTACT CONTENT */}
            <section className="py-20 bg-[#fbf9f8]">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        
                        {/* LEFT COLUMN: CONTACT INFO */}
                        <div className="lg:col-span-5 flex flex-col pt-4">
                            <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 mb-10">Contact Information</h2>
                            
                            <div className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-full bg-[#ffefe9] flex items-center justify-center text-[#f08063]"><svg className="w-6 h-6"></svg></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg md:text-xl">Email</h4>
                                        <p className="text-gray-500">info@dubaistreetkitties.ae</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-full bg-[#f3f6f5] flex items-center justify-center text-[#8bcbbd]"><svg className="w-6 h-6"></svg></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg md:text-xl">WhatsApp</h4>
                                        <p className="text-gray-500">+971 50 123 4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-full bg-[#ffefe9] flex items-center justify-center text-[#f08063]"><svg className="w-6 h-6"></svg></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg md:text-xl">Instagram</h4>
                                        <p className="text-gray-500">@dubatstreetkitties</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-full bg-[#f3f6f5] flex items-center justify-center text-[#8bcbbd]"><svg className="w-6 h-6"></svg></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg md:text-xl">Location</h4>
                                        <p className="text-gray-500">Dubai, United Arab Emirates</p>
                                    </div>
                                </div>
                            </div>

                            {/* Response Time Box */}
                            <div className="mt-16 bg-[#f3efed] rounded-[30px] p-8 md:p-10">
                                <h4 className="font-bold text-gray-900 text-lg md:text-xl mb-4">Response Time</h4>
                                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                                    We typically respond within 24-48 hours during weekdays. For urgent rescue situations, please call or WhatsApp directly.
                                </p>
                                <p className="text-gray-500 text-sm md:text-base font-medium">
                                    Usually active during UAE business hours
                                </p>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: CONTACT FORM */}
                        <div className="lg:col-span-7 bg-white rounded-[40px] p-8 md:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h3>
                            
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">First Name*</label>
                                        <div className="relative">
                                            <input type="text" placeholder="First Name*" className="w-full bg-[#fcfcfc] border border-gray-100 rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#fac2ac] transition-all" />
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300"><svg className="w-4 h-4"></svg></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Last Name</label>
                                        <div className="relative">
                                            <input type="text" placeholder="Last Name*" className="w-full bg-[#fcfcfc] border border-gray-100 rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#fac2ac] transition-all" />
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300"><svg className="w-4 h-4"></svg></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Your Email</label>
                                    <div className="relative">
                                        <input type="email" placeholder="Your Email" className="w-full bg-[#fcfcfc] border border-gray-100 rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#fac2ac] transition-all" />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300"><svg className="w-4 h-4"></svg></div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Phone Number*</label>
                                    <div className="relative">
                                        <input type="tel" placeholder="Phone Number*" className="w-full bg-[#fcfcfc] border border-gray-100 rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#fac2ac] transition-all" />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300"><svg className="w-4 h-4"></svg></div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Inquiry Type</label>
                                    <div className="relative">
                                        <select className="w-full bg-[#fcfcfc] border border-gray-100 rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#fac2ac] appearance-none transition-all">
                                            <option>Select Inquiry Type</option>
                                            <option>Adoption</option>
                                            <option>Volunteering</option>
                                            <option>Donation</option>
                                            <option>Other</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><svg className="w-4 h-4"></svg></div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Message</label>
                                    <div className="relative">
                                        <textarea rows="4" placeholder="Write Message..." className="w-full bg-[#fcfcfc] border border-gray-100 rounded-[28px] px-6 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#fac2ac] transition-all resize-none"></textarea>
                                        <div className="absolute right-6 top-6 text-gray-300"><svg className="w-4 h-4"></svg></div>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-col items-center">
                                    <p className="text-[12px] text-gray-400 mb-6 text-center italic">Note: This form is for demonstration purposes. For actual inquiries, please contact us via email or WhatsApp.</p>
                                    <button type="submit" className="w-full bg-gradient-to-r from-[#fac2ac] to-[#8bcbbd] text-gray-800 font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.01]">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* EMERGENCY RESCUE SECTION */}
            <section className="py-24 bg-[#f3ece8] text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-8 leading-tight">Emergency Rescue?</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base mb-10">
                        If you've found an injured or sick cat that needs immediate attention, please contact us directly via WhatsApp or phone. We respond to emergencies as quickly as possible.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="bg-gradient-to-r from-[#fac2ac] to-[#f08063] text-white font-bold px-10 py-4 rounded-full shadow-md hover:shadow-lg transition">
                            WhatsApp Us Now
                        </button>
                        <button className="bg-white border-2 border-transparent text-gray-800 font-bold px-10 py-4 rounded-full shadow-sm hover:shadow-md transition">
                            Call: +971 50 123 4567
                        </button>
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
