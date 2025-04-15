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
        Schema::create('aktivitas_pegawai', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pegawai')->constrained('informasi_pegawai')->onDelete('cascade');
            $table->string('nama_aktifitas');
            $table->time('tanggal_aktifitas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aktivitas_pegawai');
    }
};
