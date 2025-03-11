<?php

namespace App\Repositories\User;

interface UserRepositoryInterface
{
    public function findByTelegramId($telegram_id);
}
