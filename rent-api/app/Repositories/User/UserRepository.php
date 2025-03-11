<?php

namespace App\Repositories\User;

use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function findByTelegramId($telegram_id)
    {
        return User::where('telegram_id', $telegram_id)->first();
    }
}
