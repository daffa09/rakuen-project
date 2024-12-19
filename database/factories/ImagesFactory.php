<?php

namespace Database\Factories;

use App\Models\Images;
use App\Models\Projects;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\QueryException;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Images>
 */
class ImagesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $project = Projects::factory()->create();
        return [
            'id' => $this->faker->uuid(),
            'project_id' => $project->id,
            'image_url' => $this->faker->imageUrl(),
            'created_by' => 'Test User',
        ];
    }
}
