import AdminLayout from '@/Layouts/AdminLayout';

function InfoRow({ label, value }) {
    return (
        <div className="flex items-start justify-between gap-3 border-b border-[#ece2dc] py-2 text-sm">
            <span className="font-medium text-[#6f5449]">{label}</span>
            <span className="text-right text-[#2e2622]">{value || 'N/A'}</span>
        </div>
    );
}

export default function CatShow({ cat }) {
    const tags = cat.profile_tags || [];

    return (
        <AdminLayout
            title={`Cat Profile - ${cat.name}`}
            subtitle="Full medical and personality transparency for adoption decisions"
        >
            <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <article className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-5 xl:col-span-2">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-[280px_1fr]">
                        <div>
                            <img src={cat.photo_path || '/images/gallery-cat.png'} alt={cat.name} className="h-72 w-full rounded-2xl object-cover" />
                            <div className="mt-3 flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span key={tag} className="rounded-full bg-[#f1ece8] px-3 py-1 text-xs text-[#5f5855]">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-4xl font-semibold">{cat.name}</h2>
                            <p className="mt-2 text-sm text-[#6e6561]">{cat.rescue_story || 'Rescue story not added yet.'}</p>

                            <div className="mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2">
                                <InfoRow label="Age" value={cat.age_label} />
                                <InfoRow label="Gender" value={cat.gender} />
                                <InfoRow label="Breed" value={cat.breed} />
                                <InfoRow label="Weight" value={cat.weight_kg ? `${cat.weight_kg} kg` : 'N/A'} />
                            </div>
                        </div>
                    </div>
                </article>

                <article className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-5">
                    <h3 className="text-xl font-semibold">Personality Summary</h3>
                    <div className="mt-3">
                        <InfoRow label="Energy Level" value={cat.energy_level} />
                        <InfoRow label="Social Behavior" value={cat.social_behavior} />
                        <InfoRow label="Ideal Home Type" value={cat.ideal_home_type} />
                        <InfoRow label="Handling Tolerance" value={cat.handling_tolerance} />
                        <InfoRow label="Daily Attention" value={cat.daily_attention_requirement} />
                    </div>
                </article>
            </section>

            <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                <article className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-5">
                    <h3 className="text-xl font-semibold">Medical Summary</h3>
                    <div className="mt-3">
                        <InfoRow label="FIV Status" value={cat.fiv_status} />
                        <InfoRow label="FeLV Status" value={cat.felv_status} />
                        <InfoRow label="FIP History" value={cat.fip_history} />
                        <InfoRow label="Spayed / Neutered" value={cat.spay_neuter_status} />
                        <InfoRow label="Microchipped" value={cat.microchip_status} />
                        <InfoRow label="Vaccination Status" value={cat.vaccination_status} />
                        <InfoRow label="Special Needs" value={(cat.special_medical_needs || []).join(', ')} />
                        <InfoRow label="Current Medication" value={cat.current_medication} />
                    </div>
                </article>

                <article className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-5">
                    <h3 className="text-xl font-semibold">Compatibility & Lifestyle</h3>
                    <div className="mt-3">
                        <InfoRow label="Good With Cats" value={cat.good_with_cats} />
                        <InfoRow label="Good With Dogs" value={cat.good_with_dogs} />
                        <InfoRow label="Good With Children" value={cat.good_with_children} />
                        <InfoRow label="Diet Type" value={cat.diet_type} />
                        <InfoRow label="Grooming Needs" value={cat.grooming_needs} />
                    </div>

                    <h4 className="mt-5 text-sm font-semibold uppercase tracking-wider text-[#6f5449]">Personality Traits</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {(cat.personality_traits || []).map((trait) => (
                            <span key={trait} className="rounded-full bg-[#f1ece8] px-3 py-1 text-xs text-[#5f5855]">{trait}</span>
                        ))}
                    </div>
                </article>
            </section>

            <section className="mt-4 rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-5">
                <h3 className="text-2xl font-semibold">Medical Timeline</h3>
                <div className="mt-4 space-y-3">
                    {(cat.medical_records || []).map((record) => (
                        <article key={record.id} className="rounded-xl border border-[#e5d9d2] bg-white p-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-semibold">{record.type}</p>
                                    <p className="text-xs text-[#7f7570]">{record.record_date} • AED {Number(record.cost_aed || 0).toLocaleString()}</p>
                                    <p className="mt-1 text-xs text-[#6e6561]">{record.description || 'No description'}</p>
                                </div>
                                <span className="text-xs text-[#7f7570]">{record.vet_name || 'No vet listed'}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </AdminLayout>
    );
}
