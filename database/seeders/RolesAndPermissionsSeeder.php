<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Seed roles and permissions.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'manage users',
            'manage cats',
            'manage adoptions',
            'manage content',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $volunteerRole = Role::firstOrCreate(['name' => 'volunteer', 'guard_name' => 'web']);
        $adopterRole = Role::firstOrCreate(['name' => 'adopter', 'guard_name' => 'web']);

        $adminRole->syncPermissions($permissions);
        $volunteerRole->syncPermissions([
            'manage cats',
            'manage adoptions',
            'manage content',
        ]);
        $adopterRole->syncPermissions([]);
    }
}
