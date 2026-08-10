<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    /**
     * Seed the primary admin user.
     */
    public function run(): void
    {
        Role::findOrCreate('admin', 'web');

        $user = User::updateOrCreate(
            ['email' => 'admin@dubaistreetkitties.com'],
            [
                'name' => 'Admin',
                'password' => 'rescuekitties@26',
                'email_verified_at' => now(),
            ],
        );

        if (! $user->hasRole('admin')) {
            $user->assignRole('admin');
        }
    }
}
