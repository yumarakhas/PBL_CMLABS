<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Employee::query();

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

        return response()->json($query->get());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request);
        $validated = $request->validate([
            'FirstName' => 'required|string',
            'LastName' => 'required|string',
            'Gender' => 'required|string|in:Male,Female',
            'Address' => 'required|string',
            'PhoneNumber' => 'required|string',
            'Branch' => 'required|string',
            'Position' => 'required|string',
            'Division' => 'required|string',
            'Status' => 'required|string|in:Aktif,Tidak Aktif',
            'NIK' => 'required|string',
            'LastEducation' => 'required|string',
            'PlaceOfBirth' => 'required|string',
            'BirthDate' => 'required|string',
            'ContractType' => 'required|string',
            'Bank' => 'required|string',
            'BankAccountNumber' => 'required|string',
            'BankAccountHolderName' => 'required|string',
            'photo' => 'required|file|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $photo = $request->file('photo');
        $filename = time() . '_' . $photo->getClientOriginalName();
        $photoPath = $request->file('photo')->storeAs('employee_photos', $filename, 'public');
        $validated['photo'] = $photoPath;

        $employee = Employee::create($validated);
        $employee->photo_url = asset('storage/' . $employee->photo);

        return response()->json($employee, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $employee = Employee::findOrFail($id);
        $data = $request->except('photo');

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
        ]);

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $filename = time() . '_' . $photo->getClientOriginalName();
            $photoPath = $photo->storeAs('employee_photos', $filename, 'public');
            $validated['photo'] = $photoPath;
        } else {
            $validated['photo'] = $employee->photo;
        }

        $employee->update($validated);
        $employee->photo_url = asset('storage/' . $employee->photo);

        return response()->json($employee);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Employee::destroy($id);
        return response()->json(['message' => 'Data pegawai berhasil dihapus']);
    }

    public function show($id)
    {
        $employee = Employee::find($id);
        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        $employee->photo_url = asset('storage/' . $employee->photo);

        return response()->json($employee);
    }
}
