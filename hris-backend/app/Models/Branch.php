<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'company_id',
        'name',
        'branch_address',
        'branch_phone',
        'branch_phone_backup',
        'description',
    ];

    /**
     * Get the company that owns the branch.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the divisions for the branch.
     */
    public function divisions(): HasMany
    {
        return $this->hasMany(Division::class);
    }

    /**
     * Get the employees for the branch.
     */
    public function employees(): HasMany
    {
        // Assuming 'Branch_id' is the foreign key in the 'employees' table
        return $this->hasMany(Employee::class, 'Branch_id');
    }
}