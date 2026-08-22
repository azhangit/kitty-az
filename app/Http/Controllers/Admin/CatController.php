<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cat;
use App\Models\Category;
use App\Models\GalleryImage;
use App\Models\MedicalRecord;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CatController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();
        $status = $request->string('status')->toString();

        $cats = Cat::query()
            ->with(['categories', 'medicalRecords' => fn ($q) => $q->latest('record_date')->limit(1)])
            ->when($search, function ($query, $searchTerm) {
                $query->where(function ($innerQuery) use ($searchTerm) {
                    $innerQuery
                        ->where('name', 'like', "%{$searchTerm}%")
                        ->orWhere('breed', 'like', "%{$searchTerm}%");
                });
            })
            ->when($status && $status !== 'all', fn ($query) => $query->where('status', $status))
            ->latest()
            ->get();

        return Inertia::render('Admin/Cats/Index', [
            'cats' => $cats,
            'categories' => Category::orderBy('name')->get(),
            'galleryImages' => GalleryImage::query()
                ->latest('id')
                ->get(['id', 'path', 'type']),
            'filters' => [
                'search' => $search,
                'status' => $status ?: 'all',
            ],
            'options' => $this->options(),
            'colorOptions' => $this->colorOptions(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'age_label' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:255'],
            'breed' => ['nullable', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:255'],
            'size' => ['nullable', 'string', 'max:255'],
            'weight_kg' => ['nullable', 'numeric', 'min:0'],
            'status' => ['required', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:255'],
            'rescue_story' => ['nullable', 'string'],
            'photo_path' => ['nullable', 'string', 'max:2048'],
            'photos' => ['nullable', 'array'],
            'photos.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'gallery_image_ids' => ['nullable', 'array'],
            'gallery_image_ids.*' => ['integer', 'exists:gallery_images,id'],

            'fiv_status' => ['nullable', 'string', 'max:255'],
            'felv_status' => ['nullable', 'string', 'max:255'],
            'fip_history' => ['nullable', 'string', 'max:255'],
            'spay_neuter_status' => ['nullable', 'string', 'max:255'],
            'microchip_status' => ['nullable', 'string', 'max:255'],
            'vaccination_status' => ['nullable', 'string', 'max:255'],
            'special_medical_needs' => ['nullable', 'array'],
            'special_medical_needs.*' => ['string', 'max:255'],
            'current_medication' => ['nullable', 'string'],

            'energy_level' => ['nullable', 'string', 'max:255'],
            'social_behavior' => ['nullable', 'string', 'max:255'],
            'ideal_home_type' => ['nullable', 'string', 'max:255'],
            'handling_tolerance' => ['nullable', 'string', 'max:255'],
            'daily_attention_requirement' => ['nullable', 'string', 'max:255'],

            'good_with_cats' => ['nullable', 'string', 'max:255'],
            'good_with_dogs' => ['nullable', 'string', 'max:255'],
            'good_with_children' => ['nullable', 'string', 'max:255'],
            'diet_type' => ['nullable', 'string', 'max:255'],
            'grooming_needs' => ['nullable', 'string', 'max:255'],
            'personality_traits' => ['nullable', 'array'],
            'personality_traits.*' => ['string', 'max:255'],
            'profile_tags' => ['nullable', 'array'],
            'profile_tags.*' => ['string', 'max:255'],
            'category_ids' => ['nullable', 'array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
        ]);

        $hasUploads = count($request->file('photos', [])) > 0;
        $selectedGalleryIds = $request->input('gallery_image_ids', []);
        if (! $hasUploads && empty($selectedGalleryIds)) {
            return back()->withErrors([
                'photos' => 'Please upload images or select from gallery.',
            ])->withInput();
        }

        $categoryIds = $validated['category_ids'] ?? [];
        $photoFiles = $request->file('photos', []);
        $selectedGalleryPaths = $this->galleryPathsInRequestOrder($selectedGalleryIds);
        unset($validated['category_ids']);
        unset($validated['photos']);
        unset($validated['gallery_image_ids']);

        $uploadedPaths = [];

        $destination = public_path('images/cats');
        if (! is_dir($destination)) {
            mkdir($destination, 0755, true);
        }

        foreach ($photoFiles as $photoFile) {
            $filename = Str::uuid()->toString() . '.' . $photoFile->getClientOriginalExtension();
            $photoFile->move($destination, $filename);
            $uploadedPaths[] = '/images/cats/' . $filename;
        }

        $allImagePaths = array_values(array_unique(array_merge($selectedGalleryPaths, $uploadedPaths)));
        $validated['photo_path'] = $allImagePaths[0] ?? null;

        $cat = Cat::create($validated);
        $cat->categories()->sync($categoryIds);

        if (! empty($allImagePaths)) {
            $cat->images()->createMany(
                collect($allImagePaths)
                    ->values()
                    ->map(fn (string $path, int $index) => [
                        'path' => $path,
                        'sort_order' => $index,
                    ])
                    ->all(),
            );
        }

        return back()->with('success', 'Cat created successfully.');
    }

    public function show(Cat $cat): Response
    {
        $cat->load(['categories', 'medicalRecords', 'images']);
        $this->ensureCatHasImageRecords($cat);

        return Inertia::render('Admin/Cats/Show', [
            'cat' => $cat->fresh(['categories', 'medicalRecords', 'images']),
            'categories' => Category::orderBy('name')->get(),
            'galleryImages' => GalleryImage::query()
                ->latest('id')
                ->get(['id', 'path', 'type']),
            'options' => $this->options(),
            'colorOptions' => $this->colorOptions(),
        ]);
    }

    public function update(Request $request, Cat $cat): RedirectResponse
    {
        $this->ensureCatHasImageRecords($cat);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'age_label' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:255'],
            'breed' => ['nullable', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:255'],
            'size' => ['nullable', 'string', 'max:255'],
            'weight_kg' => ['nullable', 'numeric', 'min:0'],
            'status' => ['required', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:255'],
            'rescue_story' => ['nullable', 'string'],
            'photo_path' => ['nullable', 'string', 'max:2048'],
            'photos' => ['nullable', 'array'],
            'photos.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'gallery_image_ids' => ['nullable', 'array'],
            'gallery_image_ids.*' => ['integer', 'exists:gallery_images,id'],
            'existing_image_ids' => ['nullable', 'array'],
            'existing_image_ids.*' => ['integer'],

            'fiv_status' => ['nullable', 'string', 'max:255'],
            'felv_status' => ['nullable', 'string', 'max:255'],
            'fip_history' => ['nullable', 'string', 'max:255'],
            'spay_neuter_status' => ['nullable', 'string', 'max:255'],
            'microchip_status' => ['nullable', 'string', 'max:255'],
            'vaccination_status' => ['nullable', 'string', 'max:255'],
            'special_medical_needs' => ['nullable', 'array'],
            'special_medical_needs.*' => ['string', 'max:255'],
            'current_medication' => ['nullable', 'string'],

            'energy_level' => ['nullable', 'string', 'max:255'],
            'social_behavior' => ['nullable', 'string', 'max:255'],
            'ideal_home_type' => ['nullable', 'string', 'max:255'],
            'handling_tolerance' => ['nullable', 'string', 'max:255'],
            'daily_attention_requirement' => ['nullable', 'string', 'max:255'],

            'good_with_cats' => ['nullable', 'string', 'max:255'],
            'good_with_dogs' => ['nullable', 'string', 'max:255'],
            'good_with_children' => ['nullable', 'string', 'max:255'],
            'diet_type' => ['nullable', 'string', 'max:255'],
            'grooming_needs' => ['nullable', 'string', 'max:255'],
            'personality_traits' => ['nullable', 'array'],
            'personality_traits.*' => ['string', 'max:255'],
            'profile_tags' => ['nullable', 'array'],
            'profile_tags.*' => ['string', 'max:255'],
            'category_ids' => ['nullable', 'array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
        ]);

        $categoryIds = $validated['category_ids'] ?? [];
        $photoFiles = $request->file('photos', []);
        $selectedGalleryPaths = $this->galleryPathsInRequestOrder($request->input('gallery_image_ids', []));
        $existingImageIds = collect($request->input('existing_image_ids', []))
            ->map(fn ($id) => (int) $id)
            ->filter()
            ->values()
            ->all();

        // Only keep IDs that actually belong to this cat.
        $ownedImageIds = $cat->images()->pluck('id')->all();
        $existingImageIds = array_values(array_intersect($existingImageIds, $ownedImageIds));
        unset($validated['category_ids']);
        unset($validated['photos']);
        unset($validated['gallery_image_ids']);
        unset($validated['existing_image_ids']);

        $cat->update($validated);
        $cat->categories()->sync($categoryIds);

        // Keep only selected existing images and preserve their order.
        $imagesToDelete = empty($existingImageIds)
            ? $cat->images()->get()
            : $cat->images()->whereNotIn('id', $existingImageIds)->get();

        foreach ($imagesToDelete as $image) {
            $this->deleteCatImageFileIfOwned($image->path);
            $image->delete();
        }

        foreach ($existingImageIds as $index => $imageId) {
            $cat->images()
                ->where('id', $imageId)
                ->update(['sort_order' => $index]);
        }

        $keptPaths = $cat->images()
            ->orderBy('sort_order')
            ->pluck('path')
            ->all();

        $destination = public_path('images/cats');
        if (! is_dir($destination)) {
            mkdir($destination, 0755, true);
        }

        $uploadedPaths = [];
        foreach ($photoFiles as $photoFile) {
            $filename = Str::uuid()->toString() . '.' . $photoFile->getClientOriginalExtension();
            $photoFile->move($destination, $filename);
            $uploadedPaths[] = '/images/cats/' . $filename;
        }

        $allNewPaths = array_values(array_unique(array_diff(
            array_merge($selectedGalleryPaths, $uploadedPaths),
            $keptPaths,
        )));

        $nextSortOrder = count($existingImageIds);
        if (! empty($allNewPaths)) {
            $cat->images()->createMany(
                collect($allNewPaths)
                    ->values()
                    ->map(fn (string $path, int $index) => [
                        'path' => $path,
                        'sort_order' => $nextSortOrder + $index,
                    ])
                    ->all(),
            );
        }

        $firstPath = $cat->images()->orderBy('sort_order')->value('path');
        $cat->update(['photo_path' => $firstPath]);

        return back()->with('success', 'Cat updated successfully.');
    }

    public function destroy(Cat $cat): RedirectResponse
    {
        $cat->delete();

        return redirect()
            ->route('admin.cats.index')
            ->with('success', 'Duplicate cat listing deleted.');
    }

    public function storeMedicalRecord(Request $request, Cat $cat): RedirectResponse
    {
        $validated = $request->validate([
            'record_date' => ['required', 'date'],
            'type' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'vet_name' => ['nullable', 'string', 'max:255'],
            'cost_aed' => ['nullable', 'numeric', 'min:0'],
        ]);

        $cat->medicalRecords()->create($validated);

        return back()->with('success', 'Medical record added.');
    }

    public function destroyMedicalRecord(Cat $cat, MedicalRecord $medicalRecord): RedirectResponse
    {
        if ($medicalRecord->cat_id !== $cat->id) {
            abort(404);
        }

        $medicalRecord->delete();

        return back()->with('success', 'Medical record removed.');
    }

    public function storeOption(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'group' => ['required', 'string', 'in:'.$this->manageableOptionGroupsRule()],
            'value' => ['required', 'string', 'max:255'],
        ]);

        $group = $validated['group'];
        $value = trim($validated['value']);

        if ($value === '') {
            return back()->withErrors(['value' => 'Option value is required.']);
        }

        $currentOptions = collect($this->options()[$group] ?? []);
        $exists = $currentOptions->contains(
            fn (string $option) => strcasecmp($option, $value) === 0
        );

        if ($exists) {
            return back()->withErrors(['value' => 'This option already exists.']);
        }

        $addedOptions = $this->addedOptions();
        $groupAdditions = collect($addedOptions[$group] ?? [])
            ->reject(fn (string $option) => strcasecmp($option, $value) === 0)
            ->values()
            ->all();
        $groupAdditions[] = $value;
        $addedOptions[$group] = $groupAdditions;

        // If it was previously deleted, restore it by removing from deletions.
        $deletedOptions = $this->deletedOptions();
        if (! empty($deletedOptions[$group])) {
            $deletedOptions[$group] = collect($deletedOptions[$group])
                ->reject(fn (string $option) => strcasecmp($option, $value) === 0)
                ->values()
                ->all();
            Storage::disk('local')->put('admin-option-deletions.json', json_encode($deletedOptions, JSON_PRETTY_PRINT));
        }

        Storage::disk('local')->put('admin-option-additions.json', json_encode($addedOptions, JSON_PRETTY_PRINT));

        return back()->with('success', 'Option added successfully.');
    }

    public function updateOption(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'group' => ['required', 'string', 'in:'.$this->manageableOptionGroupsRule()],
            'old_value' => ['required', 'string', 'max:255'],
            'new_value' => ['required', 'string', 'max:255'],
        ]);

        $group = $validated['group'];
        $oldValue = trim($validated['old_value']);
        $newValue = trim($validated['new_value']);

        if ($newValue === '') {
            return back()->withErrors(['new_value' => 'Option value is required.']);
        }

        $currentOptions = collect($this->options()[$group] ?? []);
        $oldExists = $currentOptions->contains(fn (string $option) => $option === $oldValue);

        if (! $oldExists) {
            return back()->withErrors(['old_value' => 'Option not found.']);
        }

        $duplicate = $currentOptions->contains(
            fn (string $option) => $option !== $oldValue && strcasecmp($option, $newValue) === 0
        );

        if ($duplicate) {
            return back()->withErrors(['new_value' => 'This option already exists.']);
        }

        if (strcasecmp($oldValue, $newValue) === 0 && $oldValue === $newValue) {
            return back()->with('success', 'Option updated successfully.');
        }

        $addedOptions = $this->addedOptions();
        $groupAdditions = collect($addedOptions[$group] ?? [])
            ->map(fn (string $option) => $option === $oldValue ? $newValue : $option)
            ->reject(fn (string $option) => strcasecmp($option, $oldValue) === 0 && $option !== $newValue)
            ->unique(fn (string $option) => strtolower($option))
            ->values()
            ->all();

        // Default options are not stored in additions; renaming them means
        // delete the old default and add the new label.
        $wasCustom = collect($addedOptions[$group] ?? [])->contains($oldValue);
        if (! $wasCustom) {
            $deletedOptions = $this->deletedOptions();
            $deletedOptions[$group] = array_values(array_unique([
                ...(array) ($deletedOptions[$group] ?? []),
                $oldValue,
            ]));
            Storage::disk('local')->put('admin-option-deletions.json', json_encode($deletedOptions, JSON_PRETTY_PRINT));

            if (! collect($groupAdditions)->contains(fn (string $option) => strcasecmp($option, $newValue) === 0)) {
                $groupAdditions[] = $newValue;
            }
        }

        $addedOptions[$group] = $groupAdditions;
        Storage::disk('local')->put('admin-option-additions.json', json_encode($addedOptions, JSON_PRETTY_PRINT));

        $this->syncOptionValueAcrossRecords($group, $oldValue, $newValue);

        return back()->with('success', 'Option updated successfully.');
    }

    public function destroyOption(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'group' => ['required', 'string', 'in:'.$this->manageableOptionGroupsRule().',specialMedicalNeeds,personalityTraits,profileTags'],
            'value' => ['required', 'string', 'max:255'],
        ]);

        $group = $validated['group'];
        $value = $validated['value'];
        $deletedOptions = $this->deletedOptions();
        $deletedOptions[$group] = array_values(array_unique([...(array) ($deletedOptions[$group] ?? []), $value]));

        Storage::disk('local')->put('admin-option-deletions.json', json_encode($deletedOptions, JSON_PRETTY_PRINT));

        // Also remove from custom additions if present.
        $addedOptions = $this->addedOptions();
        if (! empty($addedOptions[$group])) {
            $addedOptions[$group] = collect($addedOptions[$group])
                ->reject(fn (string $option) => $option === $value)
                ->values()
                ->all();
            Storage::disk('local')->put('admin-option-additions.json', json_encode($addedOptions, JSON_PRETTY_PRINT));
        }

        $jsonField = [
            'specialMedicalNeeds' => 'special_medical_needs',
            'personalityTraits' => 'personality_traits',
            'profileTags' => 'profile_tags',
        ][$group] ?? null;

        if ($jsonField) {
            Cat::query()
                ->whereJsonContains($jsonField, $value)
                ->get([$jsonField, 'id'])
                ->each(function (Cat $cat) use ($jsonField, $value): void {
                    $cat->update([
                        $jsonField => collect($cat->{$jsonField} ?: [])
                            ->reject(fn ($item) => $item === $value)
                            ->values()
                            ->all(),
                    ]);
                });

            return back()->with('success', 'Option deleted successfully.');
        }

        $this->syncOptionValueAcrossRecords($group, $value, null);

        return back()->with('success', 'Option deleted successfully.');
    }

    private function manageableOptionGroups(): array
    {
        return [
            'status',
            'breed',
            'gender',
            'age',
            'location',
            'size',
            'fivStatus',
            'felvStatus',
            'fipHistory',
            'vaccinationStatus',
            'spayNeuterStatus',
            'goodWithCats',
            'goodWithDogs',
            'goodWithChildren',
            'homeType',
            'dietType',
            'groomingNeeds',
            'medicalRecordTypes',
        ];
    }

    private function manageableOptionGroupsRule(): string
    {
        return implode(',', $this->manageableOptionGroups());
    }

    private function optionColumnMap(): array
    {
        return [
            'breed' => 'breed',
            'age' => 'age_label',
            'gender' => 'gender',
            'status' => 'status',
            'location' => 'location',
            'size' => 'size',
            'fivStatus' => 'fiv_status',
            'felvStatus' => 'felv_status',
            'fipHistory' => 'fip_history',
            'vaccinationStatus' => 'vaccination_status',
            'spayNeuterStatus' => 'spay_neuter_status',
            'goodWithCats' => 'good_with_cats',
            'goodWithDogs' => 'good_with_dogs',
            'goodWithChildren' => 'good_with_children',
            'homeType' => 'ideal_home_type',
            'dietType' => 'diet_type',
            'groomingNeeds' => 'grooming_needs',
        ];
    }

    private function syncOptionValueAcrossRecords(string $group, string $oldValue, ?string $newValue): void
    {
        if ($group === 'medicalRecordTypes') {
            MedicalRecord::query()
                ->where('type', $oldValue)
                ->update(['type' => $newValue]);

            return;
        }

        $column = $this->optionColumnMap()[$group] ?? null;
        if (! $column) {
            return;
        }

        Cat::query()
            ->where($column, $oldValue)
            ->update([$column => $newValue]);
    }

    private function options(): array
    {
        $options = [
            'status' => ['available', 'adopted', 'fostered', 'medical_care'],
            'breed' => [
                'Domestic Short Hair',
                'Domestic Long Hair',
                'Persian Mix',
                'Siamese Mix',
                'Ragdoll',
                'Maine Coon Mix',
                'Unique',
                'Fluffy',
            ],
            'gender' => ['Male', 'Female'],
            'age' => [
                'Kitten (0-6 months)',
                'Junior (6-12 months)',
                'Young Adult (1-3 years)',
                'Adult (3-7 years)',
                'Senior (7+ years)',
            ],
            'location' => ['Sanctuary resident', 'Foster care', 'Rehome'],
            'size' => ['Small', 'Medium', 'Large'],
            'fivStatus' => ['Negative', 'Positive', 'Pending Test'],
            'felvStatus' => ['Negative', 'Positive', 'Pending Test'],
            'fipHistory' => ['Never Diagnosed', 'Successfully Treated (Recovered)', 'Under Treatment'],
            'vaccinationStatus' => ['Fully Vaccinated', 'Partially Vaccinated', 'Kitten Protocol Ongoing'],
            'spayNeuterStatus' => ['Spayed', 'Neutered', 'Scheduled'],
            'specialMedicalNeeds' => [
                'None',
                'Liver Support',
                'Kidney Support',
                'Immune Support',
                'On Special Diet',
                'Special Diet',
                'Ongoing Medication',
                'Under Treatment',
                'Recovery Care',
                'Senior Care',
                'Medical Monitoring',
                'Skin Allergies',
                'Dermatitis',
                'Sensitive Skin',
                'Ringworm Recovery',
                'Hair Regrowth Treatment',
                'Chronic Flu',
                'Respiratory Support',
                'Sensitive Immune System',
                'Frequent Sneezing',
                'Chronic Nasal Discharge',
                'Diabetic',
                'Former Diabetic',
                'Insulin Support',
                'Weight Management',
                'Sensitive Stomach',
                'Digestive Support',
                'Food Sensitivities',
                'Special Needs',
                'Mobility Support',
                'Paralysis Care',
                'Wheelchair Cat',
                'Requires Daily Medication',
                'Needs Bladder Expression',
                'Bladder Expression Needed',
                'Paralyzed (Partial)',
                'Paralyzed (Full)',
                'Neurological Condition',
                'Vision Impaired',
                'Hearing Impaired',
                'Former FIP Case',
                'FIV Positive',
                'FIP Survivor',
                'FIP Under Treatment',
                'Chronic Condition',
                'Other (Specify)',
            ],
            'goodWithCats' => ['Yes', 'No', 'Selective', 'Prefers to Be Only Cat'],
            'goodWithDogs' => ['Yes', 'No', 'Unknown'],
            'goodWithChildren' => ['Yes', 'Older Children Only', 'No', 'Unknown'],
            'homeType' => ['Apartment Friendly', 'Needs Larger Space', 'Needs Secure Balcony'],
            'personalityTraits' => [
                'Affectionate',
                'Extremely Affectionate',
                'Cuddly',
                'Playful',
                'Calm',
                'Calm Personality',
                'Independent',
                'Independent Personality',
                'Shy',
                'Needs Time to Trust',
                'Lap Cat',
                'High Energy',
                'Low Energy',
                'Requires Lots of Attention',
                'Quiet',
                'Vocal',
                'Loves Being Held',
                'Trauma Survivor (Needs Patient Adopter)',
            ],
            'dietType' => [
                'Standard Dry + Wet',
                'Wet Food Only',
                'Prescription Diet',
                'Grain Free',
                'Hypoallergenic',
                'Raw Diet',
            ],
            'groomingNeeds' => ['Low Maintenance', 'Moderate Brushing', 'High Grooming Needs'],
            'profileTags' => [
                'FIV+',
                'FeLV+',
                'Special Diet',
                'Only Cat Home',
                'Bonded Pair',
                'Special Needs Hero',
                'High Energy',
                'Needs Experienced Owner',
                'Duplicate Post',
                'Liver Support',
                'Kidney Support',
                'Immune Support',
                'Special Diet',
                'Ongoing Medication',
                'Under Treatment',
                'Recovery Care',
                'Senior Care',
                'Medical Monitoring',
                'Skin Allergies',
                'Dermatitis',
                'Sensitive Skin',
                'Ringworm Recovery',
                'Hair Regrowth Treatment',
                'Chronic Flu',
                'Respiratory Support',
                'Sensitive Immune System',
                'Frequent Sneezing',
                'Chronic Nasal Discharge',
                'Diabetic',
                'Former Diabetic',
                'Insulin Support',
                'Weight Management',
                'Sensitive Stomach',
                'Digestive Support',
                'Food Sensitivities',
                'Special Needs',
                'Mobility Support',
                'Paralysis Care',
                'Wheelchair Cat',
                'Bladder Expression Needed',
                'Neurological Condition',
                'FIV Positive',
                'FIP Survivor',
                'FIP Under Treatment',
                'Chronic Condition',
                'Indoor Only',
                'Garden Friendly',
                'Apartment Friendly',
                'Independent Personality',
                'Extremely Affectionate',
                'Calm Personality',
                'Lap Cat',
                'Loves Being Held',
                'Bonded Pair',
            ],
            'medicalRecordTypes' => ['Vaccination', 'Procedure', 'Checkup', 'Medication', 'Lab Test', 'Other'],
        ];

        foreach ($this->addedOptions() as $group => $addedValues) {
            if (! array_key_exists($group, $options)) {
                continue;
            }

            $options[$group] = collect($options[$group])
                ->merge((array) $addedValues)
                ->unique(fn ($option) => strtolower((string) $option))
                ->values()
                ->all();
        }

        foreach ($this->deletedOptions() as $group => $deletedValues) {
            if (! array_key_exists($group, $options)) {
                continue;
            }

            $options[$group] = collect($options[$group])
                ->reject(fn ($option) => in_array($option, (array) $deletedValues, true))
                ->values()
                ->all();
        }

        return $options;
    }

    private function addedOptions(): array
    {
        if (! Storage::disk('local')->exists('admin-option-additions.json')) {
            return [];
        }

        $decoded = json_decode(Storage::disk('local')->get('admin-option-additions.json'), true);

        return is_array($decoded) ? $decoded : [];
    }

    private function deletedOptions(): array
    {
        if (! Storage::disk('local')->exists('admin-option-deletions.json')) {
            return [];
        }

        $decoded = json_decode(Storage::disk('local')->get('admin-option-deletions.json'), true);

        return is_array($decoded) ? $decoded : [];
    }

    private function colorOptions(): array
    {
        return ['#9cd2c8', '#f2c79a', '#f2d0ce', '#e8d4b5', '#e9bfd5', '#d9d9d9'];
    }

    private function ensureCatHasImageRecords(Cat $cat): void
    {
        if ($cat->images()->exists()) {
            return;
        }

        if (! $cat->photo_path) {
            return;
        }

        $cat->images()->create([
            'path' => $cat->photo_path,
            'sort_order' => 0,
        ]);
    }

    private function deleteCatImageFileIfOwned(?string $path): void
    {
        if (! $path || ! str_starts_with($path, '/images/cats/')) {
            return;
        }

        $absolutePath = public_path(ltrim($path, '/'));
        if (is_file($absolutePath)) {
            @unlink($absolutePath);
        }
    }

    private function galleryPathsInRequestOrder(array $galleryImageIds): array
    {
        if (empty($galleryImageIds)) {
            return [];
        }

        $pathsById = GalleryImage::query()
            ->whereIn('id', $galleryImageIds)
            ->pluck('path', 'id');

        return collect($galleryImageIds)
            ->map(fn ($id) => $pathsById->get($id))
            ->filter()
            ->values()
            ->all();
    }
}
