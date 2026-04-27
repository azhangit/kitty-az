<?php

namespace Database\Seeders;

use App\Models\Cat;
use App\Models\Category;
use Illuminate\Database\Seeder;

class AdminDataSeeder extends Seeder
{
    public function run(): void
    {
        $categoryMap = [
            'Friendly' => '#9cd2c8',
            'Good with Kids' => '#f2c79a',
            'Special Needs' => '#f2d0ce',
            'Senior' => '#e8d4b5',
            'Kitten' => '#e9bfd5',
        ];

        foreach ($categoryMap as $name => $color) {
            Category::firstOrCreate(['name' => $name], ['color' => $color]);
        }

        $cats = [
            [
                'name' => 'Luna',
                'age_label' => 'Young Adult (1-3 years)',
                'gender' => 'Female',
                'breed' => 'Domestic Short Hair',
                'size' => 'Medium',
                'weight_kg' => 3.9,
                'status' => 'available',
                'location' => 'Foster home',
                'photo_path' => '/images/gallery-cat.png',
                'rescue_story' => 'Luna was rescued from a busy street and now loves quiet indoor spaces and gentle affection.',
                'fiv_status' => 'Negative',
                'felv_status' => 'Negative',
                'fip_history' => 'Never Diagnosed',
                'spay_neuter_status' => 'Spayed',
                'microchip_status' => 'Microchipped (All cats are microchipped)',
                'vaccination_status' => 'Fully Vaccinated',
                'special_medical_needs' => ['None'],
                'energy_level' => 'Medium',
                'social_behavior' => 'Friendly with people',
                'ideal_home_type' => 'Apartment Friendly',
                'handling_tolerance' => 'Enjoys regular handling',
                'daily_attention_requirement' => 'Moderate',
                'good_with_cats' => 'Yes',
                'good_with_dogs' => 'Unknown',
                'good_with_children' => 'Older Children Only',
                'diet_type' => 'Standard Dry + Wet',
                'grooming_needs' => 'Low Maintenance',
                'personality_traits' => ['Affectionate', 'Calm', 'Quiet'],
                'profile_tags' => ['Only Cat Home'],
                'categories' => ['Friendly'],
                'medical_records' => [
                    ['record_date' => '2026-03-06', 'type' => 'Vaccination', 'description' => 'Annual vaccination booster completed.', 'vet_name' => 'Dr. Mohamed Khan', 'cost_aed' => 350],
                ],
            ],
            [
                'name' => 'Mango',
                'age_label' => 'Young Adult (1-3 years)',
                'gender' => 'Male',
                'breed' => 'Persian Mix',
                'size' => 'Medium',
                'weight_kg' => 4.4,
                'status' => 'available',
                'location' => 'Foster home',
                'photo_path' => '/images/our-mission.png',
                'rescue_story' => 'Mango was found near a construction site and is now playful, vocal, and deeply bonded with his foster.',
                'fiv_status' => 'Negative',
                'felv_status' => 'Negative',
                'fip_history' => 'Never Diagnosed',
                'spay_neuter_status' => 'Neutered',
                'microchip_status' => 'Microchipped (All cats are microchipped)',
                'vaccination_status' => 'Partially Vaccinated',
                'special_medical_needs' => ['Sensitive Stomach'],
                'current_medication' => 'Probiotic once daily',
                'energy_level' => 'High',
                'social_behavior' => 'Playful and social',
                'ideal_home_type' => 'Needs Larger Space',
                'handling_tolerance' => 'Enjoys short handling sessions',
                'daily_attention_requirement' => 'High',
                'good_with_cats' => 'Selective',
                'good_with_dogs' => 'Unknown',
                'good_with_children' => 'Yes',
                'diet_type' => 'Wet Food Only',
                'grooming_needs' => 'Moderate Brushing',
                'personality_traits' => ['Playful', 'Vocal', 'High Energy'],
                'profile_tags' => ['High Energy', 'Special Diet'],
                'categories' => ['Good with Kids', 'Kitten'],
                'medical_records' => [
                    ['record_date' => '2026-02-18', 'type' => 'Checkup', 'description' => 'Routine wellness exam.', 'vet_name' => 'Dr. Mohamed Khan', 'cost_aed' => 220],
                ],
            ],
            [
                'name' => 'Patches',
                'age_label' => 'Adult (3-7 years)',
                'gender' => 'Female',
                'breed' => 'Domestic Long Hair',
                'size' => 'Medium',
                'weight_kg' => 4.1,
                'status' => 'fostered',
                'location' => 'Foster home',
                'photo_path' => '/images/home-hero.png',
                'rescue_story' => 'Patches survived a traffic injury and recovered with months of foster rehabilitation.',
                'fiv_status' => 'Negative',
                'felv_status' => 'Pending Test',
                'fip_history' => 'Successfully Treated (Recovered)',
                'spay_neuter_status' => 'Spayed',
                'microchip_status' => 'Microchipped (All cats are microchipped)',
                'vaccination_status' => 'Fully Vaccinated',
                'special_medical_needs' => ['Former FIP Case'],
                'energy_level' => 'Low',
                'social_behavior' => 'Needs Time to Trust',
                'ideal_home_type' => 'Apartment Friendly',
                'handling_tolerance' => 'Gentle only',
                'daily_attention_requirement' => 'Moderate',
                'good_with_cats' => 'No',
                'good_with_dogs' => 'No',
                'good_with_children' => 'No',
                'diet_type' => 'Prescription Diet',
                'grooming_needs' => 'High Grooming Needs',
                'personality_traits' => ['Shy', 'Trauma Survivor (Needs Patient Adopter)'],
                'profile_tags' => ['Special Needs Hero', 'Needs Experienced Owner'],
                'categories' => ['Special Needs', 'Senior'],
                'medical_records' => [
                    ['record_date' => '2026-01-10', 'type' => 'Procedure', 'description' => 'Post-treatment follow up and bloodwork.', 'vet_name' => 'Dr. Aisha Noor', 'cost_aed' => 1030],
                ],
            ],
        ];

        foreach ($cats as $catData) {
            $categoryNames = $catData['categories'];
            $medicalRecords = $catData['medical_records'];
            unset($catData['categories'], $catData['medical_records']);

            $cat = Cat::updateOrCreate(
                ['name' => $catData['name']],
                $catData,
            );

            $categoryIds = Category::whereIn('name', $categoryNames)->pluck('id');
            $cat->categories()->sync($categoryIds);

            foreach ($medicalRecords as $record) {
                $cat->medicalRecords()->updateOrCreate(
                    ['record_date' => $record['record_date'], 'type' => $record['type']],
                    $record,
                );
            }
        }
    }
}
