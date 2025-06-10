<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Division;
use App\Models\Position;
use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CompanyDetailsController extends Controller
{
    /**
     * Store company details (branches, divisions, positions)
     */
    public function store(Request $request): JsonResponse
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'company_id' => 'required|integer|exists:companies,id',
            'branches' => 'required|array|min:1',
            'branches.*.name' => 'required|string|max:255',
            'branches.*.branch_address' => 'required|string|max:255',
            'branches.*.branch_phone' => 'required|string|max:255',
            'branches.*.branch_phone_backup' => 'nullable|string|max:255',
            'branches.*.description' => 'nullable|string',
            
            'divisions' => 'required|array|min:1',
            'divisions.*.branch_id' => 'required|integer',
            'divisions.*.name' => 'required|string|max:255',
            'divisions.*.description' => 'nullable|string',
            
            'positions' => 'required|array|min:1',
            'positions.*.division_id' => 'required|integer',
            'positions.*.name' => 'required|string|max:255',
            'positions.*.description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Verify company exists
            $company = Company::findOrFail($request->company_id);
            
            // Check if company details already exist
            $existingBranches = Branch::where('company_id', $request->company_id)->count();
            if ($existingBranches > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Company details already exist. Use update endpoint instead.',
                ], 409);
            }

            DB::transaction(function () use ($request) {
                $companyId = $request->company_id;

                // Store branches
                $branchMapping = [];
                foreach ($request->branches as $index => $branchData) {
                    $branch = Branch::create([
                        'company_id' => $companyId,
                        'name' => $branchData['name'],
                        'branch_address' => $branchData['branch_address'],
                        'branch_phone' => $branchData['branch_phone'],
                        'branch_phone_backup' => $branchData['branch_phone_backup'] ?? null,
                        'description' => $branchData['description'] ?? null,
                    ]);
                    
                    // Map frontend index to database ID
                    $branchMapping[$index] = $branch->id;
                }

                // Store divisions
                $divisionMapping = [];
                foreach ($request->divisions as $index => $divisionData) {
                    // Map branch_id from frontend to actual database ID
                    $branchId = $branchMapping[$divisionData['branch_id']] ?? null;
                    
                    if ($branchId) {
                        $division = Division::create([
                            'branch_id' => $branchId,
                            'name' => $divisionData['name'],
                            'description' => $divisionData['description'] ?? null,
                        ]);
                        
                        // Map frontend index to database ID
                        $divisionMapping[$index] = $division->id;
                    }
                }

                // Store positions
                foreach ($request->positions as $positionData) {
                    // Map division_id from frontend to actual database ID
                    $divisionId = $divisionMapping[$positionData['division_id']] ?? null;
                    
                    if ($divisionId) {
                        Position::create([
                            'division_id' => $divisionId,
                            'name' => $positionData['name'],
                            'description' => $positionData['description'] ?? null,
                        ]);
                    }
                }
            });

            return response()->json([
                'success' => true,
                'message' => 'Company details saved successfully',
                'data' => [
                    'company_id' => $request->company_id
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error saving company details: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get company details by company_id
     */
    public function show($companyId): JsonResponse
    {
        try {
            // Verify company exists
            $company = Company::findOrFail($companyId);

            $branches = Branch::with([
                'divisions.positions'
            ])->where('company_id', $companyId)->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'company' => $company,
                    'branches' => $branches,
                ],
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving company details: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update company details
     */
    public function update(Request $request, $companyId): JsonResponse
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'branches' => 'required|array|min:1',
            'branches.*.id' => 'nullable|integer|exists:branches,id',
            'branches.*.name' => 'required|string|max:255',
            'branches.*.branch_address' => 'required|string|max:255',
            'branches.*.branch_phone' => 'required|string|max:255',
            'branches.*.branch_phone_backup' => 'nullable|string|max:255',
            'branches.*.description' => 'nullable|string',
            
            'divisions' => 'required|array|min:1',
            'divisions.*.id' => 'nullable|integer|exists:divisions,id',
            'divisions.*.branch_id' => 'required|integer',
            'divisions.*.name' => 'required|string|max:255',
            'divisions.*.description' => 'nullable|string',
            
            'positions' => 'required|array|min:1',
            'positions.*.id' => 'nullable|integer|exists:positions,id',
            'positions.*.division_id' => 'required|integer',
            'positions.*.name' => 'required|string|max:255',
            'positions.*.description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Verify company exists
            $company = Company::findOrFail($companyId);

            DB::transaction(function () use ($request, $companyId) {
                // Delete existing data for this company
                Branch::where('company_id', $companyId)->delete();

                // Recreate all data (similar to store method)
                $branchMapping = [];
                foreach ($request->branches as $index => $branchData) {
                    $branch = Branch::create([
                        'company_id' => $companyId,
                        'name' => $branchData['name'],
                        'branch_address' => $branchData['branch_address'],
                        'branch_phone' => $branchData['branch_phone'],
                        'branch_phone_backup' => $branchData['branch_phone_backup'] ?? null,
                        'description' => $branchData['description'] ?? null,
                    ]);
                    
                    $branchMapping[$index] = $branch->id;
                }

                $divisionMapping = [];
                foreach ($request->divisions as $index => $divisionData) {
                    $branchId = $branchMapping[$divisionData['branch_id']] ?? null;
                    
                    if ($branchId) {
                        $division = Division::create([
                            'branch_id' => $branchId,
                            'name' => $divisionData['name'],
                            'description' => $divisionData['description'] ?? null,
                        ]);
                        
                        $divisionMapping[$index] = $division->id;
                    }
                }

                foreach ($request->positions as $positionData) {
                    $divisionId = $divisionMapping[$positionData['division_id']] ?? null;
                    
                    if ($divisionId) {
                        Position::create([
                            'division_id' => $divisionId,
                            'name' => $positionData['name'],
                            'description' => $positionData['description'] ?? null,
                        ]);
                    }
                }
            });

            return response()->json([
                'success' => true,
                'message' => 'Company details updated successfully',
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating company details: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete company details
     */
    public function destroy($companyId): JsonResponse
    {
        try {
            // Verify company exists
            $company = Company::findOrFail($companyId);

            // Delete all branches (cascade will handle divisions and positions)
            Branch::where('company_id', $companyId)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Company details deleted successfully',
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting company details: ' . $e->getMessage(),
            ], 500);
        }
    }
}