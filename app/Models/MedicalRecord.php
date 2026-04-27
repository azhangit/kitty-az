<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MedicalRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'cat_id',
        'record_date',
        'type',
        'description',
        'vet_name',
        'cost_aed',
    ];

    protected $casts = [
        'record_date' => 'date',
        'cost_aed' => 'decimal:2',
    ];

    public function cat(): BelongsTo
    {
        return $this->belongsTo(Cat::class);
    }
}
