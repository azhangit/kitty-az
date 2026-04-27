<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cats', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('age_label')->nullable();
            $table->string('gender')->nullable();
            $table->string('breed')->nullable();
            $table->string('size')->nullable();
            $table->decimal('weight_kg', 5, 2)->nullable();
            $table->string('status')->default('available');
            $table->string('location')->nullable();
            $table->text('rescue_story')->nullable();
            $table->string('photo_path')->nullable();

            $table->string('fiv_status')->default('pending_test');
            $table->string('felv_status')->default('pending_test');
            $table->string('fip_history')->default('never_diagnosed');
            $table->string('spay_neuter_status')->default('scheduled');
            $table->string('microchip_status')->default('microchipped');
            $table->string('vaccination_status')->default('partially_vaccinated');
            $table->json('special_medical_needs')->nullable();
            $table->text('current_medication')->nullable();

            $table->string('energy_level')->nullable();
            $table->string('social_behavior')->nullable();
            $table->string('ideal_home_type')->nullable();
            $table->string('handling_tolerance')->nullable();
            $table->string('daily_attention_requirement')->nullable();

            $table->string('good_with_cats')->nullable();
            $table->string('good_with_dogs')->nullable();
            $table->string('good_with_children')->nullable();
            $table->string('diet_type')->nullable();
            $table->string('grooming_needs')->nullable();

            $table->json('personality_traits')->nullable();
            $table->json('profile_tags')->nullable();

            $table->timestamps();
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('color', 20)->default('#9cd2c8');
            $table->timestamps();
        });

        Schema::create('cat_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cat_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['cat_id', 'category_id']);
        });

        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cat_id')->constrained()->cascadeOnDelete();
            $table->date('record_date');
            $table->string('type');
            $table->text('description')->nullable();
            $table->string('vet_name')->nullable();
            $table->decimal('cost_aed', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_records');
        Schema::dropIfExists('cat_category');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('cats');
    }
};
