<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cat extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'age_label',
        'gender',
        'breed',
        'size',
        'weight_kg',
        'status',
        'location',
        'rescue_story',
        'photo_path',
        'fiv_status',
        'felv_status',
        'fip_history',
        'spay_neuter_status',
        'microchip_status',
        'vaccination_status',
        'special_medical_needs',
        'current_medication',
        'energy_level',
        'social_behavior',
        'ideal_home_type',
        'handling_tolerance',
        'daily_attention_requirement',
        'good_with_cats',
        'good_with_dogs',
        'good_with_children',
        'diet_type',
        'grooming_needs',
        'personality_traits',
        'profile_tags',
    ];

    protected $casts = [
        'weight_kg' => 'decimal:2',
        'special_medical_needs' => 'array',
        'personality_traits' => 'array',
        'profile_tags' => 'array',
    ];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class)->withTimestamps();
    }

    public function medicalRecords(): HasMany
    {
        return $this->hasMany(MedicalRecord::class)->orderByDesc('record_date');
    }

    public function images(): HasMany
    {
        return $this->hasMany(CatImage::class)->orderBy('sort_order');
    }
}
