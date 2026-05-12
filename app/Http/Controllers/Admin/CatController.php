<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cat;
use App\Models\Category;
use App\Models\GalleryImage;
use App\Models\MedicalRecord;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
        $selectedGalleryPaths = GalleryImage::query()
            ->whereIn('id', $selectedGalleryIds)
            ->pluck('path')
            ->values()
            ->all();
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

        return Inertia::render('Admin/Cats/Show', [
            'cat' => $cat,
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
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'age_label' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:255'],
            'breed' => ['nullable', 'string', 'max:255'],
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

        $categoryIds = $validated['category_ids'] ?? [];
        $photoFiles = $request->file('photos', []);
        $selectedGalleryPaths = GalleryImage::query()
            ->whereIn('id', $request->input('gallery_image_ids', []))
            ->pluck('path')
            ->values()
            ->all();
        unset($validated['category_ids']);
        unset($validated['photos']);
        unset($validated['gallery_image_ids']);

        $cat->update($validated);
        $cat->categories()->sync($categoryIds);

        if (! empty($photoFiles) || ! empty($selectedGalleryPaths)) {
            $destination = public_path('images/cats');
            if (! is_dir($destination)) {
                mkdir($destination, 0755, true);
            }

            $nextSortOrder = (int) ($cat->images()->max('sort_order') ?? -1) + 1;
            $uploadedPaths = [];

            foreach ($photoFiles as $photoFile) {
                $filename = Str::uuid()->toString() . '.' . $photoFile->getClientOriginalExtension();
                $photoFile->move($destination, $filename);
                $uploadedPaths[] = '/images/cats/' . $filename;
            }

            $allNewPaths = array_values(array_unique(array_merge($selectedGalleryPaths, $uploadedPaths)));
            $cat->images()->createMany(
                collect($allNewPaths)
                    ->values()
                    ->map(fn (string $path, int $index) => [
                        'path' => $path,
                        'sort_order' => $nextSortOrder + $index,
                    ])
                    ->all(),
            );

            if (empty($cat->photo_path) && ! empty($allNewPaths)) {
                $cat->update(['photo_path' => $allNewPaths[0]]);
            }
        }

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

    private function options(): array
    {
        return [
            'status' => ['available', 'adopted', 'fostered', 'medical_care'],
            'breed' => [
                'Domestic Short Hair',
                'Domestic Long Hair',
                'Persian Mix',
                'Siamese Mix',
                'Ragdoll',
                'Maine Coon Mix',
                'Unique',
            ],
            'gender' => ['Male', 'Female'],
            'age' => [
                'Kitten (0-6 months)',
                'Junior (6-12 months)',
                'Young Adult (1-3 years)',
                'Adult (3-7 years)',
                'Senior (7+ years)',
            ],
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
    }

    private function colorOptions(): array
    {
        return ['#9cd2c8', '#f2c79a', '#f2d0ce', '#e8d4b5', '#e9bfd5', '#d9d9d9'];
    }
}
