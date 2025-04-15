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
        Schema::create('salaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pegawai')->constrained('informasi_pegawai')->onDelete('cascade');
            $table->integer('gaji_pokok')->default(9);
            $table->integer('tunjangan')->nullable()->default(9);
            $table->integer('potongan')->nullable()->default(9);
            $table->integer('total_gaji')->default(9);
            $table->integer('type');
            $table->float('rate');
            $table->date('efective_date');
            $table->timestamps();
            $table->softDeletes();
            $table->string('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salaries');
    }
};
