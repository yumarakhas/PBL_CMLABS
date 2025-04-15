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
        Schema::create('absensi_pegawai', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pegawai')->constrained('informasi_pegawai')->onDelete('cascade');
            $table->foreignId('id_jadwal_jam_kerja')->constrained('jadwal_jam_kerja')->onDelete('cascade');
            $table->date('tanggal');
            $table->time('jam_masuk');
            $table->time('jam_keluar');
            $table->enum('status', ['hadir', 'telat', 'izin', 'alpha']);
            $table->string('keterangan');
            $table->string('bukti');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absensi_pegawai');
    }
};
