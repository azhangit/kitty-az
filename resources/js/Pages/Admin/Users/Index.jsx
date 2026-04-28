import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

function formatDisplayDate(value) {
    if (!value) return 'N/A';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'N/A';
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

export default function UsersIndex({ users = [], filters = {} }) {
    const [searchInput, setSearchInput] = useState(filters.search || '');

    const totalUsers = users.length;
    const verifiedUsers = useMemo(() => users.filter((user) => !!user.email_verified_at).length, [users]);
    const adminUsers = useMemo(() => users.filter((user) => (user.roles || []).includes('admin')).length, [users]);

    const submitSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.users.index'), { search: searchInput }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout
            title="User Management"
            subtitle="Manage and review all registered users"
        >
            <section className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <article className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4">
                    <p className="text-xs uppercase tracking-wider text-[#6f5449]">Total Users</p>
                    <p className="mt-2 text-3xl font-semibold">{totalUsers}</p>
                </article>
                <article className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4">
                    <p className="text-xs uppercase tracking-wider text-[#6f5449]">Verified Users</p>
                    <p className="mt-2 text-3xl font-semibold">{verifiedUsers}</p>
                </article>
                <article className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4">
                    <p className="text-xs uppercase tracking-wider text-[#6f5449]">Admin Users</p>
                    <p className="mt-2 text-3xl font-semibold">{adminUsers}</p>
                </article>
            </section>

            <section className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4">
                <form onSubmit={submitSearch} className="mb-4">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search by name or email"
                        className="w-full rounded-xl border border-[#e5d9d2] bg-[#f4efec] px-4 py-2.5 text-sm focus:border-[#f08063] focus:outline-none"
                    />
                </form>

                <div className="overflow-x-auto rounded-xl border border-[#e5d9d2] bg-white">
                    <table className="min-w-full text-sm">
                        <thead className="bg-[#f7f2ee] text-left text-xs uppercase tracking-wider text-[#6f5449]">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Roles</th>
                                <th className="px-4 py-3">Verified</th>
                                <th className="px-4 py-3">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-t border-[#efe6e1]">
                                    <td className="px-4 py-3 font-medium text-[#2f1d15]">{user.name}</td>
                                    <td className="px-4 py-3 text-[#5f5855]">{user.email}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-2">
                                            {(user.roles || []).length > 0 ? (
                                                user.roles.map((role) => (
                                                    <span
                                                        key={`${user.id}-${role}`}
                                                        className="rounded-full bg-gradient-to-r from-[#f8c6ac] to-[#9fd4ca] px-2.5 py-1 text-[11px] font-medium text-[#2f1d15]"
                                                    >
                                                        {role}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-xs text-[#8a807b]">No role</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                            user.email_verified_at ? 'bg-[#d8ebe7] text-[#2f6a5f]' : 'bg-[#f4d7d6] text-[#8a4b47]'
                                        }`}
                                        >
                                            {user.email_verified_at ? 'Verified' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-[#5f5855]">{formatDisplayDate(user.created_at)}</td>
                                </tr>
                            ))}
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-[#8a807b]">
                                        No users found.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </section>
        </AdminLayout>
    );
}

