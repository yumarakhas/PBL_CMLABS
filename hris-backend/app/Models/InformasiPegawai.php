<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InformasiPegawai extends Model
{
    protected $table = 'informasi_pegawai';

    protected $fillable = [
        'id_user',
        'nama_pegawai',
        'jenis_kelamin',
        'tanggal_lahir',
        'alamat',
        'no_telp',
        'email',
        'nama_ibu',
        'alamat_ibu',
        'password',
    ];
}
