import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
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

export default function CatProfile({ cat }) {
    const personality = (cat?.personality || []).slice(0, 4);
    const tags = cat?.tags || [];
    const goodWith = cat?.goodWith || {};
    const galleryImages = cat?.images?.length ? cat.images : [cat?.image, cat?.image, cat?.image].filter(Boolean);
    const defaultImage = galleryImages[0] || '/images/gallery-cat.png';
    const [selectedImage, setSelectedImage] = useState(defaultImage);

    useEffect(() => {
        setSelectedImage(defaultImage);
    }, [defaultImage]);

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
                            <div className="aspect-[4/4.1] overflow-hidden rounded-2xl">
                                <img
                                    src={selectedImage}
                                    alt={cat?.name || 'Cat'}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="mt-3 grid grid-cols-3 gap-2">
                                {galleryImages.slice(0, 3).map((imagePath, index) => (
                                    <button
                                        key={`${imagePath}-${index}`}
                                        type="button"
                                        onClick={() => setSelectedImage(imagePath)}
                                        className={`aspect-square overflow-hidden rounded-xl border-2 ${
                                            selectedImage === imagePath ? 'border-[#8ec8bf]' : 'border-transparent'
                                        }`}
                                    >
                                        <img
                                            src={imagePath}
                                            alt={`${cat?.name || 'Cat'} thumbnail ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-1">
                            <h1 className="text-[42px] font-semibold leading-tight text-[#1f1c1a]">{cat?.name || 'Cat'}</h1>

                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="rounded-full bg-[#f4dccc] px-4 py-1 text-xs text-[#7b5f50]">{cat?.age}</span>
                                <span className="rounded-full bg-[#cfe4e1] px-4 py-1 text-xs text-[#4d6f69]">{cat?.gender}</span>
                                <span className="rounded-full bg-[#f4dccc] px-4 py-1 text-xs text-[#7b5f50]">{cat?.breed}</span>
                            </div>

                            <div className="mt-4 grid grid-cols-2 rounded-xl bg-[#dadad6] px-4 py-3 text-sm text-[#1f1c1a]">
                                <div>
                                    <p className="text-[11px] text-[#7a7470]">Color</p>
                                    <p className="mt-1 font-medium">{cat?.color || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-[#7a7470]">Adoption Fee</p>
                                    <p className="mt-1 font-medium">{cat?.adoptionFee || 'Free'}</p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <h3 className="text-sm font-semibold text-[#2f2b28]">Personality</h3>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {personality.map((trait) => (
                                        <span key={trait} className="rounded-full bg-[#f3ddcf] px-4 py-1 text-xs text-[#7b5f50]">
                                            {trait}
                                        </span>
                                    ))}
                                    {personality.length === 0 && (
                                        <span className="rounded-full bg-[#ece2dc] px-4 py-1 text-xs text-[#7b5f50]">No personality tags</span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-5">
                                <h3 className="text-sm font-semibold text-[#2f2b28]">Story</h3>
                                <p className="mt-1 text-xs leading-relaxed text-[#6e6561]">{cat?.story}</p>
                            </div>

                            <div className="mt-5">
                                <h3 className="text-sm font-semibold text-[#2f2b28]">Medical summary</h3>
                                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    <div className="flex items-center gap-2 text-xs text-[#6e6561]">
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8ec8bf] text-white">✓</span>
                                        <span>{cat?.medicalSummary?.['Vaccination Status'] || 'Vaccination N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-[#6e6561]">
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8ec8bf] text-white">✓</span>
                                        <span>{cat?.medicalSummary?.['Spayed / Neutered'] || 'Spay/Neuter N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-[#6e6561]">
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8ec8bf] text-white">✓</span>
                                        <span>{cat?.medicalSummary?.Microchipped || 'Microchip N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                                <div className="flex-1 rounded-full bg-[#ece2dc] px-4 py-2 text-xs text-[#6e6561]">
                                    Health Notes: {cat?.medicalSummary?.['Current Medication'] || 'Healthy, no known issues'}
                                </div>
                                <a
                                    href={route('cat-profile.report', cat?.id)}
                                    className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-[#544c47] shadow-sm"
                                >
                                    Download Report
                                </a>
                            </div>

                            <div className="mt-5">
                                <h3 className="text-sm font-semibold text-[#2f2b28]">Good With</h3>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {Object.entries(goodWith).map(([label, value]) => (
                                        <span key={label} className="rounded-full bg-[#f3ddcf] px-6 py-1 text-xs text-[#7b5f50]">
                                            {label}: {value}
                                        </span>
                                    ))}
                                    {tags.map((tag) => (
                                        <span key={tag} className="rounded-full bg-[#d8ebe7] px-4 py-1 text-xs text-[#4d6f69]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button className="mt-6 w-full rounded-md bg-gradient-to-r from-[#f6b29b] to-[#8ec8bf] py-3 text-sm font-semibold text-[#2f2b28]">
                                Apply to Adopt {cat?.name}
                            </button>

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
