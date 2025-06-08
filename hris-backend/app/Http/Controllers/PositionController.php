<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Position;
use App\Models\Division;
use App\Models\Branch;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;

class PositionController extends Controller
{
    /**
     * Display a listing of positions filtered by company
     */
    public function index(Request $request)
    {
        $companyId = $request->get('company_id', 1); // Default ke 1 untuk testing
        // Nanti bisa diganti dengan: Auth::user()->company_id
        
        $positions = Position::whereHas('division.branch', function($query) use ($companyId) {
                $query->where('company_id', $companyId);
            })
            ->with([
                'division' => function($query) {
                    $query->select('id', 'name', 'branch_id');
                },
                'division.branch' => function($query) {
                    $query->select('id', 'name', 'company_id');
                }
            ])
            ->select('id', 'name', 'division_id', 'description')
            ->orderBy('name')
            ->get();
            
        return response()->json([
            'success' => true,
            'data' => $positions
        ]);
    }

    /**
     * Display the specified position
     */
    public function show(Request $request, $id)
    {
        $companyId = $request->get('company_id', 1); // Default ke 1 untuk testing
        // Nanti bisa diganti dengan: Auth::user()->company_id
        
        $position = Position::whereHas('division.branch', function($query) use ($companyId) {
                $query->where('company_id', $companyId);
            })
            ->with(['division.branch'])
            ->where('id', $id)
            ->first();

        if (!$position) {
            return response()->json([
                'success' => false,
                'message' => 'Position not found or does not belong to your company'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $position
        ]);
    }

    /**
     * Get positions by division (already implemented in EmployeeController)
     */
    public function getByDivision(Request $request, $divisionId)
    {
        $companyId = $request->get('company_id', 1); // Default ke 1 untuk testing
        
        // Validasi bahwa division belongs to company
        $division = Division::whereHas('branch', function($query) use ($companyId) {
            $query->where('company_id', $companyId);
        })->where('id', $divisionId)->first();
        
        if (!$division) {
            return response()->json([
                'success' => false,
                'message' => 'Division not found or does not belong to your company'
            ], 404);
        }
        
        $positions = Position::where('division_id', $divisionId)
            ->select('id', 'name', 'division_id')
            ->orderBy('name')
            ->get();
            
        return response()->json([
            'success' => true,
            'data' => $positions
        ]);
    }

    /**
     * Get positions by branch
     */
    public function getByBranch(Request $request, $branchId)
    {
        $companyId = $request->get('company_id', 1); // Default ke 1 untuk testing
        
        // Validasi bahwa branch belongs to company
        $branch = Branch::where('id', $branchId)
            ->where('company_id', $companyId)
            ->first();
            
        if (!$branch) {
            return response()->json([
                'success' => false,
                'message' => 'Branch not found or does not belong to your company'
            ], 404);
        }
        
        $positions = Position::whereHas('division', function($query) use ($branchId) {
                $query->where('branch_id', $branchId);
            })
            ->with(['division' => function($query) {
                $query->select('id', 'name', 'branch_id');
            }])
            ->select('id', 'name', 'division_id')
            ->orderBy('name')
            ->get();
            
        return response()->json([
            'success' => true,
            'data' => $positions
        ]);
    }

    /**
     * Store a newly created position in storage
     */
    public function store(Request $request)
    {
        $companyId = $request->get('company_id', 1); // Default ke 1 untuk testing
        // Nanti bisa diganti dengan: Auth::user()->company_id

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'division_id' => 'required|exists:divisions,id',
            'description' => 'nullable|string',
        ]);

        // Validasi bahwa division belongs to company
        $division = Division::whereHas('branch', function($query) use ($companyId) {
            $query->where('company_id', $companyId);
        })->where('id', $validated['division_id'])->first();
        
        if (!$division) {
            return response()->json([
                'success' => false,
                'message' => 'Division not found or does not belong to your company'
            ], 404);
        }

        $position = Position::create($validated);

        return response()->json([
            'success' => true,
            'data' => $position,
            'message' => 'Position created successfully'
        ], 201);
    }

    /**
     * Update the specified position in storage
     */
    public function update(Request $request, $id)
    {
        $companyId = $request->get('company_id', 1); // Default ke 1 untuk testing
        // Nanti bisa diganti dengan: Auth::user()->company_id
        
        $position = Position::whereHas('division.branch', function($query) use ($companyId) {
                $query->where('company_id', $companyId);
            })
            ->where('id', $id)
            ->first();

        if (!$position) {
            return response()->json([
                'success' => false,