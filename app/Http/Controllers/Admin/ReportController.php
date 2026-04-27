<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cat;
use App\Models\MedicalRecord;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(): Response
    {
        $totalCats = Cat::count();
        $medicalRecordsCount = MedicalRecord::count();
        $medicalCost = (float) MedicalRecord::sum('cost_aed');

        $statusBreakdown = [
            'available' => Cat::where('status', 'available')->count(),
            'adopted' => Cat::where('status', 'adopted')->count(),
            'fostered' => Cat::where('status', 'fostered')->count(),
            'medical_care' => Cat::where('status', 'medical_care')->count(),
        ];

        $months = collect(range(0, 5))
            ->map(fn ($i) => Carbon::now()->startOfMonth()->subMonths(5 - $i));

        $trends = $months->map(function (Carbon $month) {
            $start = $month->copy()->startOfMonth();
            $end = $month->copy()->endOfMonth();

            return [
                'month' => $month->format('M'),
                'added' => Cat::whereBetween('created_at', [$start, $end])->count(),
                'adopted' => Cat::where('status', 'adopted')->whereBetween('updated_at', [$start, $end])->count(),
            ];
        });

        return Inertia::render('Admin/Reports/Index', [
            'stats' => [
                'totalCats' => $totalCats,
                'medicalRecords' => $medicalRecordsCount,
                'medicalCost' => $medicalCost,
            ],
            'statusBreakdown' => $statusBreakdown,
            'trends' => $trends,
        ]);
    }
}
