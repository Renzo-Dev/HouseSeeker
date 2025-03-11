<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'telegram_id',
        'firstName',
        'lastName',
        'phone',
        'email',
        'city',
        'min_price',
        'max_price',
        'rooms_count',
        'description'
    ];

    // связь с подписками
    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }
}
