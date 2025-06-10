<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:companies,email',
            'head_office_phone' => 'required|string|max:20',
            'head_office_phone_backup' => 'nullable|string|max:20',
            'head_office_address' => 'required|string|max:500',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $company = Company::create($validator->validated());

        return response()->json([
            'message' => 'Company created successfully',
            'data' => $company
        ], 201);
    }

    public function show($id)
    {
        $company = \App\Models\Company::find($id);
        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }
        return response()->json($company);
    }
}

