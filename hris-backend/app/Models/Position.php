<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Position extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'division_id',
        'name',
        'description',
    ];

    /**
     * Get the division that owns the position.
     */
    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class);
    }

    /**
     * Get the employees for the position.
     */
    public function employees(): HasMany
    {
        // Assuming 'Position_id' is the foreign key in the 'employees' table
        return $this->hasMany(Employee::class, 'Position_id');
    }
}