<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EmployeeAchievement;
use App\Models\Branch;
use App\Models\Division;
use App\Models\Position;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'Company_id',
        'EmployeeID',
        'FirstName',
        'LastName',
        'Gender',
        'Address',
        'PhoneNumber',
        'Company_id',
        'Branch_id',
        'Division_id',
        'Position_id',
        'Status',
        'NIK',
        'LastEducation',
        'PlaceOfBirth',
        'BirthDate',
        'ContractType',
        'Bank',
        'BankAccountNumber',
        'BankAccountHolderName',
        'photo',
        'Notes',
    ];

    public function achievements()
    {
        return $this->hasMany(Achievement::class, 'employee_id');
    }
    public function branch()
    {
        return $this->belongsTo(Branch::class, 'Branch_id');
    }
    public function division()
    {
        return $this->belongsTo(Division::class, 'Division_id');
    }
    public function position()
    {
        return $this->belongsTo(Position::class, 'Position_id');
    }
}
