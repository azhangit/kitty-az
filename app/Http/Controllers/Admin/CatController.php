<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cat;
use App\Models\Category;
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
            'filters' => [
                'search' => $search,
                'status' => $status ?: 'all',
            ],
            'options' => $this->options(),
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
        unset($validated['category_ids']);
        unset($validated['photos']);

        $uploadedPaths = [];

        if (! empty($photoFiles)) {
            $destination = public_path('images/cats');
            if (! is_dir($destination)) {
                mkdir($destination, 0755, true);
            }

            foreach ($photoFiles as $photoFile) {
                $filename = Str::uuid()->toString() . '.' . $photoFile->getClientOriginalExtension();
                $photoFile->move($destination, $filename);
                $uploadedPaths[] = '/images/cats/' . $filename;
            }

            $validated['photo_path'] = $uploadedPaths[0];
        } elseif (empty($validated['photo_path'])) {
            $validated['photo_path'] = '/images/gallery-cat.png';
        }

        $cat = Cat::create($validated);
        $cat->categories()->sync($categoryIds);

        if (! empty($uploadedPaths)) {
            $cat->images()->createMany(
                collect($uploadedPaths)
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
        $cat->load(['categories', 'medicalRecords']);

        return Inertia::render('Admin/Cats/Show', [
            'cat' => $cat,
        ]);
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
                'On Special Diet',
                'Skin Allergies',
                'Sensitive Stomach',
                'Requires Daily Medication',
                'Needs Bladder Expression',
                'Paralyzed (Partial)',
                'Paralyzed (Full)',
                'Neurological Condition',
                'Vision Impaired',
                'Hearing Impaired',
                'Former FIP Case',
                'Other (Specify)',
            ],
            'goodWithCats' => ['Yes', 'No', 'Selective', 'Prefers to Be Only Cat'],
            'goodWithDogs' => ['Yes', 'No', 'Unknown'],
            'goodWithChildren' => ['Yes', 'Older Children Only', 'No', 'Unknown'],
            'homeType' => ['Apartment Friendly', 'Needs Larger Space', 'Needs Secure Balcony'],
            'personalityTraits' => [
                'Affectionate',
                'Cuddly',
                'Playful',
                'Calm',
                'Independent',
                'Shy',
                'Needs Time to Trust',
                'Lap Cat',
                'High Energy',
                'Low Energy',
                'Requires Lots of Attention',
                'Quiet',
                'Vocal',
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
            ],
            'medicalRecordTypes' => ['Vaccination', 'Procedure', 'Checkup', 'Medication', 'Lab Test', 'Other'],
        ];
    }
}
