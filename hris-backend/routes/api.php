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
use App\Models\Letter_formats as ModelsLetter_formats; // Ini sepertinya typo, biasanya LetterFormat
use App\Http\Controllers\PackagePlanController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CheckClockExportController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\CompanyDetailsController;
use App\Http\Middleware\StepValidationMiddleware;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TopBarController;
use App\Http\Controllers\Auth\EmployeeAuthController; // Pastikan ini di-import

Route::get('companies', [CompanyController::class, 'index']);
Route::get('/company', [CompanyController::class, 'show']);
Route::get('/position-branch-company', [App\Http\Controllers\DropDownController::class, 'getPositionBranchCompany']);

// --- Rute untuk Admin ---
Route::prefix('admin')->group(function () {
    Route::post('/register', [AdminAuthController::class, 'register']);
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::get('/google', [AdminAuthController::class, 'redirectToGoogle']);
    Route::get('/google/callback', [AdminAuthController::class, 'handleGoogleCallback']);
  
  Route::get('companies', [CompanyController::class, 'index']);
  Route::get('/company', [CompanyController::class, 'show']);

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

Route::get('/package-plans', [PackagePlanController::class, 'index']);
Route::get('/companies', [CompanyController::class, 'index']); // Mengambil daftar perusahaan
Route::get('/company', [CompanyController::class, 'show']); // Mengambil detail perusahaan tertentu (perlu parameter?)
Route::apiResource('checkouts', CheckoutController::class); // Rute RESTful untuk checkout


// Step 1 CompanyProfile
Route::get('/company/me', [CompanyController::class, 'getAuthenticatedCompany']);

// Order (Pemesanan & Pembayaran)
Route::post('/orders', [PackageController::class, 'createOrder']);
Route::get('/orders/{orderId}', [PackageController::class, 'getOrderWithCompany']);
Route::post('/orders/{orderId}/confirm-payment', [PackageController::class, 'confirmPayment']);

// Company Info
Route::get('/company/fixed', [PackageController::class, 'getCompanyForCheckout']);
Route::post('/companies', [CompanyController::class, 'store']);
Route::get('/companies/{id}', [CompanyController::class, 'show']);

Route::prefix('packages')->group(function () {
    Route::get('/', [PackageController::class, 'getPackages']);
    Route::get('/company', [PackageController::class, 'getAuthenticatedCompany']);
    Route::post('/order', [PackageController::class, 'createOrder']);
    Route::get('/order/{orderId}', [PackageController::class, 'getOrderWithCompany']);
    Route::put('/order/{orderId}', [PackageController::class, 'updateOrder']);
    Route::post('/order/{orderId}/payment', [PackageController::class, 'createPayment']);
    Route::get('/order/{orderId}/payment/{paymentId}/status', [PackageController::class, 'checkPaymentStatus']);
});

Route::prefix('company-details')->group(function () {
    Route::get('/subscription-info', [CompanyDetailsController::class, 'getSubscriptionInfo']);
    Route::get('/branches', [CompanyDetailsController::class, 'getBranches']);
    Route::post('/', [CompanyDetailsController::class, 'store']);
});



// Webhook Routes (should be outside any auth middleware)
Route::post('/webhook/xendit', [PaymentController::class, 'handleWebhook']);

// Payment success/failure redirect routes (for frontend)
Route::get('/payment/success', function (Request $request) {
    return redirect(config('app.frontend_url') . '/payment/success?' . http_build_query($request->all()));
});

Route::get('/payment/failed', function (Request $request) {
    return redirect(config('app.frontend_url') . '/payment/failed?' . http_build_query($request->all()));
});

Route::prefix('employee')->group(function () {
    Route::get('/', [EmployeeController::class, 'index']);
    Route::get('/{id}', [EmployeeController::class, 'show']);
    Route::post('/', [EmployeeController::class, 'store']);
    Route::put('/{id}', [EmployeeController::class, 'update']);
    Route::delete('/{id}', [EmployeeController::class, 'destroy']);
    Route::delete('/achievements/{id}', [EmployeeController::class, 'removeAchievement']);
    Route::get('/subscription/status', [EmployeeController::class, 'getSubscriptionStatus']);
});


Route::get('/position-branch-company', [App\Http\Controllers\DropDownController::class, 'getPositionBranchCompany']);

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

Route::get('/companies', function () {
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
