<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DivisionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('divisions')->insert([
            [
                'id' => 1,
                'name' => 'Human Resources',
                'description' => 'Responsible for managing employee relations and benefits.',
            ],
            [
                'id' => 2,
                'name' => 'Finance',
                'description' => 'Handles financial planning and record-keeping.',
            ],
            [
                'id' => 3,
                'name' => 'Marketing',
                'description' => 'Focuses on promoting the company\'s products and services.',
            ],
            [
                'id' => 4,
                'name' => 'Sales',
                'description' => 'Responsible for selling the company\'s products and services.',
            ],
            [
                'id' => 5,
                'name' => 'IT Support',
                'description' => 'Provides technical support and manages IT infrastructure.',
            ],
            [
                'id' => 6,
                'name' => 'Research and Development',
                'description' => 'Conducts research to innovate and improve products.',
            ],
            [
                'id' => 7,
                'name' => 'Customer Service',
                'description' => 'Handles customer inquiries and support.',
            ],
            [
                'id' => 8,
                'name' => 'Productions',
                'description' => 'Manages legal affairs and compliance.',
            ],
            [
                'id' => 10,
                'name' => 'Quality Assurance',
                'description' => 'Ensures products meet quality standards.',
            ]   
        ]);
    }
}
