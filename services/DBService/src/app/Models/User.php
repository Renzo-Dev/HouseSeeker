<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $table = 'users';

    protected $fillable = [
        'telegram_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'city',
        'min_price',
        'max_price',
        'min_rooms',
        'max_rooms',
        'description',
    ];

    public function sent_requests()
    {
        return $this->hasMany(SentRequest::class);
    }

    public function subscribe()
    {
        return $this->hasOne(Subscribe::class, 'user_id');
    }
}
