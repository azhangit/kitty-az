import AdminLayout from '@/Layouts/AdminLayout';
import ManageableOptionSelect from '@/Components/Admin/ManageableOptionSelect';
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

function CheckboxList({ title, items = [], selected = [], onToggle, onAddCustom, onDelete }) {
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
                        <span
                            key={item}
                            className={`inline-flex items-center overflow-hidden rounded-full text-xs transition ${
                                checked ? 'bg-[#9cd2c8] text-[#18574a]' : 'bg-[#f1ece8] text-[#6f5449] hover:bg-[#e7ddd7]'
                            }`}
                        >
                            <button type="button" onClick={() => onToggle(item)} className="px-3 py-1">
                                {item}
                            </button>
                            {onDelete ? (
                                <button
                                    type="button"
                                    onClick={() => onDelete(item)}
                                    className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] leading-none transition hover:bg-red-100 hover:text-red-600"
                                    aria-label={`Delete ${item}`}
                                >
                                    x
                                </button>
                            ) : null}
                        </span>
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

function OptionDeleteModal({ option, onCancel, onConfirm }) {
    if (!option) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2f1d15]/35 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-[#f8f6f4] shadow-2xl">
                <div className="bg-gradient-to-r from-[#f8c6ac] to-[#9fd4ca] px-6 py-4">
                    <h3 className="text-2xl font-semibold text-[#2f1d15]">Delete Option?</h3>
                    <p className="mt-1 text-sm text-[#5f4034]">This action cannot be undone.</p>
                </div>
                <div className="space-y-4 p-6">
                    <p className="text-sm leading-relaxed text-[#5f5855]">
                        Delete <span className="font-semibold text-[#2f1d15]">"{option.value}"</span> from this option list?
                        This will also remove it from existing cats.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="rounded-xl bg-[#e5e5e5] py-3 text-sm font-semibold text-[#2f1d15]"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="rounded-xl bg-red-500 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FieldError({ message }) {
    if (!message) return null;
    return <p className="mt-1 text-xs font-medium text-red-600">{message}</p>;
}

function mergeSelectedFiles(currentFiles = [], newFiles = []) {
    const existingKeys = new Set(currentFiles.map((file) => `${file.name}-${file.size}-${file.lastModified}`));
    const uniqueNewFiles = newFiles.filter((file) => {
        const key = `${file.name}-${file.size}-${file.lastModified}`;

        if (existingKeys.has(key)) return false;

        existingKeys.add(key);
        return true;
    });

    return [...currentFiles, ...uniqueNewFiles];
}

function moveArrayItem(items, fromIndex, toIndex) {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return items;

    const nextItems = [...items];
    const [movedItem] = nextItems.splice(fromIndex, 1);
    nextItems.splice(toIndex, 0, movedItem);

    return nextItems;
}

function SelectedImagePreviewGrid({ files = [], onRemove, onMove }) {
    const [draggedIndex, setDraggedIndex] = useState(null);
    const previews = useMemo(
        () => files.map((file, index) => ({
            file,
            index,
            url: URL.createObjectURL(file),
        })),
        [files],
    );

    useEffect(() => () => {
        previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    }, [previews]);

    if (previews.length === 0) return null;

    return (
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {previews.map((preview) => (
                <div
                    key={`${preview.file.name}-${preview.file.lastModified}-${preview.index}`}
                    draggable
                    onDragStart={() => setDraggedIndex(preview.index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                        if (draggedIndex !== null) {
                            onMove(draggedIndex, preview.index);
                        }
                        setDraggedIndex(null);
                    }}
                    onDragEnd={() => setDraggedIndex(null)}
                    className={`group relative cursor-grab overflow-hidden rounded-lg border border-[#e5d9d2] active:cursor-grabbing ${draggedIndex === preview.index ? 'opacity-60' : ''}`}
                >
                    <img src={preview.url} alt={preview.file.name} className="h-24 w-full object-cover" />
                    <div className="absolute left-1.5 top-1.5 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-[#4f3126] shadow-sm">
                        Drag
                    </div>
                    <button
                        type="button"
                        onClick={() => onRemove(preview.index)}
                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-sm font-semibold leading-none text-[#4f3126] shadow-sm transition hover:bg-red-50 hover:text-red-600"
                        aria-label={`Remove ${preview.file.name}`}
                    >
                        x
                    </button>
                    <div className="absolute inset-x-0 bottom-0 bg-black/45 px-2 py-1 text-[11px] text-white">
                        <p className="truncate">{preview.file.name}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function SelectedGalleryPreviewGrid({ images = [], selectedIds = [], onRemove, onMove }) {
    const [draggedIndex, setDraggedIndex] = useState(null);
    const selectedImages = useMemo(
        () => selectedIds
            .map((id) => images.find((image) => image.id === id))
            .filter(Boolean),
        [images, selectedIds],
    );

    if (selectedImages.length === 0) return null;

    return (
        <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {selectedImages.map((image, index) => (
                <div
                    key={image.id}
                    draggable
                    onDragStart={() => setDraggedIndex(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                        if (draggedIndex !== null) {
                            onMove(draggedIndex, index);
                        }
                        setDraggedIndex(null);
                    }}
                    onDragEnd={() => setDraggedIndex(null)}
                    className={`relative cursor-grab overflow-hidden rounded-lg border-2 border-[#9cd2c8] active:cursor-grabbing ${draggedIndex === index ? 'opacity-60' : ''}`}
                >
                    <img src={image.path} alt={image.type} className="h-20 w-full object-cover" />
                    <div className="absolute left-1.5 top-1.5 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-[#4f3126] shadow-sm">
                        Drag
                    </div>
                    <button
                        type="button"
                        onClick={() => onRemove(image.id)}
                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-sm font-semibold leading-none text-[#4f3126] shadow-sm transition hover:bg-red-50 hover:text-red-600"
                        aria-label={`Remove ${image.type}`}
                    >
                        x
                    </button>
                </div>
            ))}
        </div>
    );
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
    const [pendingOptionDelete, setPendingOptionDelete] = useState(null);
    const [searchInput, setSearchInput] = useState(filters.search || '');

    const addForm = useForm('admin.cats.create.form', {
        name: '',
        age_label: '',
        gender: options.gender?.[0] || 'Male',
        breed: options.breed?.[0] || 'Domestic Short Hair',
        color: '',
        size: '',
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
        energy_level: '',
        social_behavior: '',
        ideal_home_type: '',
        handling_tolerance: '',
        daily_attention_requirement: '',
        good_with_cats: '',
        good_with_dogs: '',
        good_with_children: '',
        diet_type: '',
        grooming_needs: '',
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

    const deleteOption = (group, field, value) => {
        setPendingOptionDelete({ group, field, value });
    };

    const arrayOptionFields = ['special_medical_needs', 'personality_traits', 'profile_tags'];

    const addManagedOption = (group, field, value, form = addForm) => {
        router.post(route('admin.cat-options.store'), {
            group,
            value,
        }, {
            preserveScroll: true,
            onSuccess: () => form.setData(field, value),
        });
    };

    const renameManagedOption = (group, field, oldValue, newValue, form = addForm) => {
        router.put(route('admin.cat-options.update'), {
            group,
            old_value: oldValue,
            new_value: newValue,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                if (form.data[field] === oldValue) {
                    form.setData(field, newValue);
                }
            },
        });
    };

    const confirmDeleteOption = () => {
        if (!pendingOptionDelete) return;

        const { group, field, value } = pendingOptionDelete;

        if (arrayOptionFields.includes(field)) {
            addForm.setData(field, (addForm.data[field] || []).filter((item) => item !== value));
        } else if (field === 'medical_type') {
            if (medicalForm.data.type === value) {
                const nextType = (options.medicalRecordTypes || []).find((item) => item !== value) || '';
                medicalForm.setData('type', nextType);
            }
        } else if (addForm.data[field] === value) {
            const nextValue = (options[group] || []).find((item) => item !== value) || '';
            addForm.setData(field, nextValue);
        }

        setPendingOptionDelete(null);
        router.delete(route('admin.cat-options.destroy'), {
            data: { group, value },
            preserveScroll: true,
        });
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
        addForm.setData('photos', mergeSelectedFiles(addForm.data.photos, files));
        e.target.value = '';
    };

    const removeSelectedPhoto = (indexToRemove) => {
        addForm.setData('photos', addForm.data.photos.filter((_, index) => index !== indexToRemove));
    };

    const moveSelectedPhoto = (fromIndex, toIndex) => {
        addForm.setData('photos', moveArrayItem(addForm.data.photos, fromIndex, toIndex));
    };

    const toggleGalleryImage = (imageId) => {
        const current = addForm.data.gallery_image_ids || [];
        addForm.setData(
            'gallery_image_ids',
            current.includes(imageId) ? current.filter((id) => id !== imageId) : [...current, imageId],
        );
    };

    const moveSelectedGalleryImage = (fromIndex, toIndex) => {
        addForm.setData('gallery_image_ids', moveArrayItem(addForm.data.gallery_image_ids || [], fromIndex, toIndex));
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
                                    <ManageableOptionSelect
                                        value={addForm.data.age_label}
                                        items={options.age || []}
                                        onChange={(nextValue) => addForm.setData('age_label', nextValue)}
                                        onAdd={(value) => addManagedOption('age', 'age_label', value)}
                                        onRename={(oldValue, newValue) => renameManagedOption('age', 'age_label', oldValue, newValue)}
                                        onDelete={(item) => deleteOption('age', 'age_label', item)}
                                        className={inputClass(addForm.errors.age_label)}
                                        error={addForm.errors.age_label}
                                        placeholder="Age Group"
                                        addPlaceholder="Add age group"
                                    />
                                </div>
                                <div>
                                    <ManageableOptionSelect
                                        value={addForm.data.gender}
                                        items={options.gender || []}
                                        onChange={(nextValue) => addForm.setData('gender', nextValue)}
                                        onAdd={(value) => addManagedOption('gender', 'gender', value)}
                                        onRename={(oldValue, newValue) => renameManagedOption('gender', 'gender', oldValue, newValue)}
                                        onDelete={(item) => deleteOption('gender', 'gender', item)}
                                        className={inputClass(addForm.errors.gender)}
                                        error={addForm.errors.gender}
                                        placeholder="Gender"
                                        addPlaceholder="Add gender"
                                    />
                                </div>
                                <div>
                                    <ManageableOptionSelect
                                        value={addForm.data.breed}
                                        items={options.breed || []}
                                        onChange={(nextValue) => addForm.setData('breed', nextValue)}
                                        onAdd={(value) => addManagedOption('breed', 'breed', value)}
                                        onRename={(oldValue, newValue) => renameManagedOption('breed', 'breed', oldValue, newValue)}
                                        onDelete={(item) => deleteOption('breed', 'breed', item)}
                                        className={inputClass(addForm.errors.breed)}
                                        error={addForm.errors.breed}
                                        placeholder="Breed"
                                        addPlaceholder="Add breed"
                                    />
                                </div>
                                <div>
                                    <input
                                        className={inputClass(addForm.errors.color)}
                                        placeholder="Color"
                                        value={addForm.data.color}
                                        onChange={(e) => addForm.setData('color', e.target.value)}
                                    />
                                    <FieldError message={addForm.errors.color} />
                                </div>
                                <div>
                                    <ManageableOptionSelect
                                        value={addForm.data.status}
                                        items={options.status || []}
                                        onChange={(nextValue) => addForm.setData('status', nextValue)}
                                        onAdd={(value) => addManagedOption('status', 'status', value)}
                                        onRename={(oldValue, newValue) => renameManagedOption('status', 'status', oldValue, newValue)}
                                        onDelete={(item) => deleteOption('status', 'status', item)}
                                        className={inputClass(addForm.errors.status)}
                                        error={addForm.errors.status}
                                        placeholder="Status"
                                        addPlaceholder="Add status"
                                        formatLabel={(item) => item.replaceAll('_', ' ')}
                                    />
                                </div>
                                <div>
                                    <ManageableOptionSelect
                                        value={addForm.data.location}
                                        items={options.location || catLocationOptions}
                                        onChange={(nextValue) => addForm.setData('location', nextValue)}
                                        onAdd={(value) => addManagedOption('location', 'location', value)}
                                        onRename={(oldValue, newValue) => renameManagedOption('location', 'location', oldValue, newValue)}
                                        onDelete={(item) => deleteOption('location', 'location', item)}
                                        className={inputClass(addForm.errors.location)}
                                        error={addForm.errors.location}
                                        placeholder="Location"
                                        addPlaceholder="Add location"
                                    />
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
                                        <SelectedImagePreviewGrid files={addForm.data.photos} onRemove={removeSelectedPhoto} onMove={moveSelectedPhoto} />
                                        <p className="mt-2 text-xs text-[#8a807b]">
                                            Image will be saved in <code>public/images/cats/</code>
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <SelectedGalleryPreviewGrid images={galleryImages} selectedIds={addForm.data.gallery_image_ids} onRemove={toggleGalleryImage} onMove={moveSelectedGalleryImage} />
                                        <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
                                            {galleryImages.map((image) => {
                                                const checked = addForm.data.gallery_image_ids.includes(image.id);
                                                return (
                                                    <button key={image.id} type="button" onClick={() => toggleGalleryImage(image.id)} className={`relative overflow-hidden rounded-lg border-2 ${checked ? 'border-[#9cd2c8]' : 'border-transparent'}`}>
                                                        <img src={image.path} alt={image.type} className="h-20 w-full object-cover" />
                                                        {checked ? (
                                                            <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-sm font-semibold leading-none text-[#4f3126] shadow-sm">
                                                                x
                                                            </span>
                                                        ) : null}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </>
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
                                    <ManageableOptionSelect
                                        value={addForm.data.fiv_status}
                                        items={options.fivStatus || []}
                                        onChange={(nextValue) => addForm.setData('fiv_status', nextValue)}
                                        onAdd={(value) => addManagedOption('fivStatus', 'fiv_status', value)}
                                        onRename={(oldValue, newValue) => renameManagedOption('fivStatus', 'fiv_status', oldValue, newValue)}
                                        onDelete={(item) => deleteOption('fivStatus', 'fiv_status', item)}
                                        className={inputClass(addForm.errors.fiv_status)}
                                        error={addForm.errors.fiv_status}
                                        placeholder="FIV Status"
                                        addPlaceholder="Add FIV status"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#6f5449]">
                                        FeLV Status
                                    </label>
                                    <ManageableOptionSelect
                                        value={addForm.data.felv_status}
                                        items={options.felvStatus || []}
                                        onChange={(nextValue) => addForm.setData('felv_status', nextValue)}
                                        onAdd={(value) => addManagedOption('felvStatus', 'felv_status', value)}
                                        onRename={(oldValue, newValue) => renameManagedOption('felvStatus', 'felv_status', oldValue, newValue)}
                                        onDelete={(item) => deleteOption('felvStatus', 'felv_status', item)}
                                        className={inputClass(addForm.errors.felv_status)}
                                        error={addForm.errors.felv_status}
                                        placeholder="FeLV Status"
                                        addPlaceholder="Add FeLV status"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#6f5449]">
                                        FIP History
                                    </label>
                                    <ManageableOptionSelect
                                        value={addForm.data.fip_history}
                                        items={options.fipHistory || []}
                                        onChange={(nextValue) => addForm.setData('fip_history', nextValue)}
                                        onAdd={(value) => addManagedOption('fipHistory', 'fip_history', value)}
                                        onRename={(oldValue, newValue) => renameManagedOption('fipHistory', 'fip_history', oldValue, newValue)}
                                        onDelete={(item) => deleteOption('fipHistory', 'fip_history', item)}
                                        className={inputClass(addForm.errors.fip_history)}
                                        error={addForm.errors.fip_history}
                                        placeholder="FIP History"
                                        addPlaceholder="Add FIP history"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#6f5449]">
                                        Spay / Neuter Status
                                    </label>
                                    <ManageableOptionSelect
                                        value={addForm.data.spay_neuter_status}
                                        items={options.spayNeuterStatus || []}
                                        onChange={(nextValue) => addForm.setData('spay_neuter_status', nextValue)}
                                        onAdd={(value) => addManagedOption('spayNeuterStatus', 'spay_neuter_status', value)}
                                        onRename={(oldValue, newValue) => renameManagedOption('spayNeuterStatus', 'spay_neuter_status', oldValue, newValue)}
                                        onDelete={(item) => deleteOption('spayNeuterStatus', 'spay_neuter_status', item)}
                                        className={inputClass(addForm.errors.spay_neuter_status)}
                                        error={addForm.errors.spay_neuter_status}
                                        placeholder="Spay / Neuter"
                                        addPlaceholder="Add spay/neuter status"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#6f5449]">
                                        Microchip Status
                                    </label>
                                    <input className={inputClass(addForm.errors.microchip_status)} placeholder="Microchip status" value={addForm.data.microchip_status} onChange={(e) => addForm.setData('microchip_status', e.target.value)} />
                                    <FieldError message={addForm.errors.microchip_status} />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#6f5449]">
                                        Vaccination Status
                                    </label>
                                    <ManageableOptionSelect
                                        value={addForm.data.vaccination_status}
                                        items={options.vaccinationStatus || []}
                                        onChange={(nextValue) => addForm.setData('vaccination_status', nextValue)}
                                        onAdd={(value) => addManagedOption('vaccinationStatus', 'vaccination_status', value)}
                                        onRename={(oldValue, newValue) => renameManagedOption('vaccinationStatus', 'vaccination_status', oldValue, newValue)}
                                        onDelete={(item) => deleteOption('vaccinationStatus', 'vaccination_status', item)}
                                        className={inputClass(addForm.errors.vaccination_status)}
                                        error={addForm.errors.vaccination_status}
                                        placeholder="Vaccination Status"
                                        addPlaceholder="Add vaccination status"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#6f5449]">
                                        Good With Cats
                                    </label>
                                    <ManageableOptionSelect
                                        value={addForm.data.good_with_cats}
                                        items={options.goodWithCats || []}
                                        onChange={(nextValue) => addForm.setData('good_with_cats', nextValue)}
                                        onAdd={(value) => addManagedOption('goodWithCats', 'good_with_cats', value)}
                                        onRename={(oldValue, newValue) => renameManagedOption('goodWithCats', 'good_with_cats', oldValue, newValue)}
                                        onDelete={(item) => deleteOption('goodWithCats', 'good_with_cats', item)}
                                        className={inputClass(addForm.errors.good_with_cats)}
                                        error={addForm.errors.good_with_cats}
                                        placeholder="Good with cats"
                                        addPlaceholder="Add option"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#6f5449]">
                                        Good With Dogs
                                    </label>
                                    <ManageableOptionSelect
                                        value={addForm.data.good_with_dogs}
                                        items={options.goodWithDogs || []}
                                        onChange={(nextValue) => addForm.setData('good_with_dogs', nextValue)}
                                        onAdd={(value) => addManagedOption('goodWithDogs', 'good_with_dogs', value)}
                                        onRename={(oldValue, newValue) => renameManagedOption('goodWithDogs', 'good_with_dogs', oldValue, newValue)}
                                        onDelete={(item) => deleteOption('goodWithDogs', 'good_with_dogs', item)}
                                        className={inputClass(addForm.errors.good_with_dogs)}
                                        error={addForm.errors.good_with_dogs}
                                        placeholder="Good with dogs"
                                        addPlaceholder="Add option"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#6f5449]">
                                        Good With Children
                                    </label>
                                    <ManageableOptionSelect
                                        value={addForm.data.good_with_children}
                                        items={options.goodWithChildren || []}
                                        onChange={(nextValue) => addForm.setData('good_with_children', nextValue)}
                                        onAdd={(value) => addManagedOption('goodWithChildren', 'good_with_children', value)}
                                        onRename={(oldValue, newValue) => renameManagedOption('goodWithChildren', 'good_with_children', oldValue, newValue)}
                                        onDelete={(item) => deleteOption('goodWithChildren', 'good_with_children', item)}
                                        className={inputClass(addForm.errors.good_with_children)}
                                        error={addForm.errors.good_with_children}
                                        placeholder="Good with children"
                                        addPlaceholder="Add option"
                                    />
                                </div>
                            </div>

                            <CheckboxList
                                title="Special Medical Needs"
                                items={options.specialMedicalNeeds}
                                selected={addForm.data.special_medical_needs}
                                onToggle={(item) => toggleArrayField('special_medical_needs', item)}
                                onAddCustom={(item) => addCustomArrayField('special_medical_needs', item)}
                                onDelete={(item) => deleteOption('specialMedicalNeeds', 'special_medical_needs', item)}
                            />
                            <CheckboxList
                                title="Personality Traits"
                                items={options.personalityTraits}
                                selected={addForm.data.personality_traits}
                                onToggle={(item) => toggleArrayField('personality_traits', item)}
                                onAddCustom={(item) => addCustomArrayField('personality_traits', item)}
                                onDelete={(item) => deleteOption('personalityTraits', 'personality_traits', item)}
                            />
                            <CheckboxList
                                title="Profile Tags"
                                items={options.profileTags}
                                selected={addForm.data.profile_tags}
                                onToggle={(item) => toggleArrayField('profile_tags', item)}
                                onAddCustom={(item) => addCustomArrayField('profile_tags', item)}
                                onDelete={(item) => deleteOption('profileTags', 'profile_tags', item)}
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
                                <ManageableOptionSelect
                                    value={medicalForm.data.type}
                                    items={options.medicalRecordTypes || []}
                                    onChange={(nextValue) => medicalForm.setData('type', nextValue)}
                                    onAdd={(value) => addManagedOption('medicalRecordTypes', 'type', value, medicalForm)}
                                    onRename={(oldValue, newValue) => renameManagedOption('medicalRecordTypes', 'type', oldValue, newValue, medicalForm)}
                                    onDelete={(item) => deleteOption('medicalRecordTypes', 'medical_type', item)}
                                    className="rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm"
                                    placeholder="Record type"
                                    addPlaceholder="Add record type"
                                />
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

            <OptionDeleteModal
                option={pendingOptionDelete}
                onCancel={() => setPendingOptionDelete(null)}
                onConfirm={confirmDeleteOption}
            />
        </AdminLayout>
    );
}
