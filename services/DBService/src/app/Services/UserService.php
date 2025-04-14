<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function addUser($data): User
    {
        return User::create($data);
    }

    public function checkUserExists(int $telegram_id): bool
    {
        return User::where('telegram_id', $telegram_id)->exists();
    }

    public function getUserByTelegramId(int $telegram_id): ?User
    {
        return User::where('telegram_id', $telegram_id)->firstOrFail();
    }

    public function getUserById(int $user_id): ?User
    {
        return User::where('id', $user_id)->firstOrFail();
    }
}
