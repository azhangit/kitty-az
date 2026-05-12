import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, useForm, usePage, useRemember } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

const statusTabs = [
    { label: 'All', value: 'all' },
    { label: 'Available', value: 'available' },
    { label: 'Adopted', value: 'adopted' },
    { label: 'Fostered', value: 'fostered' },
    { label: 'Medical Care', value: 'medical_care' },
];

const statusPillClass = {
    available: 'bg-[#9cd2c8] text-[#18574a]',
    adopted: 'bg-[#bfdcc3] text-[#2e5937]',
    fostered: 'bg-[#f7c7ad] text-[#6b3b27]',
    medical_care: 'bg-[#f1d3d1] text-[#6e3a46]',
};

const catLocationOptions = ['Sanctuary resident', 'Foster care', 'Rehome'];

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

function CheckboxList({ title, items = [], selected = [], onToggle, onAddCustom }) {
    const [customValue, setCustomValue] = useState('');
    const visibleItems = useMemo(
        () => Array.from(new Set([...items, ...selected])).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })),
        [items, selected],
    );

    const addCustomValue = () => {
        const value = customValue.trim();

        if (!value) return;

        onAddCustom(value);
        setCustomValue('');
    };

    return (
        <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#6f5449]">{title}</p>
            <div className="flex flex-wrap gap-2">
                {visibleItems.map((item) => {
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
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                    type="text"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addCustomValue();
                        }
                    }}
                    placeholder={`Add ${title.toLowerCase()}`}
                    className="min-w-0 flex-1 rounded-xl border border-[#e5d9d2] bg-white px-3 py-2 text-sm"
                />
                <button
                    type="button"
                    onClick={addCustomValue}
                    className="rounded-xl bg-[#9cd2c8] px-4 py-2 text-sm font-semibold text-[#18574a]"
                >
                    Add
                </button>
            </div>
        </div>
    );
}

function FieldError({ message }) {
    if (!message) return null;
    return <p className="mt-1 text-xs font-medium text-red-600">{message}</p>;
}

function CategoryPicker({ categories, selected = [], onChange, categoryForm, colorOptions }) {
    const toggleCategory = (categoryId) => {
        onChange(selected.includes(categoryId) ? selected.filter((id) => id !== categoryId) : [...selected, categoryId]);
    };

    const submitNewCategory = () => {
        if (!categoryForm.data.name.trim()) return;

        categoryForm.post(route('admin.categories.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => categoryForm.reset(),
        });
    };

    return (
        <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#6f5449]">Categories</p>
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                    const checked = selected.includes(category.id);
                    return (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => toggleCategory(category.id)}
                            className={`rounded-full px-3 py-1 text-xs ${checked ? 'bg-[#9cd2c8] text-[#18574a]' : 'bg-[#f1ece8] text-[#6f5449]'}`}
                        >
                            {category.name}
                        </button>
                    );
                })}
            </div>

            <div className="mt-3 rounded-xl border border-[#e5d9d2] bg-white p-3">
                <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="min-w-0 flex-1">
                        <input
                            type="text"
                            value={categoryForm.data.name}
                            onChange={(e) => categoryForm.setData('name', e.target.value)}
                            placeholder="Add new category"
                            className="w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2 text-sm"
                        />
                        <FieldError message={categoryForm.errors.name} />
                    </div>
                    <button
                        type="button"
                        onClick={submitNewCategory}
                        className="rounded-xl bg-[#9cd2c8] px-4 py-2 text-sm font-semibold text-[#18574a]"
                        disabled={categoryForm.processing || !categoryForm.data.name.trim()}
                    >
                        {categoryForm.processing ? 'Adding...' : 'Add Category'}
                    </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                        <button
                            key={color}
                            type="button"
                            onClick={() => categoryForm.setData('color', color)}
                            className={`h-7 w-7 rounded-full border-2 ${categoryForm.data.color === color ? 'border-[#2f1d15]' : 'border-transparent'}`}
                            style={{ backgroundColor: color }}
                            aria-label={`Use category color ${color}`}
                        />
                    ))}
                </div>
                <FieldError message={categoryForm.errors.color} />
            </div>
        </div>
    );
}

export default function CatsIndex({ cats, categories, filters, options, galleryImages = [], colorOptions = ['#9cd2c8'] }) {
    const pageErrors = usePage().props.errors || {};
    const [showAddModal, setShowAddModal] = useRemember(false, 'admin.cats.showAddModal');
    const [medicalModalCat, setMedicalModalCat] = useState(null);
    const [searchInput, setSearchInput] = useState(filters.search || '');

    const addForm = useForm('admin.cats.create.form', {
        name: '',
        age_label: '',
        gender: options.gender?.[0] || 'Male',
        breed: options.breed?.[0] || 'Domestic Short Hair',
        size: options.size?.[1] || 'Medium',
        weight_kg: '',
        status: 'available',
        location: 'Foster care',
        rescue_story: '',
        photo_path: '',
        photos: [],
        gallery_image_ids: [],
        image_source: 'upload',
        fiv_status: options.fivStatus?.[2] || 'Pending Test',
        felv_status: options.felvStatus?.[2] || 'Pending Test',
        fip_history: options.fipHistory?.[0] || 'Never Diagnosed',
        spay_neuter_status: options.spayNeuterStatus?.[2] || 'Scheduled',
        microchip_status: 'Microchipped (All cats are microchipped)',
        vaccination_status: options.vaccinationStatus?.[1] || 'Partially Vaccinated',
        special_medical_needs: [],
        current_medication: '',
        energy_level: 'Medium',
        social_behavior: 'Friendly',
        ideal_home_type: options.homeType?.[0] || 'Apartment Friendly',
        handling_tolerance: 'Enjoys regular handling',
        daily_attention_requirement: 'Moderate',
        good_with_cats: options.goodWithCats?.[0] || 'Yes',
        good_with_dogs: options.goodWithDogs?.[2] || 'Unknown',
        good_with_children: options.goodWithChildren?.[3] || 'Unknown',
        diet_type: options.dietType?.[0] || 'Standard Dry + Wet',
        grooming_needs: options.groomingNeeds?.[0] || 'Low Maintenance',
        personality_traits: [],
        profile_tags: [],
        category_ids: [],
    });

    const medicalForm = useForm('admin.cats.medical.form', {
        record_date: new Date().toISOString().slice(0, 10),
        type: options.medicalRecordTypes?.[0] || 'Vaccination',
        description: '',
        vet_name: '',
        cost_aed: '0',
    });

    const categoryForm = useForm('admin.cats.category.form', {
        name: '',
        color: colorOptions[0] || '#9cd2c8',
    });

    const selectedMedicalRecords = useMemo(() => {
        if (!medicalModalCat) return [];
        return medicalModalCat.medical_records || [];
    }, [medicalModalCat]);

    const submitSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.cats.index'), { search: searchInput, status: filters.status || 'all' }, { preserveState: true, replace: true });
    };

    const changeStatus = (status) => {
        router.get(route('admin.cats.index'), { search: filters.search || '', status }, { preserveState: true, replace: true });
    };

    const toggleArrayField = (field, value) => {
        const current = addForm.data[field] || [];
        addForm.setData(
            field,
            current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
        );
    };

    const addCustomArrayField = (field, value) => {
        const current = addForm.data[field] || [];

        if (current.includes(value)) return;

        addForm.setData(field, [...current, value]);
    };

    const submitNewCat = (e) => {
        e.preventDefault();
        addForm.post(route('admin.cats.store'), {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowAddModal(false);
                addForm.reset();
            },
            onError: () => {
                setShowAddModal(true);
            },
        });
    };

    useEffect(() => {
        if (Object.keys(pageErrors).length > 0) {
            setShowAddModal(true);
        }
    }, [pageErrors, setShowAddModal]);

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files || []);
        addForm.setData('photos', files);
    };

    const toggleGalleryImage = (imageId) => {
        const current = addForm.data.gallery_image_ids || [];
        addForm.setData(
            'gallery_image_ids',
            current.includes(imageId) ? current.filter((id) => id !== imageId) : [...current, imageId],
        );
    };

    const switchImageSource = (source) => {
        addForm.setData('image_source', source);
        if (source === 'upload') {
            addForm.setData('gallery_image_ids', []);
        }
        if (source === 'gallery') {
            addForm.setData('photos', []);
        }
    };

    const openMedicalHistory = (cat) => {
        setMedicalModalCat(cat);
        medicalForm.reset();
        medicalForm.setData('record_date', new Date().toISOString().slice(0, 10));
        medicalForm.setData('type', options.medicalRecordTypes?.[0] || 'Vaccination');
    };

    const submitMedicalRecord = (e) => {
        e.preventDefault();
        if (!medicalModalCat) return;

        medicalForm.post(route('admin.cats.medical-records.store', medicalModalCat.id), {
            preserveScroll: true,
            onSuccess: () => {
                medicalForm.reset();
                medicalForm.setData('record_date', new Date().toISOString().slice(0, 10));
                medicalForm.setData('type', options.medicalRecordTypes?.[0] || 'Vaccination');
                setMedicalModalCat(null);
            },
        });
    };

    const deleteMedicalRecord = (catId, recordId) => {
        router.delete(route('admin.cats.medical-records.destroy', [catId, recordId]), { preserveScroll: true });
    };

    const deleteDuplicateListing = (cat) => {
        const confirmed = window.confirm(`Delete duplicate listing for ${cat.name}? This cannot be undone.`);

        if (!confirmed) return;

        router.delete(route('admin.cats.destroy', cat.id), {
            preserveScroll: true,
        });
    };

    const inputClass = (hasError) => `w-full rounded-xl border bg-white px-3 py-2.5 text-sm ${
        hasError ? 'border-red-500 focus:border-red-500' : 'border-[#e5d9d2]'
    }`;

    return (
        <AdminLayout
            title="All Cats"
            subtitle="Manage all rescued cats in the system"
            action={
                <button
                    type="button"
                    onClick={() => setShowAddModal(true)}
                    className="rounded-full bg-gradient-to-r from-[#f6b79f] to-[#9ecfc6] px-5 py-2 text-sm font-semibold text-[#2f1d15]"
                >
                    + Add New Cat
                </button>
            }
        >
            <section className="rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                    <form onSubmit={submitSearch} className="min-w-[240px] flex-1">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search by name or breed"
                            className="w-full rounded-xl border border-[#e5d9d2] bg-[#f4efec] px-4 py-2.5 text-sm focus:border-[#f08063] focus:outline-none"
                        />
                    </form>
                    <div className="flex flex-wrap gap-2">
                        {statusTabs.map((tab) => (
                            <button
                                key={tab.value}
                                type="button"
                                onClick={() => changeStatus(tab.value)}
                                className={`rounded-full px-4 py-2 text-xs font-medium ${
                                    (filters.status || 'all') === tab.value
                                        ? 'bg-gradient-to-r from-[#f8c6ac] to-[#9fd4ca] text-[#2f1d15]'
                                        : 'bg-[#eee7e2] text-[#6e615a]'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {cats.map((cat) => (
                        <article key={cat.id} className="overflow-hidden rounded-2xl border border-[#e3d9d3] bg-white">
                            <div className="relative h-48">
                                <img src={cat.photo_path || '/images/gallery-cat.png'} alt={cat.name} className="h-full w-full object-cover" />
                                <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${statusPillClass[cat.status] || 'bg-gray-200 text-gray-700'}`}>
                                    {cat.status.replace('_', ' ')}
                                </span>
                            </div>

                            <div className="p-4">
                                <div className="mb-2 flex items-start justify-between gap-3">
                                    <h3 className="text-2xl font-semibold">{cat.name}</h3>
                                    <div className="flex shrink-0 items-center gap-3">
                                        <Link href={route('admin.cats.show', cat.id)} className="text-xs text-[#7e726b] underline">
                                            Profile
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => deleteDuplicateListing(cat)}
                                            className="text-xs font-semibold text-red-600 underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs text-[#7f7570]">{cat.age_label || 'Age N/A'} - {cat.breed || 'Breed N/A'}</p>
                                <p className="mt-2 line-clamp-2 text-xs text-[#6e6561]">{cat.rescue_story || 'Rescue story not added yet.'}</p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {cat.categories?.map((category) => (
                                        <span key={category.id} className="rounded-full px-2.5 py-1 text-[11px]" style={{ backgroundColor: `${category.color}33`, color: '#5f5855' }}>
                                            {category.name}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-4 flex items-center justify-between text-xs text-[#8a807b]">
                                    <span>{cat.location || 'No location'}</span>
                                    <span>{cat.medical_records?.length || 0} recent medical records</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => openMedicalHistory(cat)}
                                className="w-full border-t border-[#ebe2dd] bg-[#f8f6f4] py-2 text-sm font-medium text-[#4f4642]"
                            >
                                View Medical History
                            </button>
                        </article>
                    ))}
                </div>
            </section>

            {showAddModal ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
                    <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-[#f8f6f4] shadow-2xl">
                        <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-[#f8c6ac] to-[#9fd4ca] px-6 py-4">
                            <h3 className="text-3xl font-semibold">Add New Cat</h3>
                            <button type="button" onClick={() => setShowAddModal(false)} className="text-xl">x</button>
                        </div>

                        <form onSubmit={submitNewCat} className="space-y-5 p-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <input className={inputClass(addForm.errors.name)} placeholder="Name" value={addForm.data.name} onChange={(e) => addForm.setData('name', e.target.value)} />
                                    <FieldError message={addForm.errors.name} />
                                </div>
                                <div>
                                    <select className={inputClass(addForm.errors.age_label)} value={addForm.data.age_label} onChange={(e) => addForm.setData('age_label', e.target.value)}>
                                        <option value="">Age Group</option>
                                        {options.age.map((item) => <option key={item} value={item}>{item}</option>)}
                                    </select>
                                    <FieldError message={addForm.errors.age_label} />
                                </div>
                                <div>
                                    <select className={inputClass(addForm.errors.gender)} value={addForm.data.gender} onChange={(e) => addForm.setData('gender', e.target.value)}>
                                        {options.gender.map((item) => <option key={item} value={item}>{item}</option>)}
                                    </select>
                                    <FieldError message={addForm.errors.gender} />
                                </div>
                                <div>
                                    <select className={inputClass(addForm.errors.breed)} value={addForm.data.breed} onChange={(e) => addForm.setData('breed', e.target.value)}>
                                        {options.breed.map((item) => <option key={item} value={item}>{item}</option>)}
                                    </select>
                                    <FieldError message={addForm.errors.breed} />
                                </div>
                                <div>
                                    <select className={inputClass(addForm.errors.status)} value={addForm.data.status} onChange={(e) => addForm.setData('status', e.target.value)}>
                                        {options.status.map((item) => <option key={item} value={item}>{item.replace('_', ' ')}</option>)}
                                    </select>
                                    <FieldError message={addForm.errors.status} />
                                </div>
                                <div>
                                    <select className={inputClass(addForm.errors.location)} value={addForm.data.location} onChange={(e) => addForm.setData('location', e.target.value)}>
                                        {catLocationOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                                    </select>
                                    <FieldError message={addForm.errors.location} />
                                </div>
                                <div>
                                    <input className={inputClass(addForm.errors.weight_kg)} placeholder="Weight (kg)" value={addForm.data.weight_kg} onChange={(e) => addForm.setData('weight_kg', e.target.value)} />
                                    <FieldError message={addForm.errors.weight_kg} />
                                </div>
                            </div>

                            <div className={`rounded-xl border bg-white p-3 ${addForm.errors.photos || addForm.errors['photos.0'] ? 'border-red-500' : 'border-[#e5d9d2]'}`}>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#6f5449]">
                                    Cat Photo Upload
                                </label>
                                <div className="mb-3 flex gap-2">
                                    <button type="button" onClick={() => switchImageSource('upload')} className={`rounded-full px-3 py-1 text-xs ${addForm.data.image_source === 'upload' ? 'bg-[#9cd2c8] text-[#18574a]' : 'bg-[#f1ece8] text-[#6f5449]'}`}>Upload</button>
                                    <button type="button" onClick={() => switchImageSource('gallery')} className={`rounded-full px-3 py-1 text-xs ${addForm.data.image_source === 'gallery' ? 'bg-[#9cd2c8] text-[#18574a]' : 'bg-[#f1ece8] text-[#6f5449]'}`}>Select From Gallery</button>
                                </div>

                                {addForm.data.image_source === 'upload' ? (
                                    <>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/png,image/jpeg,image/jpg,image/webp"
                                            onChange={handlePhotoChange}
                                            className="block w-full text-sm text-[#6e6561] file:mr-3 file:rounded-lg file:border-0 file:bg-[#9cd2c8] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#1f4d43]"
                                        />
                                        <p className="mt-2 text-xs text-[#8a807b]">
                                            Image will be saved in <code>public/images/cats/</code>
                                        </p>
                                        {addForm.data.photos.length > 0 && (
                                            <p className="mt-1 text-xs text-[#6e6561]">
                                                Selected: {addForm.data.photos.length} image(s)
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
                                        {galleryImages.map((image) => {
                                            const checked = addForm.data.gallery_image_ids.includes(image.id);
                                            return (
                                                <button key={image.id} type="button" onClick={() => toggleGalleryImage(image.id)} className={`overflow-hidden rounded-lg border-2 ${checked ? 'border-[#9cd2c8]' : 'border-transparent'}`}>
                                                    <img src={image.path} alt={image.type} className="h-20 w-full object-cover" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                                <FieldError message={addForm.errors.photos || addForm.errors['photos.0']} />
                            </div>

                            <div>
                                <textarea className={`h-24 w-full rounded-xl border bg-white px-3 py-2.5 text-sm ${addForm.errors.rescue_story ? 'border-red-500' : 'border-[#e5d9d2]'}`} placeholder="Rescue story" value={addForm.data.rescue_story} onChange={(e) => addForm.setData('rescue_story', e.target.value)} />
                                <FieldError message={addForm.errors.rescue_story} />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#6f5449]">
                                        FIV Status
                                    </label>
                                    <select className={inputClass(addForm.errors.fiv_status)} value={addForm.data.fiv_status} onChange={(e) => addForm.setData('fiv_status', e.target.value)}>{options.fivStatus.map((item) => <option key={item}>{item}</option>)}</select>
                                    <FieldError message={addForm.errors.fiv_status} />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#6f5449]">
                                        FeLV Status
                                    </label>
                                    <select className={inputClass(addForm.errors.felv_status)} value={addForm.data.felv_status} onChange={(e) => addForm.setData('felv_status', e.target.value)}>{options.felvStatus.map((item) => <option key={item}>{item}</option>)}</select>
                                    <FieldError message={addForm.errors.felv_status} />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#6f5449]">
                                        Vaccination Status
                                    </label>
                                    <select className={inputClass(addForm.errors.vaccination_status)} value={addForm.data.vaccination_status} onChange={(e) => addForm.setData('vaccination_status', e.target.value)}>{options.vaccinationStatus.map((item) => <option key={item}>{item}</option>)}</select>
                                    <FieldError message={addForm.errors.vaccination_status} />
                                </div>
                            </div>

                            <CheckboxList
                                title="Special Medical Needs"
                                items={options.specialMedicalNeeds}
                                selected={addForm.data.special_medical_needs}
                                onToggle={(item) => toggleArrayField('special_medical_needs', item)}
                                onAddCustom={(item) => addCustomArrayField('special_medical_needs', item)}
                            />
                            <CheckboxList
                                title="Personality Traits"
                                items={options.personalityTraits}
                                selected={addForm.data.personality_traits}
                                onToggle={(item) => toggleArrayField('personality_traits', item)}
                                onAddCustom={(item) => addCustomArrayField('personality_traits', item)}
                            />
                            <CheckboxList
                                title="Profile Tags"
                                items={options.profileTags}
                                selected={addForm.data.profile_tags}
                                onToggle={(item) => toggleArrayField('profile_tags', item)}
                                onAddCustom={(item) => addCustomArrayField('profile_tags', item)}
                            />

                            <CategoryPicker
                                categories={categories}
                                selected={addForm.data.category_ids}
                                onChange={(categoryIds) => addForm.setData('category_ids', categoryIds)}
                                categoryForm={categoryForm}
                                colorOptions={colorOptions}
                            />

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <button type="button" className="rounded-xl bg-[#e5e5e5] py-3 text-sm font-semibold" onClick={() => setShowAddModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="rounded-xl bg-gradient-to-r from-[#f6b79f] to-[#9ecfc6] py-3 text-sm font-semibold text-[#2f1d15]" disabled={addForm.processing}>
                                    {addForm.processing ? 'Adding...' : 'Add Cat'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}

            {medicalModalCat ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
                    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#f8f6f4] shadow-2xl">
                        <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-[#f8c6ac] to-[#9fd4ca] px-6 py-4">
                            <div>
                                <h3 className="text-3xl font-semibold">Medical History</h3>
                                <p className="text-sm">{medicalModalCat.name}</p>
                            </div>
                            <button type="button" className="text-xl" onClick={() => setMedicalModalCat(null)}>x</button>
                        </div>

                        <form onSubmit={submitMedicalRecord} className="space-y-4 p-6">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <input type="date" value={medicalForm.data.record_date} onChange={(e) => medicalForm.setData('record_date', e.target.value)} className="rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" />
                                <select value={medicalForm.data.type} onChange={(e) => medicalForm.setData('type', e.target.value)} className="rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm">{options.medicalRecordTypes.map((item) => <option key={item}>{item}</option>)}</select>
                                <input value={medicalForm.data.vet_name} onChange={(e) => medicalForm.setData('vet_name', e.target.value)} placeholder="Vet name" className="rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" />
                                <input value={medicalForm.data.cost_aed} onChange={(e) => medicalForm.setData('cost_aed', e.target.value)} placeholder="Cost (AED)" className="rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" />
                            </div>
                            <textarea value={medicalForm.data.description} onChange={(e) => medicalForm.setData('description', e.target.value)} placeholder="Description" className="h-24 w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm" />
                            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-[#f6b79f] to-[#9ecfc6] py-3 text-sm font-semibold text-[#2f1d15]" disabled={medicalForm.processing}>
                                {medicalForm.processing ? 'Adding...' : 'Add Record'}
                            </button>
                        </form>

                        <div className="space-y-3 px-6 pb-6">
                            {selectedMedicalRecords.map((record) => (
                                <article key={record.id} className="rounded-xl border border-[#e5d9d2] bg-white px-4 py-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-semibold">{record.type}</p>
                                            <p className="text-xs text-[#7f7570]">{formatDisplayDate(record.record_date)} - AED {Number(record.cost_aed || 0).toLocaleString()}</p>
                                            <p className="mt-1 text-xs text-[#6e6561]">{record.description || 'No description'}</p>
                                        </div>
                                        <button type="button" className="text-xs text-red-500" onClick={() => deleteMedicalRecord(medicalModalCat.id, record.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
        </AdminLayout>
    );
}
