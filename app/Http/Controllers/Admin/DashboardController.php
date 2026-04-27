<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cat;
use App\Models\MedicalRecord;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $statusCounts = Cat::query()
            ->selectRaw('status, COUNT(*) as aggregate')
            ->groupBy('status')
            ->pluck('aggregate', 'status');

        $totalCats = Cat::count();
        $availableCats = (int) ($statusCounts['available'] ?? 0);
        $adoptedCats = (int) ($statusCounts['adopted'] ?? 0);
        $fosteredCats = (int) ($statusCounts['fostered'] ?? 0);

        $medicalCost = (float) MedicalRecord::sum('cost_aed');

        $recentCats = Cat::with('categories')
            ->latest()
            ->take(3)
            ->get();

        $adoptionRate = $totalCats > 0 ? round(($adoptedCats / $totalCats) * 100, 1) : 0;
        $statusBreakdown = [
            'available' => $availableCats,
            'adopted' => $adoptedCats,
            'fostered' => $fosteredCats,
            'medical_care' => (int) ($statusCounts['medical_care'] ?? 0),
        ];

        $recentRecords = MedicalRecord::with('cat')
            ->latest('record_date')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total' => $totalCats,
                'ready' => $availableCats,
                'success' => $adoptedCats,
                'inCare' => $fosteredCats + $statusBreakdown['medical_care'],
                'medicalCost' => $medicalCost,
                'adoptionRate' => $adoptionRate,
            ],
            'statusBreakdown' => $statusBreakdown,
            'recentCats' => $recentCats,
            'recentMedicalRecords' => $recentRecords,
            'today' => Carbon::now()->toDateString(),
        ]);
    }
}
