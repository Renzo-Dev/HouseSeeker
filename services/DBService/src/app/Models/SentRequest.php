<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SentRequest extends Model
{
    use HasFactory;

    protected $table = 'sent_requests';
    protected $fillable = [
        'user_id',
        'house_id',
        'link'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
