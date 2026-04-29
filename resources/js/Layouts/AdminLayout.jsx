import FlashToasts from '@/Components/FlashToasts';
import { Head, Link, usePage } from '@inertiajs/react';

const navItems = [
    { label: 'Dashboard', href: route('dashboard'), routeName: 'dashboard' },
    { label: 'All Cats', href: route('admin.cats.index'), routeName: 'admin.cats.index' },
    { label: 'Categories', href: route('admin.categories.index'), routeName: 'admin.categories.index' },
    { label: 'Gallery', href: route('admin.gallery.index'), routeName: 'admin.gallery.index' },
    { label: 'User Management', href: route('admin.users.index'), routeName: 'admin.users.index' },
    { label: 'Reports', href: route('admin.reports.index'), routeName: 'admin.reports.index' },
];

export default function AdminLayout({ title, subtitle, children, action }) {
    const user = usePage().props.auth?.user;

    return (
        <>
            {title ? <Head title={title} /> : null}
            <div className="min-h-screen overflow-x-hidden bg-[#f5f2ef] text-[#2e2622] lg:pl-[230px]">
                <FlashToasts />
                <aside className="fixed inset-y-0 left-0 hidden w-[230px] flex-col border-r border-[#e5deda] bg-[#f8f6f4] lg:flex">
                    <div className="border-b border-[#e5deda] px-6 py-7">
                        <img src="/images/nav-logo.svg" alt="Dubai Street Kitties" className="h-10 w-auto" />
                    </div>

                    <nav className="flex-1 space-y-2 px-4 py-6">
                        {navItems.map((item) => {
                            const active = route().current(item.routeName) || (item.routeName === 'admin.cats.index' && route().current('admin.cats.show'));
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`block rounded-full px-4 py-2 text-sm font-medium transition ${
                                        active
                                            ? 'bg-gradient-to-r from-[#f8c6ac] to-[#9fd4ca] text-[#2f1d15]'
                                            : 'text-[#5f5855] hover:bg-[#ece7e4]'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-[#e5deda] p-4">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full rounded-full border border-[#e3d7d1] px-4 py-2 text-left text-sm font-medium text-[#5f5855] transition hover:bg-[#ece7e4]"
                        >
                            Logout
                        </Link>
                    </div>
                </aside>

                <main className="w-full px-4 py-5 sm:px-6 lg:px-8">
                    <header className="mb-5 rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] px-5 py-4 sm:px-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h1 className="text-3xl font-semibold leading-tight">{title}</h1>
                                <p className="mt-1 text-sm text-[#6e6561]">{subtitle || `Welcome back ${user?.name || 'Admin'}!`}</p>
                            </div>
                            {action}
                        </div>
                    </header>

                    {children}
                </main>
            </div>
        </>
    );
}
