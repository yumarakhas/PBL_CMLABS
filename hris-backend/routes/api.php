<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InformasiPegawaiController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::apiResource('pegawai', InformasiPegawaiController::class);
Route::get('/pegawai', [App\Http\Controllers\InformasiPegawaiController::class]);