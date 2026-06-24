import { Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

function SocialIcon({ label }) {
    return (
        <button
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded-full border border-[#f2d9ce] text-[10px] font-semibold text-[#f0a78d]"
            aria-label={label}
        >
            {label}
        </button>
    );
}

function Badge({ label, value, tone = 'sand' }) {
    const styles = {
        sand: 'bg-[#f3ddcf] text-[#7b5f50]',
        mint: 'bg-[#d8ebe7] text-[#4d6f69]',
        cream: 'bg-[#ece2dc] text-[#7b5f50]',
        sage: 'bg-[#e7f0eb] text-[#3f5f53]',
    };

    return (
        <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium ${styles[tone] || styles.sand}`}>
            <span className="uppercase tracking-wider opacity-70">{label}</span>
            <span className="max-w-[18rem] truncate">{value}</span>
        </span>
    );
}

function ChipSection({ title, items, tone = 'sand' }) {
    if (!items.length) return null;

    const styles = {
        sand: 'bg-[#f3ddcf] text-[#7b5f50]',
        mint: 'bg-[#d8ebe7] text-[#4d6f69]',
        cream: 'bg-[#ece2dc] text-[#7b5f50]',
        sage: 'bg-[#e7f0eb] text-[#3f5f53]',
    };

    return (
        <div className="mt-5">
            <h3 className="text-sm font-semibold text-[#2f2b28]">{title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
                {items.map((item) => (
                    <span
                        key={item}
                        className={`rounded-full px-4 py-1 text-xs ${styles[tone] || styles.sand}`}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

function isPresent(value) {
    if (value === null || value === undefined) return false;
    const text = String(value).trim();
    if (!text) return false;
    return !['N/A', 'Age N/A', 'Gender N/A', 'Breed N/A', 'Unknown', 'None'].includes(text);
}

export default function CatProfile({ cat }) {
    const galleryImages = cat?.images?.length ? cat.images : [cat?.image, cat?.image, cat?.image].filter(Boolean);
    const defaultImage = galleryImages[0] || '/images/gallery-cat.png';
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedImage = galleryImages[selectedIndex] || defaultImage;
    const hasMultipleImages = galleryImages.length > 1;
    const thumbnailStart = Math.min(Math.max(selectedIndex - 1, 0), Math.max(galleryImages.length - 3, 0));
    const visibleThumbnails = galleryImages.slice(thumbnailStart, thumbnailStart + 3);

    const savedBadges = useMemo(() => {
        const badges = [
            { label: 'Status', value: cat?.status, tone: 'sage' },
            { label: 'Age', value: cat?.age },
            { label: 'Gender', value: cat?.gender },
            { label: 'Breed', value: cat?.breed },
            { label: 'Color', value: cat?.color },
            { label: 'Weight', value: cat?.weight },
            { label: 'Location', value: cat?.location },
            { label: 'FIV', value: cat?.fivStatus },
            { label: 'FeLV', value: cat?.felvStatus },
            { label: 'FIP', value: cat?.fipHistory },
            { label: 'Spay/Neuter', value: cat?.spayNeuterStatus },
            { label: 'Microchip', value: cat?.microchipStatus },
            { label: 'Vaccination', value: cat?.vaccinationStatus },
            { label: 'Current Medication', value: cat?.currentMedication },
        ];

        return badges.filter((item) => isPresent(item.value));
    }, [cat]);

    const specialMedicalNeeds = (cat?.specialMedicalNeeds || []).filter(isPresent);
    const personalityTraits = (cat?.personality || []).filter(isPresent);
    const profileTags = (cat?.tags || []).filter(isPresent);
    const categories = (cat?.categories || []).filter((category) => isPresent(category?.name));

    const showPreviousImage = () => {
        setSelectedIndex((currentIndex) => (currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1));
    };

    const showNextImage = () => {
        setSelectedIndex((currentIndex) => (currentIndex + 1) % galleryImages.length);
    };

    useEffect(() => {
        setSelectedIndex(0);
    }, [defaultImage, galleryImages.length]);

    return (
        <AppLayout currentPath="/adopt">
            <Head title={`${cat?.name || 'Cat'} Profile - Dubai Street Kitties`} />

            <section className="bg-[#f5efea] py-10">
                <div className="mx-auto max-w-[1160px] px-6">
                    <Link
                        href={route('cats.available')}
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#5f5855] transition-colors hover:text-black"
                    >
                        <span>&larr;</span> Back to All Cats
                    </Link>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[440px_minmax(0,1fr)]">
                        <div>
                            <div className="relative aspect-[4/4.1] overflow-hidden rounded-2xl">
                                <img src={selectedImage} alt={cat?.name || 'Cat'} className="h-full w-full object-cover" />
                                {hasMultipleImages && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={showPreviousImage}
                                            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl leading-none text-[#4f3126] shadow-sm transition hover:bg-white"
                                            aria-label="Show previous cat image"
                                        >
                                            &lsaquo;
                                        </button>
                                        <button
                                            type="button"
                                            onClick={showNextImage}
                                            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl leading-none text-[#4f3126] shadow-sm transition hover:bg-white"
                                            aria-label="Show next cat image"
                                        >
                                            &rsaquo;
                                        </button>
                                        <div className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold text-white">
                                            {selectedIndex + 1} / {galleryImages.length}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="mt-3 grid grid-cols-3 gap-2">
                                {visibleThumbnails.map((imagePath, index) => {
                                    const actualIndex = thumbnailStart + index;

                                    return (
                                        <button
                                            key={`${imagePath}-${actualIndex}`}
                                            type="button"
                                            onClick={() => setSelectedIndex(actualIndex)}
                                            className={`aspect-square overflow-hidden rounded-xl border-2 ${
                                                selectedIndex === actualIndex ? 'border-[#8ec8bf]' : 'border-transparent'
                                            }`}
                                        >
                                            <img
                                                src={imagePath}
                                                alt={`${cat?.name || 'Cat'} thumbnail ${actualIndex + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="pt-1">
                            <h1 className="text-[42px] font-semibold leading-tight text-[#1f1c1a]">{cat?.name || 'Cat'}</h1>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {isPresent(cat?.age) && <Badge label="Age" value={cat.age} />}
                                {isPresent(cat?.gender) && <Badge label="Gender" value={cat.gender} tone="mint" />}
                                {isPresent(cat?.breed) && <Badge label="Breed" value={cat.breed} />}
                            </div>

                            {isPresent(cat?.story) ? (
                                <div className="mt-5">
                                    <h3 className="text-sm font-semibold text-[#2f2b28]">Story</h3>
                                    <p className="mt-1 text-xs leading-relaxed text-[#6e6561]">{cat.story}</p>
                                </div>
                            ) : null}

                            <div className="mt-6 rounded-2xl border border-[#e8ddd5] bg-white p-5">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6f5449]">Saved Details</h3>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {savedBadges.map((item) => (
                                        <Badge key={item.label} label={item.label} value={item.value} tone={item.tone} />
                                    ))}
                                </div>
                            </div>

                            <ChipSection title="Special Medical Needs" items={specialMedicalNeeds} tone="cream" />
                            <ChipSection title="Personality Traits" items={personalityTraits} tone="sand" />
                            <ChipSection title="Profile Tags" items={profileTags} tone="mint" />

                            {categories.length > 0 ? (
                                <div className="mt-5">
                                    <h3 className="text-sm font-semibold text-[#2f2b28]">Categories</h3>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {categories.map((category) => (
                                            <span
                                                key={category.id}
                                                className="rounded-full px-4 py-1 text-xs font-medium"
                                                style={{
                                                    backgroundColor: `${category.color}33`,
                                                    color: '#5f5855',
                                                }}
                                            >
                                                {category.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href={route('cat-profile.report', cat?.id)}
                                    className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-[#544c47] shadow-sm"
                                >
                                    Download Report
                                </a>
                            </div>

                            <Link
                                href="/contact"
                                className="mt-6 block w-full rounded-md bg-gradient-to-r from-[#f6b29b] to-[#8ec8bf] py-3 text-center text-sm font-semibold text-[#2f2b28]"
                            >
                                Apply to Adopt {cat?.name}
                            </Link>

                            <p className="mt-3 text-center text-[10px] text-[#908784]">
                                All adoptions include full medical care and lifetime support
                            </p>

                            <div className="mt-4 flex justify-center gap-2">
                                <SocialIcon label="X" />
                                <SocialIcon label="f" />
                                <SocialIcon label="ig" />
                                <SocialIcon label="in" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
