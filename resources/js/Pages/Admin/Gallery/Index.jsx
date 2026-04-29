import Modal from '@/Components/Modal';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function GalleryIndex({ types, images }) {
    const [activeTab, setActiveTab] = useState('All');
    const [selectedType, setSelectedType] = useState(types[0] ?? 'Happy Cat');
    const [step, setStep] = useState(1);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const form = useForm({
        type: selectedType,
        photos: [],
    });

    const tabs = ['All', ...types];

    const filteredImages = useMemo(() => {
        if (activeTab === 'All') {
            return images;
        }

        return images.filter((img) => img.type === activeTab);
    }, [activeTab, images]);

    const openUploadModal = () => {
        const initialType = types[0] ?? 'Happy Cat';

        setStep(1);
        setSelectedType(initialType);
        form.clearErrors();
        form.setData({
            type: initialType,
            photos: [],
        });
        setShowUploadModal(true);
    };

    const closeUploadModal = () => {
        setShowUploadModal(false);
    };

    const proceedToUpload = () => {
        form.setData('type', selectedType);
        setStep(2);
    };

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.gallery.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                const uploadedType = form.data.type;
                form.reset('photos');
                setShowUploadModal(false);
                setStep(1);
                setActiveTab(uploadedType);
            },
        });
    };

    return (
        <AdminLayout
            title="Gallery"
            subtitle="Manage and upload gallery images"
            action={(
                <button
                    type="button"
                    onClick={openUploadModal}
                    className="rounded-xl bg-gradient-to-r from-[#f6b79f] to-[#9ecfc6] px-5 py-2 text-sm font-semibold text-[#2f1d15]"
                >
                    Upload New
                </button>
            )}
        >
            <section className="space-y-4 rounded-2xl border border-[#e7dfdb] bg-[#f8f6f4] p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                activeTab === tab
                                    ? 'bg-[#9cd2c8] text-[#1f453c]'
                                    : 'bg-[#ebe5e1] text-[#5f5855] hover:bg-[#e3dbd7]'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-5">
                    {filteredImages.map((img) => (
                        <div key={img.id} className="overflow-hidden rounded-2xl border border-[#eadfd8] bg-white">
                            <img src={img.path} alt={img.type} className="h-40 w-full object-cover" />
                            <div className="border-t border-[#f0e8e3] px-3 py-2">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#6e6561]">{img.type}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredImages.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#d8cbc5] bg-[#f3ebe6] px-4 py-8 text-center text-sm text-[#7a706c]">
                        No images found in this tab.
                    </div>
                ) : null}
            </section>

            <Modal show={showUploadModal} onClose={closeUploadModal} maxWidth="lg">
                <div className="bg-[#f8f6f4] p-5 sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-[#2f1d15]">
                            {step === 1 ? 'Step 1: Select Type' : 'Step 2: Upload Images'}
                        </h3>
                        <button type="button" onClick={closeUploadModal} className="text-sm font-medium text-[#7a706c] hover:text-[#2f1d15]">
                            Close
                        </button>
                    </div>

                    {step === 1 ? (
                        <div className="space-y-4">
                            <p className="text-sm text-[#6e6561]">Choose which tab/type these images belong to.</p>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                                {types.map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setSelectedType(type)}
                                        className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                                            selectedType === type
                                                ? 'border-[#9cd2c8] bg-[#dff2ed] text-[#1f453c]'
                                                : 'border-[#e5d9d2] bg-white text-[#5f5855]'
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={proceedToUpload}
                                    className="rounded-xl bg-gradient-to-r from-[#f6b79f] to-[#9ecfc6] px-5 py-2 text-sm font-semibold text-[#2f1d15]"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="space-y-4">
                            <p className="text-sm text-[#6e6561]">
                                Selected Type: <span className="font-semibold">{selectedType}</span>
                            </p>

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                multiple
                                onChange={(e) => form.setData('photos', Array.from(e.target.files || []))}
                                className="w-full rounded-xl border border-[#e5d9d2] bg-white px-3 py-2.5 text-sm"
                            />

                            {form.errors.type ? <p className="text-xs text-red-600">{form.errors.type}</p> : null}
                            {form.errors.photos ? <p className="text-xs text-red-600">{form.errors.photos}</p> : null}
                            {form.errors['photos.0'] ? <p className="text-xs text-red-600">{form.errors['photos.0']}</p> : null}

                            <div className="flex justify-between gap-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="rounded-xl border border-[#d8cbc5] bg-white px-5 py-2 text-sm font-semibold text-[#5f5855]"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="rounded-xl bg-gradient-to-r from-[#f6b79f] to-[#9ecfc6] px-5 py-2 text-sm font-semibold text-[#2f1d15]"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </Modal>
        </AdminLayout>
    );
}
