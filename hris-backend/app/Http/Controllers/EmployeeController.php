<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Symfony\Contracts\Service\Attribute\Required;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Employee::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'ck_setting_id' => 'required|exists:check_clock_setting,id',
            'FirstName' => 'required|string',
            'LastName' => 'required|string',
            'Gender' => 'required|boolean|max:1',
            'Address' => 'required|string',
            'PhoneNumber' => 'required|string',
            'Branch' => 'required|string',
            'Position' => 'required|string',
            'Dvision' => 'required|string',
            'Status' => 'required|boolean',
            'NIK' => 'required|string',
            'LastEducation' => 'required|string',
            'PlaceOfBirth' => 'required|string',
            'DateOfBirth' => 'required|string',
            'ContractType' => 'required|string',
            'Bank' => 'required|string',
            'BankAccountNumber' => 'required|string',
            'BankAccountHolderName' => 'required|string',
            'photo' => 'nullable|string',
        ]);

        $employee = Employee::create($validated);
        return response()->json($employee, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $employee = Employee::findOrFail($id);
        $employee->update($request->all());
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
}
