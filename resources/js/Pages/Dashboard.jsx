import { Head, Link, usePage } from '@inertiajs/react';

const menuItems = [
    { name: 'Dashboard', active: true },
    { name: 'All Cats', active: false },
    { name: 'Categories', active: false },
    { name: 'Reports', active: false },
];

const stats = [
    {
        title: 'Total',
        value: '200',
        description: 'Total Cats in System',
        badgeColor: 'bg-[#f8c8ae]',
    },
    {
        title: 'Ready',
        value: '80',
        description: 'Available for Adoption',
        badgeColor: 'bg-[#9cd2c8]',
    },
    {
        title: 'Success',
        value: '10',
        description: 'Successfully Adopted',
        badgeColor: 'bg-[#f8c8ae]',
    },
    {
        title: 'In Care',
        value: '05',
        description: 'In Foster Care',
        badgeColor: 'bg-[#9cd2c8]',
    },
];

const recentCats = [
    {
        name: 'Luna',
        detail: '4 months - Gray Tabby',
        status: 'Available',
        date: 'Feb 05',
        statusColor: 'bg-[#9cd2c8] text-[#18574a]',
    },
    {
        name: 'Mango',
        detail: '2 years - Orange Tabby',
        status: 'Available',
        date: 'Jan 10',
        statusColor: 'bg-[#9cd2c8] text-[#18574a]',
    },
    {
        name: 'Patches',
        detail: '3 years - Calico',
        status: 'Fostered',
        date: 'Dec 15',
        statusColor: 'bg-[#f7c7ad] text-[#6b3b27]',
    },
];

export default function Dashboard() {
    const user = usePage().props.auth?.user;

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen overflow-x-hidden bg-[#f5f2ef] text-[#2e2622] lg:pl-[260px]">
                <aside className="fixed inset-y-0 left-0 hidden w-[260px] flex-col border-r border-[#e5deda] bg-[#f8f6f4] lg:flex">
                    <div className="border-b border-[#e5deda] px-8 py-8">
                        <img src="/images/nav-logo.svg" alt="Dubai Street Kitties" className="h-10 w-auto" />
                    </div>

                    <nav className="flex-1 space-y-2 px-6 py-8">
                        {menuItems.map((item) => (
                            <button
                                key={item.name}
                                type="button"
                                className={`w-full rounded-full px-4 py-2 text-left text-sm font-medium transition ${
                                    item.active
                                        ? 'bg-gradient-to-r from-[#f8c6ac] to-[#9fd4ca] text-[#2f1d15]'
                                        : 'text-[#5f5855] hover:bg-[#ece7e4]'
                                }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    <div className="border-t border-[#e5deda] p-6">
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
                    <div className="w-full">
                        <header className="mb-5 rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] px-5 py-4 sm:px-6">
                            <h1 className="text-2xl font-semibold leading-tight">Dashboard</h1>
                            <p className="mt-1 text-sm text-[#6e6561]">
                                Welcome back {user?.name || 'Admin'}! Here's what's happening.
                            </p>
                        </header>

                        <section className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#f6b79f] to-[#9ecfc6] p-5 sm:p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-[28px] font-semibold leading-tight text-[#2f1d15]">
                                        Welcome to Your Dashboard!
                                    </h2>
                                    <p className="mt-1 text-sm text-[#443a35]">
                                        Here's an overview of all your rescue cats and their progress.
                                    </p>
                                </div>
                                <img
                                    src="/images/dina-about-us.png"
                                    alt="Dashboard hero"
                                    className="h-28 w-28 rounded-2xl object-cover shadow-sm sm:h-32 sm:w-32"
                                />
                            </div>
                        </section>

                        <section className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {stats.map((item) => (
                                <article key={item.title} className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4">
                                    <div className="mb-4 flex items-start justify-between">
                                        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${item.badgeColor}`}>
                                            <span className="h-2.5 w-2.5 rounded-full bg-[#2f1d15]" />
                                        </span>
                                        <span className="text-xs text-[#7f7570]">{item.title}</span>
                                    </div>
                                    <p className="text-3xl font-semibold leading-none">{item.value}</p>
                                    <p className="mt-2 text-xs text-[#7f7570]">{item.description}</p>
                                </article>
                            ))}
                        </section>

                        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                            <div className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4 sm:p-5 xl:col-span-2">
                                <div className="mb-5 flex items-center justify-between">
                                    <h3 className="text-3xl font-semibold leading-tight">Recently Added Cats</h3>
                                    <button type="button" className="rounded-full bg-[#f7bda4] px-5 py-2 text-sm font-semibold text-[#2f1d15]">
                                        View All
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {recentCats.map((cat) => (
                                        <article
                                            key={cat.name}
                                            className="flex items-center justify-between rounded-2xl border border-[#e7dfdb] bg-[#f4efec] px-3 py-3 sm:px-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src="/images/gallery-cat.png"
                                                    alt={cat.name}
                                                    className="h-12 w-12 rounded-xl object-cover"
                                                />
                                                <div>
                                                    <p className="text-lg font-semibold leading-tight">{cat.name}</p>
                                                    <p className="text-xs text-[#7f7570]">{cat.detail}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-flex rounded-full px-4 py-1 text-xs font-semibold ${cat.statusColor}`}>
                                                    {cat.status}
                                                </span>
                                                <p className="mt-1 text-xs text-[#8a807b]">{cat.date}</p>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <article className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-5">
                                    <p className="text-xs text-[#746b66]">$ Total Medical Costs</p>
                                    <p className="mt-3 text-3xl font-semibold leading-none">AED 1,600</p>
                                    <p className="mt-2 text-xs text-[#8a807b]">Across all cats in the system</p>
                                </article>

                                <article className="rounded-2xl bg-[#9ecfc6] p-5 text-[#1f4d43]">
                                    <p className="text-xs">Adoption Progress</p>
                                    <p className="mt-3 text-3xl font-semibold leading-none">0%</p>
                                    <p className="mt-2 text-xs">of all cats have found homes</p>
                                </article>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}
