<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use \App\Models\Categories;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categories::create([
            "id" => 1,
            'name' => 'Web Development',
            "created_by" => 'Migration',
        ]);
    }
}
