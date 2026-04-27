import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f2b7a7] via-[#f7d6c9] to-[#f3ece8] px-4 py-10 sm:px-6">
            <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/50 bg-white/90 shadow-[0_20px_80px_rgba(59,31,20,0.12)] lg:grid-cols-2">
                <section className="hidden bg-[radial-gradient(circle_at_top_right,_#fac2ac_0%,_#f3ece8_45%,_#fff_100%)] p-12 lg:flex lg:flex-col lg:justify-between">
                    <Link href="/" className="inline-flex w-fit">
                        <img src="/images/nav-logo.svg" alt="Dubai Street Kitties" className="h-14 w-auto" />
                    </Link>

                    <div className="max-w-md">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5f4d]">
                            Welcome Back
                        </p>
                        <h1 className="mt-4 text-4xl font-bold leading-tight text-[#2f1d15]">
                            Care starts with community.
                        </h1>
                        <p className="mt-5 text-base leading-relaxed text-[#6f5449]">
                            Login or create your account to manage adoptions, profile details, and your dashboard in one place.
                        </p>
                    </div>

                    <p className="text-sm text-[#7f6256]">
                        Dubai Street Kitties
                    </p>
                </section>

                <section className="w-full px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                    <div className="mb-8 lg:hidden">
                        <Link href="/" className="inline-flex">
                            <img src="/images/nav-logo.svg" alt="Dubai Street Kitties" className="h-12 w-auto" />
                        </Link>
                    </div>
                    {children}
                </section>
            </div>
        </div>
    );
}
