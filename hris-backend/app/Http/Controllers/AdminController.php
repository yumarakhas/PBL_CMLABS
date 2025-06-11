<?php

namespace App\Http\Controllers;

use App\Models\Admin; // Import model Admin jika Anda menggunakannya untuk guard 'admin'
use App\Models\User;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule; // Tambahkan ini untuk validasi unique

class AdminController extends Controller
{
    /**
     * Menampilkan profil admin yang sedang login.
     * Menggunakan guard 'admin' untuk otentikasi admin.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
    {
        return response()->json($request->user('admin')); // Menggunakan guard 'admin'
    }

    /**
     * Memperbarui profil admin yang sedang login.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        $admin = $request->user('admin'); // Dapatkan admin yang sedang login

        // Jika Anda menggunakan tabel 'users' untuk admin (dengan role 'admin'),
        // maka Anda perlu mendapatkan user tersebut dan memastikan rolenya 'admin'.
        // Contoh: $user = $request->user(); if ($user->role !== 'admin') abort(403);
        // Namun, jika Anda menggunakan guard 'admin' dengan model 'Admin', kode ini sudah benar.

        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'email'         => ['required', 'email', Rule::unique('admin', 'email')->ignore($admin->id)], // Gunakan Rule::unique untuk email admin
            'phone_number'  => 'nullable|string|max:20',
            'password'      => 'nullable|string|min:6',
            'profile_photo' => 'nullable|image|max:2048', // Max 2MB
        ]);

        // Handle upload foto profil
        if ($request->hasFile('profile_photo')) {
            // Hapus foto lama jika ada
            if ($admin->profile_photo && Storage::disk('public')->exists('photos/' . $admin->profile_photo)) {
                Storage::disk('public')->delete('photos/' . $admin->profile_photo);
            }

            $file = $request->file('profile_photo');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('photos', $filename, 'public'); // Simpan di storage/app/public/photos
            $admin->profile_photo = $filename;
        }

        $admin->name = $validated['name'];
        $admin->email = $validated['email'];
        // Pastikan kolom 'phone' juga ada di model Admin Anda sesuai migrasi
        $admin->phone_number = $validated['phone_number'] ?? $admin->phone_number;

        if (!empty($validated['password'])) {
            $admin->password = Hash::make($validated['password']);
        }

        $admin->save();

        return response()->json([
            'message' => 'Profile admin berhasil diperbarui',
            'admin' => $admin->fresh() // Mengembalikan data admin terbaru
        ], 200);
    }

    /**
     * Membuat akun karyawan baru oleh admin.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createEmployee(Request $request)
    {
        $request->validate([
            'email'                 => 'required|email|unique:users,email', // Email harus unik di tabel users
            'password'              => 'required|min:8',
            'FirstName'             => 'required|string',
            'LastName'              => 'required|string',
            'EmployeeID'            => 'required|string|unique:employees,EmployeeID', // EmployeeID harus unik
            'company_id'            => 'nullable|exists:companies,id', // Opsional, sesuaikan kebutuhan
            'Branch_id'             => 'required|exists:branches,id',
            'Division_id'           => 'required|exists:divisions,id',
            'Position_id'           => 'required|exists:positions,id',
            'Gender'                => 'required|string',
            'Address'               => 'required|string',
            'PhoneNumber'           => 'required|string',
            'Status'                => 'required|string',
            'NIK'                   => 'required|string',
            'LastEducation'         => 'required|string',
            'PlaceOfBirth'          => 'required|string',
            'BirthDate'             => 'required|date',
            'ContractType'          => 'required|string',
            'Bank'                  => 'required|string',
            'BankAccountNumber'     => 'required|string',
            'BankAccountHolderName' => 'required|string',
            'photo'                 => 'nullable|string', // Untuk saat ini asumsikan URL atau nama file
            'Notes'                 => 'nullable|string',
            // Tambahkan validasi untuk bidang employee lainnya
        ]);

        // 1. Buat record di tabel `users` (untuk login karyawan)
        $user = User::create([
            'company_id' => $request->company_id, // Gunakan company_id dari request, atau dari admin yang login
            'name'       => $request->FirstName . ' ' . $request->LastName, // Gabungkan nama depan dan belakang
            'email'      => $request->email,
            'password'   => Hash::make($request->password),
            'role'       => 'employee', // Tetapkan peran sebagai 'employee'
        ]);

        // 2. Buat record di tabel `employees` (untuk detail karyawan)
        Employee::create([
            'user_id'             => $user->id, // Tautkan ke user yang baru dibuat
            'EmployeeID'          => $request->EmployeeID,
            'FirstName'           => $request->FirstName,
            'LastName'            => $request->LastName,
            'Gender'              => $request->Gender,
            'Address'             => $request->Address,
            'PhoneNumber'         => $request->PhoneNumber,
            'Status'              => $request->Status,
            'NIK'                 => $request->NIK,
            'LastEducation'       => $request->LastEducation,
            'PlaceOfBirth'        => $request->PlaceOfBirth,
            'BirthDate'           => $request->BirthDate,
            'ContractType'        => $request->ContractType,
            'Bank'                => $request->Bank,
            'BankAccountNumber'   => $request->BankAccountNumber,
            'BankAccountHolderName' => $request->BankAccountHolderName,
            'photo'               => $request->photo ?? null, // Simpan nama file foto jika ada
            'Notes'               => $request->Notes,
            'Branch_id'           => $request->Branch_id,
            'Division_id'         => $request->Division_id,
            'Position_id'         => $request->Position_id,
        ]);

        return response()->json([
            'message' => 'Akun karyawan dan profil berhasil dibuat.',
            'user'    => $user,
            'employee' => $user->employee, // Jika relasi employee sudah ada di model User
        ], 201); // 201 Created
    }
}