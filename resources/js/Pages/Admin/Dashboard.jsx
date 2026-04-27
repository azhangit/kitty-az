import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';

const statusPillClass = {
    available: 'bg-[#9cd2c8] text-[#18574a]',
    adopted: 'bg-[#bfdcc3] text-[#2e5937]',
    fostered: 'bg-[#f7c7ad] text-[#6b3b27]',
    medical_care: 'bg-[#f1d3d1] text-[#6e3a46]',
};

export default function Dashboard({ stats, recentCats, recentMedicalRecords }) {
    const statCards = [
        { label: 'Total', value: stats.total, subtitle: 'Total Cats in System' },
        { label: 'Ready', value: stats.ready, subtitle: 'Available for Adoption' },
        { label: 'Success', value: stats.success, subtitle: 'Successfully Adopted' },
        { label: 'In Care', value: stats.inCare, subtitle: 'Foster + Medical Care' },
    ];

    return (
        <AdminLayout
            title="Dashboard"
            subtitle="Welcome back! Here's what's happening."
            action={
                <Link
                    href={route('admin.cats.index')}
                    className="rounded-full bg-gradient-to-r from-[#f6b79f] to-[#9ecfc6] px-5 py-2 text-sm font-semibold text-[#2f1d15]"
                >
                    Manage Cats
                </Link>
            }
        >
            <section className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#f6b79f] to-[#9ecfc6] p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-[30px] font-semibold leading-tight text-[#2f1d15]">Welcome to Your Dashboard!</h2>
                        <p className="mt-1 text-sm text-[#443a35]">Here's an overview of all your rescue cats and their progress.</p>
                    </div>
                    <img src="/images/dina-about-us.png" alt="Dashboard hero" className="h-28 w-28 rounded-2xl object-cover shadow-sm sm:h-32 sm:w-32" />
                </div>
            </section>

            <section className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {statCards.map((card) => (
                    <article key={card.label} className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4">
                        <p className="text-xs text-[#7f7570]">{card.label}</p>
                        <p className="mt-2 text-4xl font-semibold leading-none">{card.value}</p>
                        <p className="mt-2 text-xs text-[#7f7570]">{card.subtitle}</p>
                    </article>
                ))}
            </section>

            <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <div className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-5 xl:col-span-2">
                    <div className="mb-5 flex items-center justify-between">
                        <h3 className="text-3xl font-semibold leading-tight">Recently Added Cats</h3>
                        <Link href={route('admin.cats.index')} className="rounded-full bg-[#f7bda4] px-5 py-2 text-sm font-semibold text-[#2f1d15]">
                            View All
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentCats.length > 0 ? (
                            recentCats.map((cat) => (
                                <article key={cat.id} className="flex items-center justify-between rounded-2xl border border-[#e7dfdb] bg-[#f4efec] px-3 py-3 sm:px-4">
                                    <div className="flex items-center gap-3">
                                        <img src={cat.photo_path || '/images/gallery-cat.png'} alt={cat.name} className="h-12 w-12 rounded-xl object-cover" />
                                        <div>
                                            <p className="text-lg font-semibold leading-tight">{cat.name}</p>
                                            <p className="text-xs text-[#7f7570]">{cat.age_label || 'Age N/A'} - {cat.breed || 'Breed N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-flex rounded-full px-4 py-1 text-xs font-semibold ${statusPillClass[cat.status] || 'bg-gray-200 text-gray-700'}`}>
                                            {cat.status.replace('_', ' ')}
                                        </span>
                                        <p className="mt-1 text-xs text-[#8a807b]">{cat.location || 'No location'}</p>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <p className="rounded-xl bg-[#f4efec] px-4 py-3 text-sm text-[#7f7570]">No cats added yet.</p>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <article className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-5">
                        <p className="text-xs text-[#746b66]">Total Medical Costs</p>
                        <p className="mt-3 text-3xl font-semibold leading-none">AED {Number(stats.medicalCost || 0).toLocaleString()}</p>
                        <p className="mt-2 text-xs text-[#8a807b]">Across all cats in the system</p>
                    </article>

                    <article className="rounded-2xl bg-[#9ecfc6] p-5 text-[#1f4d43]">
                        <p className="text-xs">Adoption Progress</p>
                        <p className="mt-3 text-3xl font-semibold leading-none">{stats.adoptionRate}%</p>
                        <p className="mt-2 text-xs">of all cats have found homes</p>
                    </article>

                    <article className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-5">
                        <p className="mb-3 text-sm font-semibold">Recent Medical Records</p>
                        <div className="space-y-2">
                            {recentMedicalRecords.length > 0 ? (
                                recentMedicalRecords.map((record) => (
                                    <div key={record.id} className="rounded-xl bg-[#f1ece8] px-3 py-2 text-xs">
                                        <p className="font-semibold">{record.type} - {record.cat?.name || 'Cat'}</p>
                                        <p className="text-[#6e6561]">AED {Number(record.cost_aed || 0).toLocaleString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="rounded-xl bg-[#f1ece8] px-3 py-2 text-xs text-[#6e6561]">No medical records yet.</p>
                            )}
                        </div>
                    </article>
                </div>
            </section>
        </AdminLayout>
    );
}
