import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

const FILTER_KEYS = ['Breed', 'Age', 'Gender', 'Personality', 'Tags'];

export default function AvailableCats({ availableCats = [], initialSearchQuery = '' }) {
    const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
    const [selectedFilters, setSelectedFilters] = useState({});

    const dynamicFilters = useMemo(() => {
        const filterMap = {
            Breed: new Set(),
            Age: new Set(),
            Gender: new Set(),
            Personality: new Set(),
            Tags: new Set(),
        };

        for (const cat of availableCats) {
            if (cat?.breed) filterMap.Breed.add(cat.breed);
            if (cat?.age) filterMap.Age.add(cat.age);
            if (cat?.gender) filterMap.Gender.add(cat.gender);
            for (const trait of cat?.traits || []) filterMap.Personality.add(trait);
            for (const tag of cat?.tags || []) filterMap.Tags.add(tag);
        }

        return FILTER_KEYS.map((title) => ({
            title,
            options: Array.from(filterMap[title]).sort((a, b) =>
                a.localeCompare(b),
            ),
        })).filter((filter) => filter.options.length > 0);
    }, [availableCats]);

    const searchWords = useMemo(() => {
        const words = new Set();
        for (const filter of dynamicFilters) {
            for (const option of filter.options) {
                words.add(option);
            }
        }
        return Array.from(words).sort((a, b) => a.localeCompare(b));
    }, [dynamicFilters]);

    const filteredCats = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        return availableCats.filter((cat) => {
            const catFields = [
                cat?.name,
                cat?.breed,
                cat?.age,
                cat?.gender,
                ...(cat?.traits || []),
                ...(cat?.tags || []),
            ]
                .filter(Boolean)
                .map((value) => String(value).toLowerCase());

            const matchesSearch =
                normalizedSearch.length === 0 ||
                catFields.some((value) => value.includes(normalizedSearch));

            if (!matchesSearch) return false;

            for (const [title, selectedOptions] of Object.entries(
                selectedFilters,
            )) {
                if (!selectedOptions?.length) continue;

                let catValues = [];
                if (title === 'Breed') catValues = [cat?.breed];
                if (title === 'Age') catValues = [cat?.age];
                if (title === 'Gender') catValues = [cat?.gender];
                if (title === 'Personality') catValues = cat?.traits || [];
                if (title === 'Tags') catValues = cat?.tags || [];

                const matchesThisFilter = selectedOptions.some((option) =>
                    catValues.includes(option),
                );

                if (!matchesThisFilter) return false;
            }

            return true;
        });
    }, [availableCats, searchTerm, selectedFilters]);

    const toggleFilterOption = (filterTitle, option) => {
        setSelectedFilters((prev) => {
            const currentOptions = prev[filterTitle] || [];
            const nextOptions = currentOptions.includes(option)
                ? currentOptions.filter((item) => item !== option)
                : [...currentOptions, option];

            return {
                ...prev,
                [filterTitle]: nextOptions,
            };
        });
    };

    return (
        <AppLayout currentPath="/available-cats">
            <Head title="Available Cats - Dubai Street Kitties" />

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-b from-[#f2b7a7] to-[#9fcfc5] py-16 sm:py-20 lg:h-[400px] lg:py-0 text-center px-6 flex flex-col items-center justify-center">
                <div className="absolute bottom-0 left-0 w-[150px] md:w-[415px] "><img src="images/adopt-left.png" alt="Cat hero left" className="w-full h-auto" /></div>
                <div className="absolute -bottom-10 right-0 w-[150px] md:w-[415px] "><img src="images/adopt-right.png" alt="Cat hero right" className="w-full h-auto" /></div>
                
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-4">Adopt a Cat</h1>
                    <p className="text-sm md:text-base text-gray-700 font-medium max-w-lg mx-auto">
                        Find your perfect feline companion. Each cat has been vaccinated, sterilized, and microchipped.
                    </p>
                </div>
            </section>

            {/* MAIN CONTENT WITH SIDEBAR */}
            <section className="py-12 bg-[#F5EDE4]">
                <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row gap-10">
                    
                    {/* SIDEBAR FILTERS */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <div className="bg-white rounded-[32px] p-4 shadow-sm border border-gray-100 sticky top-24">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-6 h-6 text-[#f08063]"><img src="images/filters.svg" alt="" /></div>
                                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-[#F6EDE5] p-5 rounded-2xl">
                                    <h4 className="text-xs font-bold text-[#f08063] uppercase tracking-wider mb-4">Search</h4>
                                    <input
                                        type="search"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        list="cat-filter-words"
                                        placeholder="Search by name, breed, tags..."
                                        className="w-full rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-[#f08063]"
                                    />
                                    <datalist id="cat-filter-words">
                                        {searchWords.map((word) => (
                                            <option key={word} value={word} />
                                        ))}
                                    </datalist>
                                </div>

                                {dynamicFilters.map((filter) => (
                                    <div key={filter.title} className="bg-[#F6EDE5] p-5 rounded-2xl">
                                        <h4 className="text-xs font-bold text-[#f08063] uppercase tracking-wider mb-4">{filter.title}</h4>
                                        <div className="space-y-3">
                                            {filter.options.map((option) => (
                                                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={(selectedFilters[filter.title] || []).includes(option)}
                                                        onChange={() =>
                                                            toggleFilterOption(
                                                                filter.title,
                                                                option,
                                                            )
                                                        }
                                                        className="w-4 h-4 rounded border-gray-200 text-[#f08063] focus:ring-[#f08063]"
                                                    />
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* CAT LISTING GRID */}
                    <div className="flex-grow">
                        <div className="mb-8 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Showing {filteredCats.length} cats</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredCats.map((cat) => (
                                <div key={cat.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition group border border-gray-50">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                                        {cat.tags?.[0] && (
                                            <div className="absolute top-4 right-4 bg-[#8bcbbd] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                                                {cat.tags[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-2xl font-bold text-gray-900 mb-3">{cat.name}</h4>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="bg-[#f3f6f5] text-gray-500 text-[11px] font-bold px-3 py-1 rounded-full">{cat.age}</span>
                                            <span className="bg-[#f3f6f5] text-gray-500 text-[11px] font-bold px-3 py-1 rounded-full">{cat.gender}</span>
                                            <span className="bg-[#f3f6f5] text-gray-500 text-[11px] font-bold px-3 py-1 rounded-full">{cat.breed}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {(cat.tags || []).map(tag => (
                                                <span key={tag} className="text-[#f08063] text-[10px] font-bold px-3 py-1 rounded-full bg-[#fdf3f0]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <Link 
                                            href={route('cat-profile.show', cat.id)}
                                            className="inline-block w-full text-center bg-[#fcfcfc] border border-gray-100 text-gray-600 font-bold py-3 rounded-full text-sm hover:bg-[#f08063] hover:text-white hover:border-[#f08063] transition-all"
                                        >
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            {filteredCats.length === 0 && (
                                <div className="md:col-span-2 xl:col-span-3 rounded-2xl border border-gray-100 bg-white p-8 text-center text-gray-500">
                                    No cats match your search/filter.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* JOIN OUR MISSION */}
            <section className="py-24 bg-white text-center px-6">
                <div className="w-16 h-16 mx-auto text-[#f2b7a7] mb-8 opacity-90"><img src="images/2-User.svg" alt="" /></div>
                <h2 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-8 leading-tight">Join Our Mission</h2>
                <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                    Whether you adopt, donate, volunteer, or simply spread the word, every contribution makes a difference. Together, we can create a better future for Dubai's cats.
                </p>
            </section>
        </AppLayout>
    );
}
