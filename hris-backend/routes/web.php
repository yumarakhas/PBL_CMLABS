<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InformasiPegawaiController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/pegawai', [InformasiPegawaiController::class ,'index']);
