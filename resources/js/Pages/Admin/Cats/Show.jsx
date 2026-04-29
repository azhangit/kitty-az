import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

function formatDisplayDate(value) {
    if (!value) return 'N/A';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

function InfoRow({ label, value }) {
    return (
        <div className="flex min-w-0 items-start justify-between gap-3 border-b border-[#ece2dc] py-2 text-sm">
            <span className="shrink-0 font-medium text-[#6f5449]">{label}</span>
            <span className="min-w-0 break-all text-right text-[#2e2622]">{value || 'N/A'}</span>
        </div>
    );
}

function FieldError({ message }) {
    if (!message) return null;
    return <p className="mt-1 text-xs font-medium text-red-600">{message}</p>;
}

function ChipSelector({ items = [], selected = [], onToggle, title }) {
    return (
        <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#6f5449]">{title}</p>
            <div className="flex flex-wrap gap-2">
                {items.map((item) => {
                    const checked = selected.includes(item);
                    return (
                        <button
                            key={item}
                            type="button"
                            onClick={() => onToggle(item)}
                            className={`rounded-full px-3 py-1 text-xs transition ${
                                checked ? 'bg-[#9cd2c8] text-[#18574a]' : 'bg-[#f1ece8] text-[#6f5449] hover:bg-[#e7ddd7]'
                            }`}
                        >
                            {item}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default function CatShow({ cat, categories = [], options = {}, galleryImages: galleryLibrary = [] }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const tags = cat.profile_tags || [];
    const galleryImages = (cat.images?.length ? cat.images.map((img) => img.path) : [cat.photo_path || '/images/gallery-cat.png']).filter(Boolean);
    const mainImage = galleryImages[0] || '/images/gallery-cat.png';

    const editForm = useForm({
        _method: 'put',
        name: cat.name || '',
        age_label: cat.age_label || '',
        gender: cat.gender || options.gender?.[0] || 'Male',
        breed: cat.breed || options.breed?.[0] || 'Domestic Short Hair',
        size: cat.size || options.size?.[1] || 'Medium',
        weight_kg: cat.weight_kg || '',
        status: cat.status || 'available',
        location: cat.location || '',
        rescue_story: cat.rescue_story || '',
        fiv_status: cat.fiv_status || options.fivStatus?.[2] || 'Pending Test',
        felv_status: cat.felv_status || options.felvStatus?.[2] || 'Pending Test',
        fip_history: cat.fip_history || options.fipHistory?.[0] || 'Never Diagnosed',
        vaccination_status: cat.vaccination_status || options.vaccinationStatus?.[1] || 'Partially Vaccinated',
        special_medical_needs: cat.special_medical_needs || [],
        current_medication: cat.current_medication || '',
        energy_level: cat.energy_level || 'Medium',
        social_behavior: cat.social_behavior || 'Friendly',
        ideal_home_type: cat.ideal_home_type || options.homeType?.[0] || 'Apartment Friendly',
        handling_tolerance: cat.handling_tolerance || 'Enjoys regular handling',
        daily_attention_requirement: cat.daily_attention_requirement || 'Moderate',
        personality_traits: cat.personality_traits || [],
        profile_tags: cat.profile_tags || [],
        category_ids: (cat.categories || []).map((item) => item.id),
        photos: [],
        gallery_image_ids: [],
        image_source: 'upload',
    });

    const toggleArrayField = (field, value) => {
        const current = editForm.data[field] || [];
        editForm.setData(
            field,
            current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
        );
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        editForm.post(route('admin.cats.update', cat.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => setShowEditModal(false),
        });
    };

    const toggleGalleryImage = (imageId) => {
        const current = editForm.data.gallery_image_ids || [];
        editForm.setData(
            'gallery_image_ids',
            current.includes(imageId) ? current.filter((id) => id !== imageId) : [...current, imageId],
        );
    };

    const switchImageSource = (source) => {
        editForm.setData('image_source', source);
        if (source === 'upload') {
            editForm.setData('gallery_image_ids', []);
        }
        if (source === 'gallery') {
            editForm.setData('photos', []);
        }
    };

    return (
        <AdminLayout
            title={`Cat Profile - ${cat.name}`}
            subtitle="Full medical and personality transparency for adoption decisions"
            action={(
                <button
                    type="button"
                    onClick={() => setShowEditModal(true)}
                    className="rounded-full bg-gradient-to-r from-[#f6b79f] to-[#9ecfc6] px-5 py-2 text-sm font-semibold text-[#2f1d15]"
                >
                    Edit Cat
                </button>
            )}
        >
            <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <article className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-5 xl:col-span-2">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-[280px_1fr]">
                        <div>
                            <img src={mainImage} alt={cat.name} className="h-72 w-full rounded-2xl object-cover" />
                            <div className="mt-3 grid grid-cols-4 gap-2">
                                {galleryImages.slice(0, 8).map((imagePath, index) => (
                                    <div key={`${imagePath}-${index}`} className="h-14 overflow-hidden rounded-lg border border-[#e5d9d2]">
                                        <img src={imagePath} alt={`${cat.name} ${index + 1}`} className="h-full w-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span key={tag} className="rounded-full bg-[#f1ece8] px-3 py-1 text-xs text-[#5f5855]">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="min-w-0">
                            <h2 className="text-4xl font-semibold">{cat.name}</h2>
                            <p className="mt-2 whitespace-pre-line break-all text-sm text-[#6e6561]">
                                {cat.rescue_story || 'Rescue story not added yet.'}
                            </p>

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
                        <InfoRow label="Vaccination Status" value={cat.vaccination_status} />
                        <InfoRow label="Special Needs" value={(cat.special_medical_needs || []).join(', ')} />
                        <InfoRow label="Current Medication" value={cat.current_medication} />
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
                                    <p className="text-xs text-[#7f7570]">{formatDisplayDate(record.record_date)} - AED {Number(record.cost_aed || 0).toLocaleString()}</p>
                                    <p className="mt-1 text-xs text-[#6e6561]">{record.description || 'No description'}</p>
                                </div>
                                <span className="text-xs text-[#7f7570]">{record.vet_name || 'No vet listed'}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {showEditModal ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
                    <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-[#f8f6f4] shadow-2xl">
                        <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-[#f8c6ac] to-[#9fd4ca] px-6 py-4">
                            <h3 className="text-3xl font-semibold">Edit Cat</h3>
                            <button type="button" onClick={() => setShowEditModal(false)} className="text-xl">x</button>
                        </div>

                        <form onSubmit={submitUpdate} className="space-y-5 p-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <input className="w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" placeholder="Name" value={editForm.data.name} onChange={(e) => editForm.setData('name', e.target.value)} />
                                    <FieldError message={editForm.errors.name} />
                                </div>
                                <div>
                                    <select className="w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" value={editForm.data.age_label} onChange={(e) => editForm.setData('age_label', e.target.value)}>
                                        <option value="">Age Group</option>
                                        {(options.age || []).map((item) => <option key={item} value={item}>{item}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <select className="w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" value={editForm.data.gender} onChange={(e) => editForm.setData('gender', e.target.value)}>
                                        {(options.gender || []).map((item) => <option key={item} value={item}>{item}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <select className="w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" value={editForm.data.breed} onChange={(e) => editForm.setData('breed', e.target.value)}>
                                        {(options.breed || []).map((item) => <option key={item} value={item}>{item}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <select className="w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" value={editForm.data.status} onChange={(e) => editForm.setData('status', e.target.value)}>
                                        {(options.status || []).map((item) => <option key={item} value={item}>{item.replace('_', ' ')}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <input className="w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" placeholder="Location" value={editForm.data.location} onChange={(e) => editForm.setData('location', e.target.value)} />
                                </div>
                                <div>
                                    <input className="w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" placeholder="Weight (kg)" value={editForm.data.weight_kg} onChange={(e) => editForm.setData('weight_kg', e.target.value)} />
                                </div>
                            </div>

                            <div className="rounded-xl border border-[#e5d9d2] bg-white p-3">
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#6f5449]">
                                    Add More Photos
                                </label>
                                <div className="mb-3 flex gap-2">
                                    <button type="button" onClick={() => switchImageSource('upload')} className={`rounded-full px-3 py-1 text-xs ${editForm.data.image_source === 'upload' ? 'bg-[#9cd2c8] text-[#18574a]' : 'bg-[#f1ece8] text-[#6f5449]'}`}>Upload</button>
                                    <button type="button" onClick={() => switchImageSource('gallery')} className={`rounded-full px-3 py-1 text-xs ${editForm.data.image_source === 'gallery' ? 'bg-[#9cd2c8] text-[#18574a]' : 'bg-[#f1ece8] text-[#6f5449]'}`}>Select From Gallery</button>
                                </div>
                                {editForm.data.image_source === 'upload' ? (
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/png,image/jpeg,image/jpg,image/webp"
                                        onChange={(e) => editForm.setData('photos', Array.from(e.target.files || []))}
                                        className="block w-full text-sm text-[#6e6561] file:mr-3 file:rounded-lg file:border-0 file:bg-[#9cd2c8] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#1f4d43]"
                                    />
                                ) : (
                                    <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
                                        {galleryLibrary.map((image) => {
                                            const checked = editForm.data.gallery_image_ids.includes(image.id);
                                            return (
                                                <button key={image.id} type="button" onClick={() => toggleGalleryImage(image.id)} className={`overflow-hidden rounded-lg border-2 ${checked ? 'border-[#9cd2c8]' : 'border-transparent'}`}>
                                                    <img src={image.path} alt={image.type} className="h-20 w-full object-cover" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                                <FieldError message={editForm.errors.photos || editForm.errors['photos.0']} />
                            </div>

                            <textarea className="h-24 w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" placeholder="Rescue story" value={editForm.data.rescue_story} onChange={(e) => editForm.setData('rescue_story', e.target.value)} />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <select className="w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" value={editForm.data.fiv_status} onChange={(e) => editForm.setData('fiv_status', e.target.value)}>{(options.fivStatus || []).map((item) => <option key={item}>{item}</option>)}</select>
                                <select className="w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" value={editForm.data.felv_status} onChange={(e) => editForm.setData('felv_status', e.target.value)}>{(options.felvStatus || []).map((item) => <option key={item}>{item}</option>)}</select>
                                <select className="w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" value={editForm.data.vaccination_status} onChange={(e) => editForm.setData('vaccination_status', e.target.value)}>{(options.vaccinationStatus || []).map((item) => <option key={item}>{item}</option>)}</select>
                            </div>

                            <ChipSelector title="Special Medical Needs" items={options.specialMedicalNeeds || []} selected={editForm.data.special_medical_needs} onToggle={(item) => toggleArrayField('special_medical_needs', item)} />
                            <ChipSelector title="Personality Traits" items={options.personalityTraits || []} selected={editForm.data.personality_traits} onToggle={(item) => toggleArrayField('personality_traits', item)} />
                            <ChipSelector title="Profile Tags" items={options.profileTags || []} selected={editForm.data.profile_tags} onToggle={(item) => toggleArrayField('profile_tags', item)} />

                            <div>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#6f5449]">Categories</p>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => {
                                        const checked = editForm.data.category_ids.includes(category.id);
                                        return (
                                            <button
                                                key={category.id}
                                                type="button"
                                                onClick={() => {
                                                    editForm.setData('category_ids', checked ? editForm.data.category_ids.filter((id) => id !== category.id) : [...editForm.data.category_ids, category.id]);
                                                }}
                                                className={`rounded-full px-3 py-1 text-xs ${checked ? 'bg-[#9cd2c8] text-[#18574a]' : 'bg-[#f1ece8] text-[#6f5449]'}`}
                                            >
                                                {category.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <button type="button" className="rounded-xl bg-[#e5e5e5] py-3 text-sm font-semibold" onClick={() => setShowEditModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="rounded-xl bg-gradient-to-r from-[#f6b79f] to-[#9ecfc6] py-3 text-sm font-semibold text-[#2f1d15]" disabled={editForm.processing}>
                                    {editForm.processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </AdminLayout>
    );
}
