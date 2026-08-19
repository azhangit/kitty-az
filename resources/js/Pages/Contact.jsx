import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";

const ZOHO_FORM_SRC =
    "https://forms.zohopublic.com/dinasworkouttips/form/Dubaistreetkitties/formperma/f03r5TtyH0lOxJOLrSewbJY05TbnGkfWfhXDT41_0N8";

export default function Contact() {
    useEffect(() => {
        const zfFrame = document.getElementById("ziframe_261412");
        if (!zfFrame) return undefined;

        try {
            let ifrmSrc = zfFrame.src;

            if (!/[?&]referrername=/.test(ifrmSrc)) {
                let rfr = window.location.href;

                try {
                    rfr =
                        window.self !== window.top
                            ? window.top.location.href
                            : /^https?:\/\/[\w.-]+\.[a-zA-Z]{2,}/i.test(rfr)
                              ? rfr
                              : "";
                } catch (e) {
                    // Cross-origin top frame access can throw; keep current href.
                }

                if (rfr) {
                    if (rfr.length > 1800) {
                        const queryIndex = rfr.indexOf("?");
                        if (queryIndex > -1) {
                            rfr = rfr.substring(0, queryIndex);
                        }
                        if (rfr.length > 1800) {
                            rfr = rfr.substring(0, 1800);
                        }
                    }
                    ifrmSrc +=
                        (ifrmSrc.indexOf("?") > 0 ? "&" : "?") +
                        "referrername=" +
                        encodeURIComponent(rfr);
                }
            }

            if (zfFrame.src !== ifrmSrc) {
                zfFrame.src = ifrmSrc;
            }
        } catch (e) {
            // Zoho referrer enrichment is best-effort.
        }

        const onMessage = (event) => {
            try {
                const data =
                    typeof event.data === "string"
                        ? JSON.parse(event.data)
                        : event.data;

                if (data?.zf_ifrm_ht_msg && data?.zf_ifrm_ht) {
                    const nextHeight = `${parseInt(data.zf_ifrm_ht, 10)}px`;
                    zfFrame.style.height = nextHeight;
                    zfFrame.style.minHeight = nextHeight;
                }
            } catch (e) {
                // Ignore non-Zoho messages.
            }
        };

        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, []);

    return (
        <AppLayout currentPath="/contact">
            <Head title="Contact Us" />

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
                                        <a
                                            href="mailto:info@dubaistreetkitties.ae"
                                            className="text-gray-500 hover:text-gray-700 transition"
                                        >
                                            info@dubaistreetkitties.ae
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-full bg-[#f3f6f5] flex items-center justify-center text-[#8bcbbd]">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg md:text-xl">
                                            Emergency
                                        </h4>
                                        <a
                                            href="tel:+971585818608"
                                            className="text-gray-500 hover:text-gray-700 transition"
                                        >
                                            +971 58 581 8608
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-full bg-[#ffefe9] flex items-center justify-center text-[#f08063]">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg md:text-xl">
                                            Adopt from us
                                        </h4>
                                        <a
                                            href="tel:+971557641252"
                                            className="text-gray-500 hover:text-gray-700 transition"
                                        >
                                            +971 55 764 1252
                                        </a>
                                        <p className="text-gray-400 text-xs mt-1">
                                            We do not adopt or foster cats
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
                                        <div className="flex flex-col gap-1">
                                            <a
                                                href="https://www.instagram.com/dubaistreetkitties"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-500 hover:text-gray-700 transition"
                                            >
                                                @dubaistreetkitties
                                            </a>
                                            <a
                                                href="https://www.instagram.com/dubaistreetkittiesadoption"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-500 hover:text-gray-700 transition"
                                            >
                                                @dubaistreetkittiesadoption
                                            </a>
                                        </div>
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
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M14 9.19621C13.3876 8.17979 12.2732 7.5 11 7.5C9.067 7.5 7.5 9.067 7.5 11C7.5 12.3962 8.31753 13.6015 9.5 14.1632"
                                                stroke="#9DD9D2"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M17 16H17.009"
                                                stroke="#9DD9D2"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M17.8981 21.6518C17.6572 21.8752 17.3352 22 17.0001 22C16.665 22 16.343 21.8752 16.1021 21.6518C13.8959 19.5943 10.9394 17.2958 12.3812 13.9588C13.1608 12.1545 15.0321 11 17.0001 11C18.9681 11 20.8394 12.1545 21.619 13.9588C23.059 17.2916 20.1097 19.6014 17.8981 21.6518Z"
                                                stroke="#9DD9D2"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg md:text-xl">
                                            Location
                                        </h4>
                                        <a
                                            href="https://www.google.com/maps/search/?api=1&query=Dubai%2C%20United%20Arab%20Emirates"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-500 hover:text-gray-700 transition"
                                        >
                                            Dubai, United Arab Emirates
                                        </a>
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
                                    situations, please call the emergency
                                    number directly.
                                </p>
                                <p className="text-gray-500 text-sm md:text-base font-medium">
                                    Usually active during UAE business hours
                                </p>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: ZOHO FORM (same card chrome as old form) */}
                        <div className="lg:col-span-7 bg-white rounded-[40px] p-8 md:p-12  border border-gray-100">

                            <div className="w-full -mx-1">
                                <iframe
                                    id="ziframe_261412"
                                    title="Dubai Street Kitties - Adoption Inquiry"
                                    aria-label="Dubai Street Kitties - Adoption Inquiry"
                                    src={ZOHO_FORM_SRC}
                                    scrolling="no"
                                    className="block w-full max-w-full border-0 bg-transparent"
                                    style={{
                                        height: "980px",
                                        minHeight: "980px",
                                        overflow: "hidden",
                                    }}
                                />
                            </div>
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
                        immediate attention, please call us directly. We respond
                        to emergencies as quickly as possible.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="tel:+971585818608"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#fac2ac] to-[#f08063] text-white font-bold px-10 py-4 rounded-full shadow-md hover:shadow-lg transition"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Emergency: +971 58 581 8608
                        </a>
                        <a
                            href="tel:+971557641252"
                            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-transparent text-gray-800 font-bold px-10 py-4 rounded-full shadow-sm hover:shadow-md transition"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Adopt from us: +971 55 764 1252
                        </a>
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
