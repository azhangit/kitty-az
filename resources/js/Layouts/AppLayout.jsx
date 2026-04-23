import { Link } from '@inertiajs/react';

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
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
            {/* HEADER */}
            <header className="bg-white px-4 sm:px-6 lg:px-12 py-3 lg:py-4 sticky top-0 z-50">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <Link href="/" className="flex-shrink-0">
                        <Logo />
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-[13px] xl:text-[14px] transition-colors whitespace-nowrap px-4 py-2 rounded-full font-semibold ${
                                    currentPath === item.href || (item.name === 'Home' && currentPath === '/')
                                        ? 'bg-[#fac2ac] text-[#2d2d2d] shadow-sm'
                                        : 'text-gray-600 hover:text-black font-medium'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 md:gap-5 text-gray-400">
                        <button className="hover:text-black transition p-1"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg></button>
                        <button className="hover:text-black transition p-1"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg></button>
                        <button className="hover:text-black transition p-1"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm5.938 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg></button>
                        <button className="lg:hidden hover:text-black transition p-1 ml-2"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" /></svg></button>
                    </div>
                </div>
            </header>

            {children}

            {/* FOOTER */}
            <footer className="bg-white pt-16 md:pt-20 pb-8 border-t border-gray-100">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 mb-16">
                        <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start space-y-6">
                            <Logo />
                            <p className="text-[13px] md:text-[14px] leading-[1.7] text-gray-500 max-w-sm mt-2">
                                Rescuing, rehabilitating, and rehoming Dubai's street cats. Every cat deserves
                                a loving home and a second chance at life.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black transition"><svg className="w-4 h-4"></svg></a>
                                <a href="#" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black transition"><svg className="w-4 h-4"></svg></a>
                                <a href="#" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black transition"><svg className="w-4 h-4"></svg></a>
                            </div>
                        </div>
                        
                        <div className="md:col-span-3 lg:col-span-2 lg:col-start-7 text-center md:text-left">
                            <h3 className="text-[15px] font-bold text-gray-900 mb-5">Quick Links</h3>
                            <ul className="space-y-4 text-[13px] md:text-[14px]">
                                <li><Link href="/adopt" className="text-gray-500 hover:text-[#f07b61] transition">Adopt a Cat</Link></li>
                                <li><a href="#" className="text-gray-500 hover:text-[#f07b61] transition">Support Us</a></li>
                                <li><Link href="/gallery" className="text-gray-500 hover:text-[#f07b61] transition">Gallery</Link></li>
                                <li><Link href="/contact" className="text-gray-500 hover:text-[#f07b61] transition">Contact</Link></li>
                            </ul>
                        </div>
                        
                        <div className="md:col-span-4 lg:col-span-3 text-center md:text-left">
                            <h3 className="text-[15px] font-bold text-gray-900 mb-5">Get Involved</h3>
                            <ul className="space-y-4 text-[13px] md:text-[14px]">
                                <li><a href="#" className="text-gray-500 hover:text-[#f07b61] transition">Donate</a></li>
                                <li><a href="#" className="text-gray-500 hover:text-[#f07b61] transition">Fitness With Dina</a></li>
                                <li><a href="#" className="text-gray-500 hover:text-[#f07b61] transition">Our Story</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                        <p className="text-xs text-gray-400">© 2026 Dubai Street Kitties. All rights reserved.</p>
                        <p className="text-xs text-gray-400">Made with <span className="text-[#f08063] mx-1">❤️</span> for the cats of Dubai</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
