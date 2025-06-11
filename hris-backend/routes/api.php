<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\CheckClockSettingController;
use App\Http\Controllers\CheckClockController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LettersController;
use App\Http\Controllers\LetterFormatsController;
use App\Http\Controllers\XenditController;
use App\Http\Controllers\PackagePlanController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TopBarController;
use App\Http\Controllers\Auth\EmployeeAuthController;

// --- Rute untuk Admin ---
Route::prefix('admin')->group(function () {
    
    // Public routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/google', [AuthController::class, 'redirectToGoogle']);
    Route::get('/google/callback', [AuthController::class, 'handleGoogleCallback']);

    // Protected routes (auth + role admin)
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/profile', [AdminController::class, 'profile']);
        Route::put('/profile/update', [AdminController::class, 'update']);
        Route::post('/logout', [AuthController::class, 'logout']); // Dipindah ke dalam prefix dan group yang sesuai
    });

});

// Rute publik lainnya
Route::get('/package-plans', [PackagePlanController::class, 'index']);
Route::get('/companies', [CompanyController::class, 'index']);
Route::get('/company', [CompanyController::class, 'show']);
Route::post('/companies', [CompanyController::class, 'store']);
Route::apiResource('checkouts', CheckoutController::class);

Route::get('/test', fn () => response()->json(['message' => 'API works!']));

Route::get('/company-info', function () {
    $company = DB::table('companies')->first([
        'name',
        'email',
        'head_office_phone',
    ]);
    return response()->json($company);
});

// Rute untuk Employee 
Route::prefix('employee')->group(function () {
    Route::get('/', [EmployeeController::class, 'index']);
    Route::get('/{id}', [EmployeeController::class, 'show']);
    Route::post('/', [EmployeeController::class, 'store']);
    Route::put('/{id}', [EmployeeController::class, 'update']);
    Route::delete('/{id}', [EmployeeController::class, 'destroy']);
    Route::delete('/achievements/{id}', [EmployeeController::class, 'removeAchievement']);
});

// Rute surat menyurat umum
Route::prefix('letters')->group(function () {
    Route::get('/', [LettersController::class, 'index']);
    Route::post('/', [LettersController::class, 'store']);
    Route::put('/{id}', [LettersController::class, 'update']);
    Route::delete('/{id}', [LettersController::class, 'destroy']);
});

// --- Rute untuk Pengguna Umum / Karyawan ---
Route::prefix('user')->group(function () {
    Route::post('/login', [EmployeeAuthController::class, 'store']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', fn (Request $request) => $request->user()->load('employee'));

        // Karyawan: Clock setting
        Route::prefix('check-clock-settings')->group(function () {
            Route::get('/', [CheckClockSettingController::class, 'index']);
            Route::post('/', [CheckClockSettingController::class, 'store']);
            Route::put('/{id}', [CheckClockSettingController::class, 'update']);
            Route::delete('/{id}', [CheckClockSettingController::class, 'destroy']);
        });

        // Karyawan: Clock in/out
        Route::prefix('check-clocks')->group(function () {
            Route::get('/', [CheckClockController::class, 'index']);
            Route::post('/', [CheckClockController::class, 'store']);
            Route::put('/{id}', [CheckClockController::class, 'update']);
            Route::delete('/{id}', [CheckClockController::class, 'destroy']);
            Route::get('/report', [CheckClockController::class, 'report']);
        });

        // Karyawan: Employee data
        Route::prefix('employees')->group(function () {
            Route::get('/', [EmployeeController::class, 'index']);
            Route::get('/{id}', [EmployeeController::class, 'show']);
            Route::put('/{id}', [EmployeeController::class, 'update']);
            Route::delete('/{id}', [EmployeeController::class, 'destroy']);
            Route::delete('/achievements/{id}', [EmployeeController::class, 'removeAchievement']);
        });

        // Karyawan: Letters
        Route::prefix('letters')->group(function () {
            Route::get('/', [LettersController::class, 'index']);
            Route::post('/', [LettersController::class, 'store']);
            Route::put('/{id}', [LettersController::class, 'update']);
            Route::delete('/{id}', [LettersController::class, 'destroy']);
        });

        // Karyawan: Letter formats
        Route::prefix('letterFormats')->group(function () {
            Route::get('/', [LetterFormatsController::class, 'index']);
            Route::post('/', [LetterFormatsController::class, 'store']);
            Route::put('/{id}', [LetterFormatsController::class, 'update']);
            Route::delete('/{id}', [LetterFormatsController::class, 'destroy']);
        });
    });
});
