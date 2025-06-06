<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CheckClockSettingController;
use App\Http\Controllers\CheckClockController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LettersController;
use App\Http\Controllers\LetterFormatsController;
use App\Http\Controllers\XenditController;
use Illuminate\Support\Facades\DB;
use App\Models\Letter_formats as ModelsLetter_formats;
use App\Http\Controllers\PackagePlanController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CheckoutController;

Route::get('/package-plans', [PackagePlanController::class, 'index']);

Route::get('companies', [CompanyController::class, 'index']);
Route::get('/company', [CompanyController::class, 'show']);

Route::apiResource('checkouts', CheckoutController::class);

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
    Route::get('/{id}', [EmployeeController::class, 'show']);
    Route::post('/', [EmployeeController::class, 'store']);
    Route::put('/{id}', [EmployeeController::class, 'update']);
    Route::delete('/{id}', [EmployeeController::class, 'destroy']);
    Route::delete('/achievements/{id}', [EmployeeController::class, 'removeAchievement']);
});

Route::prefix('letters')->group(function () {
    Route::get('/', [LettersController::class, 'index']);
    Route::post('/', [LettersController::class, 'store']);
    Route::put('/{id}', [LettersController::class, 'update']);
    Route::delete('/{id}', [LettersController::class, 'destroy']);
});

Route::prefix('letterFormats')->group(function () {
    Route::get('/', [LetterFormatsController::class, 'index']);
    Route::post('/', [LetterFormatsController::class, 'store']);
    Route::put('/{id}', [LetterFormatsController::class, 'update']);
    Route::delete('/{id}', [LetterFormatsController::class, 'destroy']);
});

Route::get('/company', function () {
    $company = DB::table('companies')->first([
        'name',
        'email',
        'head_office_phone',
    ]);

    return response()->json($company);
});

Route::get('/test', function () {
    return response()->json(['message' => 'API works!']);
});
