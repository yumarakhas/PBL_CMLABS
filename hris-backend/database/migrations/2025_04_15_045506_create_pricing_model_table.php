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
        Schema::create('pricing_model', function (Blueprint $table) {
            $table->id();
            $table->string('bulan');
            $table->string('layanan');
            $table->string('jumlah_karyawan');
            $table->integer('harga_per_karyawan')->default(9);
            $table->integer('total_pembayaran')->default(9);
            $table->string('metode_pembayaran');
            $table->string('status');
            $table->integer('batas_trial_hari')->default(14);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pricing_model');
    }
};
