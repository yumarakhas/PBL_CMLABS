<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Letters extends Model
{
    use HasFactory;

    protected $fillable = [
        'letter_format_id',
        'user_id',
        'name',
    ];
}
