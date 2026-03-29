<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Artigo>
 */
class ArtigoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
            
        $category = \App\Models\Category::inRandomOrder()->first();

        $articleName = fake()->words(3, true); 

        return [
            'name'        => $articleName,
            'brand'       => fake()->company(),
            'price'       => fake()->randomFloat(2, 50, 1500),
            'year'        => fake()->year(),

            'image'       => fake()->imageUrl(800, 600, 'sports', true, $articleName),

            'amount'      => fake()->numberBetween(1, 100),
            'category_id' => $category->id,
        ];
    }
}
