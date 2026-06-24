<?php

namespace Database\Seeders;

use App\Models\Cat;
use App\Models\Category;
use Illuminate\Database\Seeder;

class FiftyAvailableCatsSeeder extends Seeder
{
    public function run(): void
    {
        $categoryMap = [
            'Friendly' => '#9cd2c8',
            'Good with Kids' => '#f2c79a',
            'Special Needs' => '#f2d0ce',
            'Senior' => '#e8d4b5',
            'Kitten' => '#e9bfd5',
            'Apartment Friendly' => '#bfdcc3',
            'Quiet Home' => '#d8ebe7',
            'Playful' => '#f7c7ad',
        ];

        foreach ($categoryMap as $name => $color) {
            Category::firstOrCreate(['name' => $name], ['color' => $color]);
        }

        $names = [
            'Amber', 'Ash', 'Bella', 'Biscuit', 'Blue', 'Bonnie', 'Boots', 'Casper', 'Chai', 'Cleo',
            'Coco', 'Daisy', 'Dusty', 'Echo', 'Felix', 'Fig', 'Gigi', 'Ginger', 'Hazel', 'Honey',
            'Jasper', 'Juno', 'Kiki', 'Leo', 'Lily', 'Milo', 'Mimi', 'Misty', 'Mocha', 'Nala',
            'Nova', 'Olive', 'Oreo', 'Peanut', 'Pepper', 'Poppy', 'Pumpkin', 'Rafi', 'Rosie', 'Ruby',
            'Shadow', 'Simba', 'Socks', 'Stella', 'Sunny', 'Tara', 'Tiger', 'Tilly', 'Willow', 'Zara',
        ];

        $ageLabels = [
            'Kitten (0-6 months)',
            'Junior (6-12 months)',
            'Young Adult (1-3 years)',
            'Adult (3-7 years)',
            'Senior (7+ years)',
        ];
        $breeds = ['Domestic Short Hair', 'Domestic Long Hair', 'Persian Mix', 'Siamese Mix', 'Ragdoll', 'Maine Coon Mix', 'Unique'];
        $colors = ['Tabby', 'Ginger', 'Black', 'White', 'Calico', 'Tuxedo', 'Grey', 'Tortoiseshell', 'Cream'];
        $sizes = ['Small', 'Medium', 'Large'];
        $locations = ['Foster care', 'Sanctuary resident', 'Rehome'];
        $energyLevels = ['Low', 'Medium', 'High'];
        $socialBehaviors = ['Friendly with people', 'Playful and social', 'Needs Time to Trust', 'Gentle and calm', 'Confident and curious'];
        $homeTypes = ['Apartment Friendly', 'Needs Larger Space', 'Needs Secure Balcony'];
        $handling = ['Enjoys regular handling', 'Enjoys short handling sessions', 'Gentle only'];
        $attention = ['Low', 'Moderate', 'High'];
        $goodWithCats = ['Yes', 'Selective', 'Prefers to Be Only Cat'];
        $goodWithDogs = ['Yes', 'No', 'Unknown'];
        $goodWithChildren = ['Yes', 'Older Children Only', 'Unknown'];
        $dietTypes = ['Standard Dry + Wet', 'Wet Food Only', 'Prescription Diet', 'Grain Free'];
        $groomingNeeds = ['Low Maintenance', 'Moderate Brushing', 'High Grooming Needs'];
        $traitSets = [
            ['Affectionate', 'Calm', 'Quiet'],
            ['Playful', 'High Energy', 'Vocal'],
            ['Cuddly', 'Lap Cat', 'Loves Being Held'],
            ['Independent', 'Calm Personality', 'Low Energy'],
            ['Shy', 'Needs Time to Trust'],
            ['Extremely Affectionate', 'Requires Lots of Attention'],
        ];
        $tagSets = [
            ['Only Cat Home'],
            ['High Energy', 'Apartment Friendly'],
            ['Bonded Pair'],
            ['Indoor Only', 'Calm Personality'],
            ['Needs Experienced Owner'],
            ['Special Needs Hero'],
        ];
        $medicalNeeds = [
            ['None'],
            ['Sensitive Stomach'],
            ['Recovery Care'],
            ['Skin Allergies'],
            ['Special Diet'],
            ['Senior Care'],
        ];
        $categorySets = [
            ['Friendly'],
            ['Good with Kids', 'Playful'],
            ['Kitten', 'Friendly'],
            ['Quiet Home', 'Apartment Friendly'],
            ['Special Needs'],
            ['Senior', 'Quiet Home'],
        ];

        foreach ($names as $index => $name) {
            $number = $index + 1;
            $imageUrl = "https://cataas.com/cat?width=900&height=900&seed=kitty-az-{$number}";
            $galleryUrls = [
                $imageUrl,
                "https://cataas.com/cat?width=900&height=900&seed=kitty-az-{$number}-b",
                "https://cataas.com/cat?width=900&height=900&seed=kitty-az-{$number}-c",
            ];
            $needs = $medicalNeeds[$index % count($medicalNeeds)];

            $cat = Cat::updateOrCreate(
                ['name' => $name],
                [
                    'age_label' => $ageLabels[$index % count($ageLabels)],
                    'gender' => $index % 2 === 0 ? 'Female' : 'Male',
                    'breed' => $breeds[$index % count($breeds)],
                    'color' => $colors[$index % count($colors)],
                    'size' => $sizes[$index % count($sizes)],
                    'weight_kg' => 2.8 + (($index % 18) * 0.18),
                    'status' => 'available',
                    'location' => $locations[$index % count($locations)],
                    'photo_path' => $imageUrl,
                    'rescue_story' => "{$name} was rescued by Dubai Street Kitties and is now ready for a safe indoor home with patient adopters.",
                    'fiv_status' => 'Negative',
                    'felv_status' => 'Negative',
                    'fip_history' => 'Never Diagnosed',
                    'spay_neuter_status' => $index % 2 === 0 ? 'Spayed' : 'Neutered',
                    'microchip_status' => 'Microchipped (All cats are microchipped)',
                    'vaccination_status' => 'Fully Vaccinated',
                    'special_medical_needs' => $needs,
                    'current_medication' => in_array('None', $needs, true) ? null : 'Routine monitoring only',
                    'energy_level' => $energyLevels[$index % count($energyLevels)],
                    'social_behavior' => $socialBehaviors[$index % count($socialBehaviors)],
                    'ideal_home_type' => $homeTypes[$index % count($homeTypes)],
                    'handling_tolerance' => $handling[$index % count($handling)],
                    'daily_attention_requirement' => $attention[$index % count($attention)],
                    'good_with_cats' => $goodWithCats[$index % count($goodWithCats)],
                    'good_with_dogs' => $goodWithDogs[$index % count($goodWithDogs)],
                    'good_with_children' => $goodWithChildren[$index % count($goodWithChildren)],
                    'diet_type' => $dietTypes[$index % count($dietTypes)],
                    'grooming_needs' => $groomingNeeds[$index % count($groomingNeeds)],
                    'personality_traits' => $traitSets[$index % count($traitSets)],
                    'profile_tags' => $tagSets[$index % count($tagSets)],
                ],
            );

            $cat->images()->delete();
            foreach ($galleryUrls as $sortOrder => $path) {
                $cat->images()->create([
                    'path' => $path,
                    'sort_order' => $sortOrder,
                ]);
            }

            $categoryIds = Category::whereIn('name', $categorySets[$index % count($categorySets)])->pluck('id');
            $cat->categories()->sync($categoryIds);
        }

        Cat::query()->update(['status' => 'available']);
    }
}
