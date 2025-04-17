<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Letters;

class LettersController extends Controller
{
    public function index()
    {
        return Letters::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'letter_format_id' => 'required|exists:letter_format,id' ,
            'name'=> 'required|string',
        ]);

        $letters = Letters::create($validated);
        return response()->json($letters,201);
    }

    public function show(string $id)
    {
        return Letters::findOrFail($id);
    }

    public function update(Request $request, string $id)
    {
        $letters = Letters::findOrFail($id);
        $letters->update($request->all());
        return response()->json($letters, 200);
    }

    public function destroy(string $id)
    {
        Letters::destroy($id);
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
