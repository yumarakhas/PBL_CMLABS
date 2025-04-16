<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CheckClockSettingController;
use App\Http\Controllers\CheckClockController;
use App\Http\Controllers\EmployeeController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::apiResource('pegawai', InformasiPegawaiController::class);
// Route::get('/pegawai', [App\Http\Controllers\InformasiPegawaiController::class]);

// API Check Clock
Route::prefix('check-clock-settings')->group(function () {
    Route::get('/', [CheckClockSettingController::class, 'index']);
    Route::post('/', [CheckClockSettingController::class, 'store']);
    Route::put('/{id}', [CheckClockSettingController::class, 'update']);
    Route::delete('/{id}', [CheckClockSettingController::class, 'destroy']);
});

Route::prefix('check-clocks')->group(function () {
    Route::get('/', [CheckClockController::class, 'index']);
    Route::post('/', [CheckClockController::class, 'store']);
    Route::put('/{id}', [CheckClockController::class, 'update']);
    Route::delete('/{id}', [CheckClockController::class, 'destroy']);
    Route::get('/report', [CheckClockController::class, 'report']);
});

Route::prefix('employee')->group(function () {
    Route::get('/', [EmployeeController::class, 'index']);
    Route::post('/', [EmployeeController::class, 'store']);
    Route::put('/{id}', [EmployeeController::class, 'update']);
    Route::delete('/{id}', [EmployeeController::class, 'destroy']);
});
