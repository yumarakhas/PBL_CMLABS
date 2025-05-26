<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CheckClockSettingController;
use App\Http\Controllers\CheckClockController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LettersController;
use App\Http\Controllers\LetterFormatsController;
use Illuminate\Notifications\Notification;


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

Route::get('/notifications', function () {
    return Notification::with('letter')
        ->where('user_id', auth()->id())
        ->where('is_read', false)
        ->get();
});

Route::post('/notifications/{id}/read', function ($id) {
    $notif = Notification::where('user_id', auth()->id())->findOrFail($id);
    $notif->update(['is_read' => true]);

    return response()->json(['message' => 'Notifikasi dibaca']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/notifications', function () {
        return Notification::with('letter')
            ->where('user_id', auth()->id())
            ->where('is_read', false)
            ->get();
    });

    Route::post('/notifications/{id}/read', function ($id) {
        $notif = Notification::where('user_id', auth()->id())->findOrFail($id);
        $notif->update(['is_read' => true]);

        return response()->json(['message' => 'Notifikasi dibaca']);
    });
});


Route::get('/test', function () {
    return response()->json(['message' => 'API works!']);
});
