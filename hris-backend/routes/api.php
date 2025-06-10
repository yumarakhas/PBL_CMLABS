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
use App\Models\Letter_formats as ModelsLetter_formats; // Ini sepertinya typo, biasanya LetterFormat
use App\Http\Controllers\PackagePlanController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TopBarController;
use App\Http\Controllers\Auth\EmployeeAuthController; // Pastikan ini di-import

// --- Rute untuk Admin ---
Route::prefix('admin')->group(function () {
    Route::post('/register', [AdminAuthController::class, 'register']);
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::get('/google', [AdminAuthController::class, 'redirectToGoogle']);
    Route::get('/google/callback', [AdminAuthController::class, 'handleGoogleCallback']);

    Route::middleware('auth:sanctum')->group(function () {
        // Rute untuk profil admin
        Route::get('/profile', [AdminController::class, 'show']);
        Route::put('/profile/update', [AdminController::class, 'update']); // Menggunakan PUT untuk update
        Route::post('/admin/logout', [AdminAuthController::class, 'logout']); // Logout admin
        // TopBarController logout, perlu diklarifikasi apakah ini untuk admin atau user umum
        // Jika hanya untuk admin, tempatkan di sini. Jika umum, bisa di rute umum.
        Route::post('/logout', [TopBarController::class, 'logout']); // Perhatikan ini, mungkin duplikasi atau tujuan berbeda

        // Rute untuk admin membuat akun karyawan baru (dipindahkan dari AdminController sebelumnya)
        // Di sini diasumsikan AdminController juga menangani pembuatan Employee
        Route::post('/employees', [AdminController::class, 'createEmployee']); // Tambahan rute ini
    });
});


Route::get('/package-plans', [PackagePlanController::class, 'index']);
Route::get('/companies', [CompanyController::class, 'index']); // Mengambil daftar perusahaan
Route::get('/company', [CompanyController::class, 'show']); // Mengambil detail perusahaan tertentu (perlu parameter?)
Route::apiResource('checkouts', CheckoutController::class); // Rute RESTful untuk checkout

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


// Rute test API
Route::get('/test', function () {
    return response()->json(['message' => 'API works!']);
});

// Rute untuk mendapatkan informasi perusahaan dari DB (jika ini berbeda dari /company di atas)
Route::get('/company-info', function () {
    $company = DB::table('companies')->first([
        'name',
        'email',
        'head_office_phone',
    ]);
    return response()->json($company);
});


// --- Rute untuk Pengguna Umum/Karyawan (User) ---
Route::prefix('user')->group(function () {
    // Rute login karyawan (public, tidak perlu auth:sanctum)
    Route::post('/login', [EmployeeAuthController::class, 'store']);

    // Rute-rute yang membutuhkan otentikasi Sanctum untuk user (karyawan)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', function (Request $request) {
            // Mengembalikan data user yang sedang login (termasuk relasi employee)
            return $request->user()->load('employee');
        });
        Route::post('/logout', [EmployeeAuthController::class, 'destroy']); // Logout karyawan

        // API Check Clock (pastikan ini diatur untuk user/karyawan, bukan admin)
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

        Route::prefix('employees')->group(function () {
            Route::get('/', [EmployeeController::class, 'index']); // Mungkin hanya untuk admin atau karyawan dengan izin khusus
            Route::get('/{id}', [EmployeeController::class, 'show']); // Bisa untuk melihat profil sendiri atau admin melihat profil orang lain
            // Route::post('/', [EmployeeController::class, 'store']); // Ini mungkin lebih cocok di route admin untuk createEmployee
            Route::put('/{id}', [EmployeeController::class, 'update']); // Karyawan bisa update diri sendiri, atau admin update karyawan lain
            Route::delete('/{id}', [EmployeeController::class, 'destroy']); // Umumnya hanya admin
            Route::delete('/achievements/{id}', [EmployeeController::class, 'removeAchievement']);
        });

        // Rute untuk surat-menyurat (letters dan letter formats)
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

    }); // Akhir dari middleware auth:sanctum untuk user
}); // Akhir dari prefix user