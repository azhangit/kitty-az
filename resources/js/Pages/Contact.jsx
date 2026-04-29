import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Contact() {
    return (
        <AppLayout currentPath="/contact">
            <Head title="Contact Us - Dubai Street Kitties" />

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-b from-[#f2b7a7] to-[#9fcfc5] py-16 sm:py-20 lg:h-[400px] lg:py-0 text-center px-6 flex flex-col items-center justify-center">
                {/* Decorative Paw Print Placeholders */}
                <div className="absolute top-10 left-10  transform -rotate-12">
                    <img
                        src="images/left-paws.png"
                        alt=""
                        className="max-h-[358px]"
                    />
                </div>
                <div className="absolute top-1/4 right-10  transform rotate-12">
                    <img
                        src="images/right-paws.png"
                        alt=""
                        className="max-h-[358px]"
                    />
                </div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-[64px] font-bold text-gray-900 mb-6 leading-tight">
                        Get In Touch
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                        Have questions about adoption, volunteering, or
                        supporting our mission? We'd love to hear from you!
                    </p>
                </div>
            </section>

            {/* MAIN CONTACT CONTENT */}
            <section className="py-20 bg-[#FAF1EC]">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        {/* LEFT COLUMN: CONTACT INFO */}
                        <div className="lg:col-span-5 flex flex-col pt-4">
                            <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 mb-10">
                                Contact Information
                            </h2>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-full bg-[#ffefe9] flex items-center justify-center text-[#f08063]">
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 32 29"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M22.4785 0C27.5463 0.0154939 31.6516 4.15065 31.667 9.25586V11.5693C31.667 12.1927 31.1647 12.6982 30.5459 12.6982L30.5322 12.6699C30.2351 12.6699 29.9504 12.5505 29.7402 12.3389C29.5301 12.1272 29.4121 11.8404 29.4121 11.541V9.25586C29.3742 5.4147 26.2916 2.30971 22.4785 2.27148H9.1875C5.37454 2.3098 2.29283 5.41475 2.25488 9.25586V19.2441C2.29283 23.0852 5.37454 26.1902 9.1875 26.2285H22.4785C26.2916 26.1903 29.3742 23.0853 29.4121 19.2441C29.4764 18.6659 29.9614 18.2286 30.5391 18.2285C31.1168 18.2285 31.6027 18.6658 31.667 19.2441C31.6516 24.3494 27.5463 28.4845 22.4785 28.5H9.1875C4.11657 28.4921 0.00771249 24.3525 0 19.2441V9.25586C0 4.14428 4.11337 9.49353e-05 9.1875 0H22.4785ZM6.7998 8.5293C7.09458 8.49756 7.38989 8.58603 7.61914 8.77539L14.2021 14.0244C15.0244 14.674 16.1808 14.6742 17.0029 14.0244L23.5156 8.77539H23.5293C24.0142 8.38715 24.7192 8.46307 25.1123 8.94531C25.2994 9.18033 25.3857 9.48099 25.3516 9.78027C25.3174 10.0798 25.1651 10.3529 24.9297 10.5391L18.417 15.8018C16.761 17.1441 14.401 17.1441 12.7451 15.8018L6.21875 10.5391C5.74001 10.143 5.66529 9.43383 6.05078 8.94531C6.23507 8.71119 6.50489 8.56113 6.7998 8.5293Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg md:text-xl">
                                            Email
                                        </h4>
                                        <p className="text-gray-500">
                                            info@dubaistreetkitties.ae
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-full bg-[#f3f6f5] flex items-center justify-center text-[#8bcbbd]">
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 17 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M3.05077 7.49802C3.29301 7.33391 3.62333 7.39337 3.78905 7.63474C5.62721 10.3029 8.98475 13.3065 11.1211 14.1943C11.9852 14.5957 12.6286 14.6206 13.1074 14.2773C13.4806 14.0515 14.5412 12.9982 14.5224 12.4502C14.5161 12.3858 14.4417 12.2648 14.3164 12.1367C13.9084 11.719 12.5391 10.6828 12.2529 10.5752C12.027 10.5272 11.7919 10.6648 11.4336 10.8906L11.2519 11.0029C11.0005 11.1535 10.674 11.0732 10.5224 10.8213C10.3719 10.5707 10.4527 10.2442 10.7041 10.0927L10.8672 9.99216C11.2638 9.74229 11.8116 9.4011 12.5 9.54392C13.0425 9.65647 14.7494 11.0589 15.0762 11.3925C15.3835 11.7068 15.5529 12.042 15.582 12.3867C15.628 13.6912 13.8817 15.0547 13.6806 15.1699C13.2996 15.4446 12.8525 15.583 12.3496 15.583C11.8495 15.583 11.2938 15.4463 10.6924 15.166C8.37961 14.2059 4.8818 11.0929 2.91405 8.2363C2.74758 7.99488 2.80922 7.66439 3.05077 7.49802ZM4.58983 1.41892C4.95521 1.44943 5.28979 1.62 5.6035 1.92575C5.93842 2.2529 7.34149 3.95996 7.45409 4.49997C7.57507 5.08107 7.31355 5.53491 7.12303 5.86618C6.93556 6.19215 6.87038 6.33174 6.93456 6.50778C7.40844 7.66673 8.14139 8.61456 9.10545 9.3027C9.34397 9.47408 9.39818 9.80541 9.22752 10.0439C9.12414 10.1882 8.96149 10.2665 8.79588 10.2666C8.68833 10.2666 8.58072 10.2334 8.48729 10.167C7.35818 9.35917 6.50223 8.25671 5.94334 6.88962C5.69769 6.21379 5.98895 5.7071 6.20213 5.33688C6.36211 5.05954 6.45042 4.89363 6.41307 4.71677C6.3139 4.46119 5.27826 3.09358 4.86034 2.68649C4.73151 2.55992 4.61039 2.48556 4.52049 2.47849C4.01321 2.46682 2.97633 3.46932 2.7412 3.85935C2.37668 4.36051 2.40237 5.00236 2.79393 5.86227C2.91506 6.12917 2.7973 6.44362 2.53026 6.5654C2.2625 6.68646 1.94897 6.56934 1.82713 6.30173C1.26979 5.07919 1.28041 4.05839 1.85838 3.27048C2.0742 2.90964 3.4277 1.34318 4.58983 1.41892Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg md:text-xl">
                                            WhatsApp
                                        </h4>
                                        <p className="text-gray-500">
                                            +971 50 123 4567
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-full bg-[#ffefe9] flex items-center justify-center text-[#f08063]">
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 22 22"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10.9863 5.32227C14.0625 5.32227 16.6016 7.86133 16.6016 10.9375C16.6016 14.0625 14.0625 16.5527 10.9863 16.5527C7.86133 16.5527 5.37109 14.0625 5.37109 10.9375C5.37109 7.86133 7.86133 5.32227 10.9863 5.32227ZM10.9863 14.5996C12.9883 14.5996 14.5996 12.9883 14.5996 10.9375C14.5996 8.93555 12.9883 7.32422 10.9863 7.32422C8.93555 7.32422 7.32422 8.93555 7.32422 10.9375C7.32422 12.9883 8.98438 14.5996 10.9863 14.5996ZM18.1152 5.12695C18.1152 4.39453 17.5293 3.80859 16.7969 3.80859C16.0645 3.80859 15.4785 4.39453 15.4785 5.12695C15.4785 5.85938 16.0645 6.44531 16.7969 6.44531C17.5293 6.44531 18.1152 5.85938 18.1152 5.12695ZM21.8262 6.44531C21.9238 8.25195 21.9238 13.6719 21.8262 15.4785C21.7285 17.2363 21.3379 18.75 20.0684 20.0684C18.7988 21.3379 17.2363 21.7285 15.4785 21.8262C13.6719 21.9238 8.25195 21.9238 6.44531 21.8262C4.6875 21.7285 3.17383 21.3379 1.85547 20.0684C0.585938 18.75 0.195312 17.2363 0.0976562 15.4785C0 13.6719 0 8.25195 0.0976562 6.44531C0.195312 4.6875 0.585938 3.125 1.85547 1.85547C3.17383 0.585938 4.6875 0.195312 6.44531 0.0976562C8.25195 0 13.6719 0 15.4785 0.0976562C17.2363 0.195312 18.7988 0.585938 20.0684 1.85547C21.3379 3.125 21.7285 4.6875 21.8262 6.44531ZM19.4824 17.3828C20.0684 15.9668 19.9219 12.5488 19.9219 10.9375C19.9219 9.375 20.0684 5.95703 19.4824 4.49219C19.0918 3.56445 18.3594 2.7832 17.4316 2.44141C15.9668 1.85547 12.5488 2.00195 10.9863 2.00195C9.375 2.00195 5.95703 1.85547 4.54102 2.44141C3.56445 2.83203 2.83203 3.56445 2.44141 4.49219C1.85547 5.95703 2.00195 9.375 2.00195 10.9375C2.00195 12.5488 1.85547 15.9668 2.44141 17.3828C2.83203 18.3594 3.56445 19.0918 4.54102 19.4824C5.95703 20.0684 9.375 19.9219 10.9863 19.9219C12.5488 19.9219 15.9668 20.0684 17.4316 19.4824C18.3594 19.0918 19.1406 18.3594 19.4824 17.3828Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg md:text-xl">
                                            Instagram
                                        </h4>
                                        <p className="text-gray-500">
                                            @dubatstreetkitties
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-full bg-[#f3f6f5] flex items-center justify-center text-[#8bcbbd]">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M20 9C19.1434 4.9811 14.9912 2 11.0011 2C7.45834 2 4.08963 4.09916 2.68627 7.37966C0.090763 13.4469 5.41302 17.626 9.38449 21.367C9.81818 21.773 10.3978 22 11.0011 22C11.5513 22 12.0819 21.8112 12.5 21.4699"
                                                stroke="#9DD9D2"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M14 9.19621C13.3876 8.17979 12.2732 7.5 11 7.5C9.067 7.5 7.5 9.067 7.5 11C7.5 12.3962 8.31753 13.6015 9.5 14.1632"
                                                stroke="#9DD9D2"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M17 16H17.009"
                                                stroke="#9DD9D2"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M17.8981 21.6518C17.6572 21.8752 17.3352 22 17.0001 22C16.665 22 16.343 21.8752 16.1021 21.6518C13.8959 19.5943 10.9394 17.2958 12.3812 13.9588C13.1608 12.1545 15.0321 11 17.0001 11C18.9681 11 20.8394 12.1545 21.619 13.9588C23.059 17.2916 20.1097 19.6014 17.8981 21.6518Z"
                                                stroke="#9DD9D2"
                                                stroke-width="1.5"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg md:text-xl">
                                            Location
                                        </h4>
                                        <p className="text-gray-500">
                                            Dubai, United Arab Emirates
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Response Time Box */}
                            <div className="mt-16 bg-[#F6EDE5] rounded-[30px] p-8 md:p-10">
                                <h4 className="font-bold text-gray-900 text-lg md:text-xl mb-4">
                                    Response Time
                                </h4>
                                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                                    We typically respond within 24-48 hours
                                    during weekdays. For urgent rescue
                                    situations, please call or WhatsApp
                                    directly.
                                </p>
                                <p className="text-gray-500 text-sm md:text-base font-medium">
                                    Usually active during UAE business hours
                                </p>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: CONTACT FORM */}
                        <div className="lg:col-span-7 bg-white rounded-[40px] p-8 md:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                                Send Us a Message
                            </h3>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            First Name*
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="First Name*"
                                                className="w-full bg-[#fcfcfc] border border-gray-100 rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#fac2ac] transition-all"
                                            />
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300">
                                                <svg className="w-4 h-4"></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Last Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Last Name*"
                                                className="w-full bg-[#fcfcfc] border border-gray-100 rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#fac2ac] transition-all"
                                            />
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300">
                                                <svg className="w-4 h-4"></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Your Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full bg-[#fcfcfc] border border-gray-100 rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#fac2ac] transition-all"
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300">
                                            <svg className="w-4 h-4"></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Phone Number*
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            placeholder="Phone Number*"
                                            className="w-full bg-[#fcfcfc] border border-gray-100 rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#fac2ac] transition-all"
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300">
                                            <svg className="w-4 h-4"></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Inquiry Type
                                    </label>
                                    <div className="relative">
                                        <select className="w-full bg-[#fcfcfc] border border-gray-100 rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#fac2ac] appearance-none transition-all">
                                            <option>Select Inquiry Type</option>
                                            <option>Adoption</option>
                                            <option>Volunteering</option>
                                            <option>Donation</option>
                                            <option>Other</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                            <svg className="w-4 h-4"></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Message
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            rows="4"
                                            placeholder="Write Message..."
                                            className="w-full bg-[#fcfcfc] border border-gray-100 rounded-[28px] px-6 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#fac2ac] transition-all resize-none"
                                        ></textarea>
                                        <div className="absolute right-6 top-6 text-gray-300">
                                            <svg className="w-4 h-4"></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-col items-center">
                                    <p className="text-[12px] text-gray-400 mb-6 text-center italic">
                                        Note: This form is for demonstration
                                        purposes. For actual inquiries, please
                                        contact us via email
                                        at info@dubaistrreetkitties.ae or
                                        WhatsApp.
                                    </p>
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-[#fac2ac] to-[#8bcbbd] text-gray-800 font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.01]"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* EMERGENCY RESCUE SECTION */}
            <section className="py-24 bg-[#F6EDE5] text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-8 leading-tight">
                        Emergency Rescue?
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base mb-10">
                        If you've found an injured or sick cat that needs
                        immediate attention, please contact us directly via
                        WhatsApp or phone. We respond to emergencies as quickly
                        as possible.
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
                <div className="w-16 h-16 mx-auto text-[#f2b7a7] mb-8 opacity-90">
                    <img src="images/2-User.svg" alt="" />
                </div>
                <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-8 leading-tight">
                    Join Our Mission
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                    Whether you adopt, donate, volunteer, or simply spread the
                    word, every contribution makes a difference. Together, we
                    can create a better future for Dubai's cats.
                </p>
            </section>
        </AppLayout>
    );
}
