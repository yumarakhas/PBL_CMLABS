<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jadwal_jam_kerja', function (Blueprint $table) {
            $table->id();
            $table->string('jenis');
            $table->time('jam_masuk');
            $table->time('jam_selesai');
            $table->time('jam_istirahat');
            $table->string('Hari_kerja');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwal_jam_kerja');
    }
};
