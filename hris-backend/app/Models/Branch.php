<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'name',
        'branch_address',
        'branch_phone',
        'branch_phone_backup',
        'description',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function divisions()
    {
        return $this->hasMany(Division::class);
    }

    public function employees()
    {
        return $this->hasMany(Employee::class, 'Branch_id');
    }
}

