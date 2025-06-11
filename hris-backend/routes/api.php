<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CheckClockSettingTimesController;
use App\Http\Controllers\CheckClockSettingsController;
use App\Http\Controllers\CheckClocksController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LettersController;
use App\Http\Controllers\LetterFormatsController;
use App\Http\Controllers\XenditController;
use Illuminate\Support\Facades\DB;
use App\Models\Letter_formats as ModelsLetter_formats;
use App\Http\Controllers\PackagePlanController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CheckClockExportController;

Route::get('/package-plans', [PackagePlanController::class, 'index']);

Route::get('companies', [CompanyController::class, 'index']);
Route::get('/company', [CompanyController::class, 'show']);
Route::get('/position-branch-company', [App\Http\Controllers\DropDownController::class, 'getPositionBranchCompany']);

Route::apiResource('checkouts', CheckoutController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::apiResource('pegawai', InformasiPegawaiController::class);
// Route::get('/pegawai', [App\Http\Controllers\InformasiPegawaiController::class]);

// API Check Clock
// Route untuk CheckClockSetting (pengaturan shift)
// Route::apiResource('checkclocksettings', CheckClockSettingsController::class);

// Route untuk CheckClockSettingTime (jam shift)
// Route::apiResource('checkclocksettingtimes', CheckClockSettingTimesController::class);

Route::apiResource('work-settings', CheckClockSettingsController::class, [
    'except' => ['edit', 'create'] // Tidak perlu untuk API
]);

Route::get('/checkclocks/export', [CheckClockExportController::class, 'export']);

// Route untuk CheckClock (absensi)
Route::prefix('checkclocks')->group(function () {
    Route::get('/', [CheckClocksController::class, 'index']);
    Route::post('/', [CheckClocksController::class, 'store']);
    Route::get('/{id}', [CheckClocksController::class, 'show']);
    Route::put('/{id}', [CheckClocksController::class, 'update']);
    Route::delete('/{id}', [CheckClocksController::class, 'destroy']);
    
    // Additional routes for approval
    Route::put('/{id}/approve', [CheckClocksController::class, 'approve']);
    Route::put('/{id}/reject', [CheckClocksController::class, 'reject']);
});

Route::post('/companies', [CompanyController::class, 'store']);

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
