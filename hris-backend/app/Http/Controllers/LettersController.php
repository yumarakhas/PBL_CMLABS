<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Letters;
use App\Models\User;
use App\Models\Notification; 

class LettersController extends Controller
{
    public function index()
    {
        return Letters::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'letter_format_id' => 'required|exists:letter_formats,id',
            'name' => 'required|string',
            'file' => 'required|file',
            'type' => 'required|in:arsip,kirim',
            'target_role' => 'nullable|in:admin,employee',
        ]);

        $path = $request->file('file')->store('letters', 'public');

        $letter = Letters::create([
            'letter_format_id' => $request->letter_format_id,
            'user_id' => auth()->id(),
            'name' => $request->name,
            'file_path' => $path,
            'type' => $request->type,
            'target_role' => $request->target_role,
            'is_sent' => $request->type === 'kirim',
        ]);

        // Jika dikirim, buat notifikasi ke semua user dengan role target
        if ($letter->is_sent && $letter->target_role) {
            $receivers = User::where('role', $letter->target_role)->get();

            foreach ($receivers as $receiver) {
                Notification::create([
                    'user_id' => $receiver->id,
                    'letter_id' => $letter->id,
                ]);
            }
        }

        return response()->json(['message' => 'Surat berhasil disimpan', 'data' => $letter], 201);
    }

    public function show(string $id)
    {
        return Letters::findOrFail($id);
    }

    public function update(Request $request, string $id)
    {
        $letter = Letters::findOrFail($id);
        $letter->update($request->all());
        return response()->json($letter, 200);
    }

    public function destroy(string $id)
    {
        Letters::destroy($id);
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
