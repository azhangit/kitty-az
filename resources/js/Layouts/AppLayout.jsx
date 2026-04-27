import { Link, usePage } from '@inertiajs/react';

const Logo = () => (
    <div className="flex flex-col items-center justify-center">
        <img src="images/nav-logo.svg" alt="" />
    </div>
);

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Adopt', href: '/adopt' },
    { name: 'Shop', href: '/shop' },
    { name: 'Support', href: '/support' },
    { name: 'Adoption Abroad', href: '/adoption-abroad' },
    { name: 'Contact', href: '/contact' },
];

export default function AppLayout({ children, currentPath }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div className="min-h-screen overflow-x-hidden bg-white font-sans text-gray-900">
            <header className="sticky top-0 z-50 bg-white px-4 py-3 sm:px-6 lg:px-12 lg:py-4">
                <div className="mx-auto flex max-w-[1400px] items-center justify-between">
                    <Link href="/" className="flex-shrink-0">
                        <Logo />
                    </Link>

                    <nav className="hidden items-center gap-4 lg:flex xl:gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition-colors xl:text-[14px] ${
                                    currentPath === item.href ||
                                    (item.name === 'Home' && currentPath === '/')
                                        ? 'bg-[#fac2ac] text-[#2d2d2d] shadow-sm'
                                        : 'font-medium text-gray-600 hover:text-black'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 text-gray-400 md:gap-5">
                        <button className="p-1 transition hover:text-black">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                        <button className="p-1 transition hover:text-black">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm5.938 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
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
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
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
                                Rescuing, rehabilitating, and rehoming Dubai's street cats. Every cat deserves
                                a loving home and a second chance at life.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:text-black"><svg className="h-4 w-4"></svg></a>
                                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:text-black"><svg className="h-4 w-4"></svg></a>
                                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:text-black"><svg className="h-4 w-4"></svg></a>
                            </div>
                        </div>

                        <div className="text-center md:col-span-3 md:text-left lg:col-span-2 lg:col-start-7">
                            <h3 className="mb-5 text-[15px] font-bold text-gray-900">Quick Links</h3>
                            <ul className="space-y-4 text-[13px] md:text-[14px]">
                                <li><Link href="/adopt" className="text-gray-500 transition hover:text-[#f07b61]">Adopt a Cat</Link></li>
                                <li><a href="#" className="text-gray-500 transition hover:text-[#f07b61]">Support Us</a></li>
                                <li><Link href="/gallery" className="text-gray-500 transition hover:text-[#f07b61]">Gallery</Link></li>
                                <li><Link href="/contact" className="text-gray-500 transition hover:text-[#f07b61]">Contact</Link></li>
                            </ul>
                        </div>

                        <div className="text-center md:col-span-4 md:text-left lg:col-span-3">
                            <h3 className="mb-5 text-[15px] font-bold text-gray-900">Get Involved</h3>
                            <ul className="space-y-4 text-[13px] md:text-[14px]">
                                <li><a href="#" className="text-gray-500 transition hover:text-[#f07b61]">Donate</a></li>
                                <li><a href="#" className="text-gray-500 transition hover:text-[#f07b61]">Fitness With Dina</a></li>
                                <li><a href="#" className="text-gray-500 transition hover:text-[#f07b61]">Our Story</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 text-center md:flex-row">
                        <p className="text-xs text-gray-400">(c) 2026 Dubai Street Kitties. All rights reserved.</p>
                        <p className="text-xs text-gray-400">Made with love for the cats of Dubai</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
