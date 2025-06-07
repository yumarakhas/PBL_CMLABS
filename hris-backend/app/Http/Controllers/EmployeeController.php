<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Models\Achievement;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Employee::with('achievements');

        if ($request->has('status')) {
            $query->whereIn('status', $request->input('status'));
        }

        if ($request->has('division')) {
            $query->whereIn('division', $request->input('division'));
        }

        if ($request->has('position')) {
            $query->whereIn('position', $request->input('position'));
        }

        if ($request->has('branch')) {
            $query->whereIn('branch', $request->input('branch'));
        }

        return response()->json($query->get()->map(function ($emp) {
            return [
                ...$emp->toArray(),
                'photo_url' => $emp->photo ? asset('storage/' . $emp->photo) : null,
                'Achievements' => $emp->achievements,
                'achievement_files' => $emp->achievements->map(function ($ach) {
                    return [
                        'name' => $ach->original_filename ?? basename($ach->file_path),
                        'url' => asset('storage/' . $ach->file_path),
                    ];
                }),
            ];
        }));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'FirstName' => 'required|string',
            'LastName' => 'required|string',
            'Gender' => 'required|string|in:Male,Female',
            'Address' => 'required|string',
            'PhoneNumber' => 'required|string',
            'Branch' => 'required|string',
            'Position' => 'required|string',
            'Division' => 'required|string',
            'Status' => 'required|string|in:Aktif,Non Aktif',
            'NIK' => 'required|string',
            'LastEducation' => 'required|string',
            'PlaceOfBirth' => 'required|string',
            'BirthDate' => 'required|string',
            'ContractType' => 'required|string',
            'Bank' => 'required|string',
            'BankAccountNumber' => 'required|string',
            'BankAccountHolderName' => 'required|string',
            'photo' => 'required|file|image|mimes:jpg,jpeg,png|max:2048',
            'Notes' => 'nullable|string',

            'Achievements' => 'nullable|array',
            'Achievements.*.file' => 'nullable|file|mimes:pdf,jpg,jpeg,png',
        ]);

        $validated['user_id'] = 1;

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $filename = Str::uuid() . '.' . $photo->getClientOriginalExtension();
            $photoPath = $photo->storeAs('employee_photos', $filename, 'public');
            $validated['photo'] = $photoPath;
        }

        $employee = Employee::create($validated);

        // $achievements = $request->input('Achievements');

        $achievementFiles = $request->file('Achievements', []);
        foreach ($achievementFiles as $achievement) {
            if (isset($achievement['file']) && $achievement['file']) {
                $file = $achievement['file'];
                $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
                $folder = "employee_achievements/{$employee->id}";
                $filePath = $file->storeAs($folder, $fileName, 'public');

                Achievement::create([
                    'employee_id' => $employee->id,
                    'file_path' => $filePath,
                    'original_filename' => $file->getClientOriginalName(),
                ]);
            }
        }

        $employee->photo_url = $employee->photo ? asset('storage/' . $employee->photo) : null;

        return response()->json($employee, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $employee = Employee::findOrFail($id);

        $validated = $request->validate([
            'FirstName' => 'required|string',
            'LastName' => 'required|string',
            'Gender' => 'required|string|in:Male,Female',
            'Address' => 'required|string',
            'PhoneNumber' => 'required|string',
            'Branch' => 'required|string',
            'Position' => 'required|string',
            'Division' => 'required|string',
            'Status' => 'required|string|in:Aktif,Non Aktif',
            'NIK' => 'required|string',
            'LastEducation' => 'required|string',
            'PlaceOfBirth' => 'required|string',
            'BirthDate' => 'required|string',
            'ContractType' => 'required|string',
            'Bank' => 'required|string',
            'BankAccountNumber' => 'required|string',
            'BankAccountHolderName' => 'required|string',
            'photo' => 'nullable|file|image|mimes:jpg,jpeg,png|max:2048',
            'Notes' => 'nullable|string',

            // Achievements
            'Achievements' => 'nullable|array',
            'Achievements.*.file' => 'nullable|file|mimes:pdf,jpg,jpeg,png',
        ]);

        $validated['user_id'] = 1;

        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($employee->photo && Storage::disk('public')->exists($employee->photo)) {
                Storage::disk('public')->delete($employee->photo);
            }

            $photo = $request->file('photo');
            $filename = Str::uuid() . '.' . $photo->getClientOriginalExtension();
            $photoPath = $photo->storeAs('employee_photos', $filename, 'public');
            $validated['photo'] = $photoPath;
        } else {
             unset($validated['photo']);
        }

        $employee->update($validated);

        $achievementFiles = $request->file('Achievements', []);
        foreach ($achievementFiles as $achievement) {
            if (isset($achievement['file']) && $achievement['file']) {
                $file = $achievement['file'];
                $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
                $folder = "employee_achievements/{$employee->id}";
                $filePath = $file->storeAs($folder, $fileName, 'public');

                Achievement::create([
                    'employee_id' => $employee->id,
                    'file_path' => $filePath,
                    'original_filename' => $file->getClientOriginalName(),
                ]);
            }
        }

        $employee->load('achievements');

        $employee->photo_url = $employee->photo ? asset('storage/' . $employee->photo) : null;
        $employee->achievement_files = $employee->achievements->map(function ($achievement) {
            return [
                'id' => $achievement->id,
                'name' => $achievement->original_filename ?? basename($achievement->file_path),
                'url' => asset('storage/' . $achievement->file_path),
                'original_filename' => $achievement->original_filename,
            ];
        });

        return response()->json($employee);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $employee = Employee::with('achievements')->findOrFail($id);

            // Delete employee photo
            if ($employee->photo && Storage::disk('public')->exists($employee->photo)) {
                Storage::disk('public')->delete($employee->photo);
            }

            // Delete achievement files
            foreach ($employee->achievements as $achievement) {
                if ($achievement->file_path && Storage::disk('public')->exists($achievement->file_path)) {
                    Storage::disk('public')->delete($achievement->file_path);
                }
            }

            // Delete achievement folder if empty
            $achievementFolder = "employee_achievements/{$employee->id}";
            if (Storage::disk('public')->exists($achievementFolder)) {
                Storage::disk('public')->deleteDirectory($achievementFolder);
            }

            $employee->delete();

            return response()->json([
                'message' => 'Data pegawai berhasil dihapus',
                'success' => true
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting employee: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to delete employee.',
                'success' => false
            ], 500);
        }
    }

    public function show($id)
    {
        $employee = Employee::with('achievements')->find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        $employee->photo_url = $employee->photo ? asset('storage/' . $employee->photo) : null;

        $employee->achievement_files = $employee->achievements->map(function ($achievement) {
            return [
                'id' => $achievement->id,
                'name' => $achievement->original_filename ?? basename($achievement->file_path),
                'url' => asset('storage/' . $achievement->file_path),
                'original_filename' => $achievement->original_filename,
            ];
        });
        unset($employee->achievements);

        return response()->json($employee);
    }

    public function removeAchievement($id)
    {
        try {
            $achievement = Achievement::findOrFail($id);

            // Delete file from storage
            if ($achievement->file_path && Storage::disk('public')->exists($achievement->file_path)) {
                Storage::disk('public')->delete($achievement->file_path);
            }

            // Delete database record
            $achievement->delete();

            return response()->json([
                'message' => 'Achievement file deleted successfully.',
                'success' => true
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting achievement: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to delete achievement file.',
                'success' => false
            ], 500);
        }
    }
}
