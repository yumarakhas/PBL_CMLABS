<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Company;

class CompanyController extends Controller
{
    public function index()
    {
        // Mengambil semua data perusahaan
        return response()->json(Company::all());
    }
}
