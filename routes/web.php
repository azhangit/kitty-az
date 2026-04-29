<?php

use App\Http\Controllers\Admin\CatController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\ProfileController;
use App\Models\Cat;
use App\Models\GalleryImage;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

if (! function_exists('mapCatCardData')) {
    function mapCatCardData(Cat $cat): array
    {
        return [
            'id' => $cat->id,
            'name' => $cat->name,
            'age' => $cat->age_label ?: 'Age N/A',
            'gender' => $cat->gender ?: 'Gender N/A',
            'breed' => $cat->breed ?: 'Breed N/A',
            'image' => $cat->images->first()->path ?? $cat->photo_path ?: '/images/gallery-cat.png',
            'traits' => collect($cat->personality_traits ?: [])
                ->take(2)
                ->values()
                ->all(),
            'tags' => collect($cat->profile_tags ?: [])->take(3)->values()->all(),
        ];
    }
}

Route::get('/', function () {
    $availableCats = collect();
    if (Schema::hasTable('cats')) {
        $availableCats = Cat::query()
            ->with(['categories', 'images'])
            ->where('status', 'available')
            ->latest()
            ->take(6)
            ->get()
            ->map(fn (Cat $cat) => mapCatCardData($cat))
            ->values();
    }

    return Inertia::render('Home', [
        'availableCats' => $availableCats,
    ]);
});

Route::get('/about-us', function () {
    $latestGalleryImages = collect();

    if (Schema::hasTable('gallery_images')) {
        $latestGalleryImages = GalleryImage::query()
            ->latest('id')
            ->take(6)
            ->get(['id', 'path', 'type']);
    }

    return Inertia::render('AboutUs', [
        'latestGalleryImages' => $latestGalleryImages,
    ]);
});

Route::get('/gallery', function () {
    $galleryImages = collect();
    $galleryTypes = GalleryImage::TYPES;

    if (Schema::hasTable('gallery_images')) {
        $galleryImages = GalleryImage::query()
            ->orderBy('sort_order')
            ->latest('id')
            ->get(['id', 'type', 'path']);
    }

    return Inertia::render('Gallery', [
        'galleryImages' => $galleryImages,
        'galleryTypes' => $galleryTypes,
    ]);
});

Route::get('/shop', function () {
    return Inertia::render('Shop');
});

Route::get('/adopt', function () {
    return Inertia::render('Adopt');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});
Route::post('/contact', [ContactMessageController::class, 'store'])->name('contact.store');

Route::get('/adoption-abroad', function () {
    return Inertia::render('AdoptionAbroad');
});

Route::get('/support', function () {
    return Inertia::render('Support');
});

Route::get('/available-cats', function () {
    $availableCats = collect();
    if (Schema::hasTable('cats')) {
        $availableCats = Cat::query()
            ->with('images')
            ->where('status', 'available')
            ->latest()
            ->get()
            ->map(fn (Cat $cat) => mapCatCardData($cat))
            ->values();
    }

    return Inertia::render('AvailableCats', [
        'availableCats' => $availableCats,
    ]);
})->name('cats.available');

Route::get('/cat-profile/{cat}', function (Cat $cat) {
    $cat->load(['categories', 'medicalRecords', 'images']);

    return Inertia::render('CatProfile', [
        'cat' => [
            'id' => $cat->id,
            'name' => $cat->name,
            'age' => $cat->age_label ?: 'Age N/A',
            'gender' => $cat->gender ?: 'Gender N/A',
            'breed' => $cat->breed ?: 'Breed N/A',
            'color' => 'N/A',
            'adoptionFee' => 'Free',
            'weight' => $cat->weight_kg ? "{$cat->weight_kg} kg" : 'N/A',
            'story' => $cat->rescue_story ?: 'No rescue story added yet.',
            'image' => $cat->images->first()->path ?? $cat->photo_path ?: '/images/gallery-cat.png',
            'images' => $cat->images->pluck('path')->values()->all(),
            'tags' => collect($cat->profile_tags ?: [])->values()->all(),
            'personality' => collect($cat->personality_traits ?: [])->values()->all(),
            'medicalSummary' => [
                'FIV Status' => $cat->fiv_status,
                'FeLV Status' => $cat->felv_status,
                'FIP History' => $cat->fip_history,
                'Spayed / Neutered' => $cat->spay_neuter_status,
                'Microchipped' => $cat->microchip_status,
                'Vaccination Status' => $cat->vaccination_status,
                'Special Needs' => collect($cat->special_medical_needs ?: [])->implode(', ') ?: 'None',
                'Current Medication' => $cat->current_medication ?: 'None',
            ],
            'personalitySummary' => [
                'Energy Level' => $cat->energy_level ?: 'N/A',
                'Social Behavior' => $cat->social_behavior ?: 'N/A',
                'Ideal Home Type' => $cat->ideal_home_type ?: 'N/A',
                'Handling Tolerance' => $cat->handling_tolerance ?: 'N/A',
                'Daily Attention Requirement' => $cat->daily_attention_requirement ?: 'N/A',
            ],
            'goodWith' => [
                'Cats' => $cat->good_with_cats ?: 'Unknown',
                'Dogs' => $cat->good_with_dogs ?: 'Unknown',
                'Children' => $cat->good_with_children ?: 'Unknown',
            ],
            'medicalRecords' => $cat->medicalRecords->map(function ($record) {
                return [
                    'id' => $record->id,
                    'date' => optional($record->record_date)->format('d M Y'),
                    'type' => $record->type,
                    'description' => $record->description ?: 'No description',
                    'vet' => $record->vet_name ?: 'N/A',
                    'cost' => (float) $record->cost_aed,
                ];
            })->values(),
        ],
    ]);
})->name('cat-profile.show');

Route::get('/cat-profile/{cat}/report', function (Cat $cat) {
    $cat->load('medicalRecords');

    $lines = [
        'Dubai Street Kitties - Cat Medical Report',
        '=========================================',
        "Name: {$cat->name}",
        'Age: ' . ($cat->age_label ?: 'N/A'),
        'Gender: ' . ($cat->gender ?: 'N/A'),
        'Breed: ' . ($cat->breed ?: 'N/A'),
        'Weight: ' . ($cat->weight_kg ? "{$cat->weight_kg} kg" : 'N/A'),
        '',
        'Medical Summary',
        '---------------',
        'FIV Status: ' . ($cat->fiv_status ?: 'N/A'),
        'FeLV Status: ' . ($cat->felv_status ?: 'N/A'),
        'FIP History: ' . ($cat->fip_history ?: 'N/A'),
        'Spayed / Neutered: ' . ($cat->spay_neuter_status ?: 'N/A'),
        'Microchipped: ' . ($cat->microchip_status ?: 'N/A'),
        'Vaccination Status: ' . ($cat->vaccination_status ?: 'N/A'),
        'Special Needs: ' . (collect($cat->special_medical_needs ?: [])->implode(', ') ?: 'None'),
        'Current Medication: ' . ($cat->current_medication ?: 'None'),
        '',
        'Medical Timeline',
        '---------------',
    ];

    foreach ($cat->medicalRecords as $record) {
        $lines[] = sprintf(
            '- %s | %s | AED %s | Vet: %s',
            optional($record->record_date)->format('d M Y') ?: 'N/A',
            $record->type,
            number_format((float) $record->cost_aed, 2),
            $record->vet_name ?: 'N/A',
        );
        $lines[] = '  Notes: ' . ($record->description ?: 'No description');
    }

    if ($cat->medicalRecords->isEmpty()) {
        $lines[] = '- No medical records available.';
    }

    $content = implode(PHP_EOL, $lines) . PHP_EOL;
    $filename = 'cat-report-' . str($cat->name)->slug() . '.txt';

    return response()->streamDownload(function () use ($content): void {
        echo $content;
    }, $filename, [
        'Content-Type' => 'text/plain; charset=UTF-8',
    ]);
})->name('cat-profile.report');

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/admin/cats', [CatController::class, 'index'])->name('admin.cats.index');
    Route::post('/admin/cats', [CatController::class, 'store'])->name('admin.cats.store');
    Route::put('/admin/cats/{cat}', [CatController::class, 'update'])->name('admin.cats.update');
    Route::get('/admin/cats/{cat}', [CatController::class, 'show'])->name('admin.cats.show');
    Route::post('/admin/cats/{cat}/medical-records', [CatController::class, 'storeMedicalRecord'])->name('admin.cats.medical-records.store');
    Route::delete('/admin/cats/{cat}/medical-records/{medicalRecord}', [CatController::class, 'destroyMedicalRecord'])->name('admin.cats.medical-records.destroy');

    Route::get('/admin/categories', [CategoryController::class, 'index'])->name('admin.categories.index');
    Route::post('/admin/categories', [CategoryController::class, 'store'])->name('admin.categories.store');
    Route::put('/admin/categories/{category}', [CategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('/admin/categories/{category}', [CategoryController::class, 'destroy'])->name('admin.categories.destroy');

    Route::get('/admin/reports', [ReportController::class, 'index'])->name('admin.reports.index');
    Route::get('/admin/users', [UserManagementController::class, 'index'])->name('admin.users.index');
    Route::get('/admin/gallery', [GalleryController::class, 'index'])->name('admin.gallery.index');
    Route::post('/admin/gallery', [GalleryController::class, 'store'])->name('admin.gallery.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
