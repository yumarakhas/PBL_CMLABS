<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    protected $fillable = [
        'employee_id',
        'file_path', 
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
