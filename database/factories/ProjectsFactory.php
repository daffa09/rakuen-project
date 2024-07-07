<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'title' => $this->faker->sentence,
            'banner' => $this->faker->imageUrl(),
            'content' => $this->faker->paragraph(),
            'category_id' => 1,
            'prototype_link' => $this->faker->url(),
            'publish' => $this->faker->boolean(),
            'created_by' => 'Test User',
            'updated_by' => 'Test User',
        ];
    }
}
