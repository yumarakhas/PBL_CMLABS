<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Position extends Model
{
    use HasFactory;

    protected $fillable = [
        'division_id',
        'name',
        'description',
    ];

    public function division()
    {
        return $this->belongsTo(Division::class);
    }

    public function employees()
    {
        return $this->hasMany(Employee::class, 'Position_id');
    }
}
