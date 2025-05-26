<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\Models\Letter_formats;
use App\Models\Notification;

class Letters extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'letter_format_id',
        'user_id',
        'receiver_user_id',
        'target_role',
        'type',
        'status',
        'name',
    ];

    public function format()
    {
        return $this->belongsTo(Letter_formats::class, 'letter_format_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_user_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
