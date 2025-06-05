<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PositionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('positions')->insert([
            [
                'id' => 1,
                'name' => 'Staff',
                'description' => 'Carries out daily operational tasks and supports the execution of team objectives.',
            ],
            [
                'id' => 2,
                'name' => 'Head of Divisions',
                'description' => 'Leads and manages a division, ensuring alignment with company goals and efficient team performance.',
            ],
            [
                'id' => 3,
                'name' => 'Head of Branch',
                'description' => 'Oversees all operations within the branch, including administration, finance, and performance management.',
            ],
            [
                'id' => 4,
                'name' => 'Supervisor',
                'description' => 'Supervises staff activities, ensures workflow efficiency, and acts as a liaison between staff and management.',
            ],

        ]);
    }
}
