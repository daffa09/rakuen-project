<?php

namespace Database\Seeders;

use App\Models\Articles;
use App\Models\Images;
use App\Models\Projects;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            UserSeeder::class,
            ArticlesSeeder::class,
            ImagesSeeder::class,
        ]);
    }
}
