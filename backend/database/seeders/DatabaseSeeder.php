<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Default staff user
        User::create([
            'name'     => 'Guru BK',
            'email'    => 'bk@sekolah.ac.id',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);

        // Bullying categories
        $categories = [
            'Perundungan Fisik',
            'Perundungan Verbal',
            'Perundungan Siber (Cyberbullying)',
            'Perundungan Relasional/Sosial',
            'Pelecehan Seksual',
            'Lainnya',
        ];

        foreach ($categories as $name) {
            Category::create(['name' => $name]);
        }
    }
}
