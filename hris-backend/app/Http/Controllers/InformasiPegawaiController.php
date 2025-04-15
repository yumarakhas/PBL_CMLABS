<?php

namespace App\Http\Controllers;

use App\Models\InformasiPegawai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class InformasiPegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return InformasiPegawai::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_user' => 'required|exists:users,id',
            'nama_pegawai' => 'required|string',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'no_telp' => 'required|string',
            'email' => 'required|email|unique:informasi_pegawai,email',
            'nama_ibu' => 'required|string',
            'alamat_ibu' => 'required|string',
            'password' => 'required|string|min:8',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $pegawai = InformasiPegawai::create($validated);

        return response()->json($pegawai, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return InformasiPegawai::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InformasiPegawai $informasiPegawai)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pegawai = InformasiPegawai::findOrFail($id);

        $pegawai->update($request->all());

        return response()->json($pegawai);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        InformasiPegawai::destroy($id);

        return response()->json(['message' => 'Data pegawai berhasil dihapus']);
    }
}
