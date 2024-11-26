<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\ProductList;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'email' => 'user@gmail.com',
            'password' => bcrypt('user'),
        ]);

        ProductList::factory(10)->create();
    }
}
