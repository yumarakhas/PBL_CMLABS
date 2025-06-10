<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        // ... other fillable fields from your migration
        'user_id',
        'FirstName',
        'LastName',
        'Gender',
        'Address',
        'PhoneNumber',
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
        'EmployeeID', // Ensure this is fillable
    ];

    /**
     * Get the user that owns the employee.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Add relationships to Branch, Division, Position if needed
    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class, 'Branch_id');
    }

    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class, 'Division_id');
    }

    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class, 'Position_id');
    }
}