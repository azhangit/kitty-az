import AdminLayout from '@/Layouts/AdminLayout';

function PercentBar({ label, value, total, colorClass }) {
    const percent = total > 0 ? Math.round((value / total) * 100) : 0;

    return (
        <div>
            <div className="mb-1 flex items-center justify-between text-sm">
                <span>{label}</span>
                <span>{value} ({percent}%)</span>
            </div>
            <div className="h-2 rounded-full bg-[#e9dfd8]">
                <div className={`h-2 rounded-full ${colorClass}`} style={{ width: `${percent}%` }} />
            </div>
        </div>
    );
}

export default function ReportsIndex({ stats, statusBreakdown, trends }) {
    const maxAdded = Math.max(...trends.map((month) => month.added), 1);
    const maxAdopted = Math.max(...trends.map((month) => month.adopted), 1);

    return (
        <AdminLayout title="Reports" subtitle="Analytics and insights">
            <section className="space-y-4 rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <article className="rounded-2xl border border-[#e5d9d2] bg-white p-4">
                        <p className="text-xs text-[#7f7570]">Total Cats</p>
                        <p className="mt-2 text-3xl font-semibold">{stats.totalCats}</p>
                    </article>
                    <article className="rounded-2xl border border-[#e5d9d2] bg-white p-4">
                        <p className="text-xs text-[#7f7570]">Medical Records</p>
                        <p className="mt-2 text-3xl font-semibold">{stats.medicalRecords}</p>
                    </article>
                    <article className="rounded-2xl border border-[#e5d9d2] bg-white p-4">
                        <p className="text-xs text-[#7f7570]">Medical Costs</p>
                        <p className="mt-2 text-3xl font-semibold">AED {Number(stats.medicalCost || 0).toLocaleString()}</p>
                    </article>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <article className="rounded-2xl border border-[#e5d9d2] bg-white p-4">
                        <h3 className="text-2xl font-semibold">Status Breakdown</h3>
                        <div className="mt-4 space-y-4">
                            <PercentBar label="Available" value={statusBreakdown.available} total={stats.totalCats} colorClass="bg-[#9cd2c8]" />
                            <PercentBar label="Adopted" value={statusBreakdown.adopted} total={stats.totalCats} colorClass="bg-[#bfdcc3]" />
                            <PercentBar label="Fostered" value={statusBreakdown.fostered} total={stats.totalCats} colorClass="bg-[#f7c7ad]" />
                            <PercentBar label="Medical Care" value={statusBreakdown.medical_care} total={stats.totalCats} colorClass="bg-[#f1d3d1]" />
                        </div>
                    </article>

                    <article className="rounded-2xl border border-[#e5d9d2] bg-white p-4">
                        <h3 className="text-2xl font-semibold">6-Month Trends</h3>
                        <div className="mt-4 space-y-3">
                            {trends.map((month) => (
                                <div key={month.month}>
                                    <div className="mb-1 flex justify-between text-sm">
                                        <span>{month.month}</span>
                                        <span>Added {month.added} / Adopted {month.adopted}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="h-2 rounded-full bg-[#e9dfd8]">
                                            <div className="h-2 rounded-full bg-[#9cd2c8]" style={{ width: `${Math.round((month.added / maxAdded) * 100)}%` }} />
                                        </div>
                                        <div className="h-2 rounded-full bg-[#efe5df]">
                                            <div className="h-2 rounded-full bg-[#f7c7ad]" style={{ width: `${Math.round((month.adopted / maxAdopted) * 100)}%` }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>
                </div>
            </section>
        </AdminLayout>
    );
}
