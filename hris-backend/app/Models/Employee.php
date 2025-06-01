<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EmployeeAchievement;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'FirstName',
        'LastName',
        'Gender',
        'Address',
        'PhoneNumber',
        'Branch',
        'Position',
        'Division',
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
}
