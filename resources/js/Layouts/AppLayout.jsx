import FlashToasts from "@/Components/FlashToasts";
import { Link, usePage } from "@inertiajs/react";

const Logo = () => (
    <div className="flex flex-col items-center justify-center">
        <img src="/images/nav-logo.svg" alt="Dubai Street Kitties Logo" />
    </div>
);

const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Adopt", href: "/adopt" },
    { name: "Available Cats", href: "/available-cats" },
    { name: "Gallery", href: "/gallery" },
    { name: "Shop", href: "/shop" },
    { name: "Support", href: "/support" },
    { name: "Adoption Abroad", href: "/adoption-abroad" },
    { name: "Contact", href: "/contact" },
];

export default function AppLayout({ children, currentPath }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div className="min-h-screen overflow-x-hidden bg-white font-sans text-gray-900">
            <FlashToasts />
            <header className="sticky top-0 z-50 bg-white px-4 py-3 sm:px-6 lg:px-12 lg:py-4">
                <div className="mx-auto flex max-w-[1400px] items-center justify-between">
                    <Link href="/" className="flex-shrink-0">
                        <Logo />
                    </Link>

                    <nav className="hidden items-center gap-4 lg:flex ">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition-colors xl:text-[14px] ${
                                    currentPath === item.href ||
                                    (item.name === "Home" &&
                                        currentPath === "/")
                                        ? "bg-[#fac2ac] text-[#2d2d2d] shadow-sm"
                                        : "font-medium text-gray-600 hover:text-black"
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 text-gray-400 md:gap-5">
                        <button className="p-1 transition hover:text-black">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </button>
                        <button className="p-1 transition hover:text-black">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm5.938 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                            </svg>
                        </button>

                        {user ? (
                            <div className="hidden items-center gap-2 md:flex">
                                <Link
                                    href="/dashboard"
                                    className="rounded-full bg-[#8bcbbd] px-4 py-2 text-[13px] font-semibold text-[#1f453c] transition hover:bg-[#7abeaf]"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="rounded-full bg-[#fac2ac] px-4 py-2 text-[13px] font-semibold text-[#30160d] transition hover:bg-[#efa68a]"
                                >
                                    Logout
                                </Link>
                            </div>
                        ) : (
                            <div className="hidden items-center gap-2 md:flex">
                                <Link
                                    href="/login"
                                    className="rounded-full border border-gray-200 px-4 py-2 text-[13px] font-semibold text-gray-700 transition hover:border-gray-300 hover:text-black"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-full bg-[#fac2ac] px-4 py-2 text-[13px] font-semibold text-[#30160d] transition hover:bg-[#efa68a]"
                                >
                                    Register
                                </Link>
                            </div>
                        )}

                        <button className="ml-2 p-1 transition hover:text-black lg:hidden">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 12h18M3 6h18M3 18h18"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {children}

            <footer className="border-t border-gray-100 bg-white pb-8 pt-16 md:pt-20">
                <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
                    <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12 lg:gap-8">
                        <div className="flex flex-col items-start space-y-6 md:col-span-5 lg:col-span-4">
                            <Logo />
                            <p className="mt-2 max-w-sm text-[13px] leading-[1.7] text-gray-500 md:text-[14px]">
                                Rescuing, rehabilitating, and rehoming Dubai's
                                street cats. Every cat deserves a loving home
                                and a second chance at life.
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:text-black"
                                >
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
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:text-black"
                                >
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
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:text-black"
                                >
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
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="text-center md:col-span-3 md:text-left lg:col-span-2 lg:col-start-7">
                            <h3 className="mb-5 text-[15px] font-bold text-gray-900">
                                Quick Links
                            </h3>
                            <ul className="space-y-4 text-[13px] md:text-[14px]">
                                <li>
                                    <Link
                                        href="/adopt"
                                        className="text-gray-500 transition hover:text-[#f07b61]"
                                    >
                                        Adopt a Cat
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-500 transition hover:text-[#f07b61]"
                                    >
                                        Support Us
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        href="/gallery"
                                        className="text-gray-500 transition hover:text-[#f07b61]"
                                    >
                                        Gallery
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-gray-500 transition hover:text-[#f07b61]"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="text-center md:col-span-4 md:text-left lg:col-span-3">
                            <h3 className="mb-5 text-[15px] font-bold text-gray-900">
                                Get Involved
                            </h3>
                            <ul className="space-y-4 text-[13px] md:text-[14px]">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-500 transition hover:text-[#f07b61]"
                                    >
                                        Donate
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-500 transition hover:text-[#f07b61]"
                                    >
                                        Fitness With Dina
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-500 transition hover:text-[#f07b61]"
                                    >
                                        Our Story
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 text-center md:flex-row">
                        <p className="text-xs text-gray-400">
                            (c) 2026 Dubai Street Kitties. All rights reserved.
                        </p>
                        <p className="text-xs text-gray-400">
                            Made with love for the cats of Dubai
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
