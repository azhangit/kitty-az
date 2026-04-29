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
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

export default function ContactMessagesIndex({ messages = [], filters = {} }) {
    const [searchInput, setSearchInput] = useState(filters.search || '');

    const totalMessages = messages.length;
    const uniqueEmails = useMemo(() => new Set(messages.map((message) => message.email)).size, [messages]);
    const inquiryTypes = useMemo(() => new Set(messages.map((message) => message.inquiry_type).filter(Boolean)).size, [messages]);

    const submitSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.contacts.index'), { search: searchInput }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout title="Contact Messages" subtitle="Review inquiries submitted from contact form">
            <section className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <article className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4">
                    <p className="text-xs uppercase tracking-wider text-[#6f5449]">Total Messages</p>
                    <p className="mt-2 text-3xl font-semibold">{totalMessages}</p>
                </article>
                <article className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4">
                    <p className="text-xs uppercase tracking-wider text-[#6f5449]">Unique Emails</p>
                    <p className="mt-2 text-3xl font-semibold">{uniqueEmails}</p>
                </article>
                <article className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4">
                    <p className="text-xs uppercase tracking-wider text-[#6f5449]">Inquiry Types</p>
                    <p className="mt-2 text-3xl font-semibold">{inquiryTypes}</p>
                </article>
            </section>

            <section className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4">
                <form onSubmit={submitSearch} className="mb-4">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search by name, email, phone, inquiry type or message"
                        className="w-full rounded-xl border border-[#e5d9d2] bg-[#f4efec] px-4 py-2.5 text-sm focus:border-[#f08063] focus:outline-none"
                    />
                </form>

                <div className="space-y-3">
                    {messages.map((message) => (
                        <article key={message.id} className="rounded-xl border border-[#e5d9d2] bg-white p-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <p className="text-base font-semibold text-[#2f1d15]">
                                        {`${message.first_name || ''} ${message.last_name || ''}`.trim() || 'Unknown Sender'}
                                    </p>
                                    <p className="text-xs text-[#7f7570]">{formatDisplayDate(message.created_at)}</p>
                                </div>
                                <span className="rounded-full bg-[#f1ece8] px-3 py-1 text-xs font-semibold text-[#6f5449]">
                                    {message.inquiry_type || 'General Inquiry'}
                                </span>
                            </div>

                            <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-[#5f5855] md:grid-cols-2">
                                <p><span className="font-semibold text-[#2f1d15]">Email:</span> {message.email}</p>
                                <p><span className="font-semibold text-[#2f1d15]">Phone:</span> {message.phone}</p>
                            </div>

                            <div className="mt-3 rounded-lg bg-[#faf6f3] p-3 text-sm text-[#4f4642]">
                                {message.message}
                            </div>
                        </article>
                    ))}

                    {messages.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#d8cbc5] bg-white p-8 text-center text-sm text-[#8a807b]">
                            No contact messages found.
                        </div>
                    ) : null}
                </div>
            </section>
        </AdminLayout>
    );
}
