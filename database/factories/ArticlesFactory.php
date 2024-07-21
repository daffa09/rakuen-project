<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Articles>
 */
class ArticlesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid,
            'title' => $this->faker->sentence,
            'banner' => $this->faker->imageUrl,
            'content' => $this->faker->paragraph,
            'category_id' => 1,
            'publish' => $this->faker->boolean,
            'created_by' => $this->faker->name,
        ];
    }
}
