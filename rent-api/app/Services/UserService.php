<?php

namespace App\Services;

use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;

class UserService
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getUser($telegram_id)
    {
        $user = $this->userRepository->findByTelegramId($telegram_id);
        if ($user) {
            return $user;
        }
        return null;
    }

    public function checkUserExists($telegram_id)
    {
        $user = $this->userRepository->findByTelegramId($telegram_id);
        if ($user) {
            return $user->jsonSerialize();
        }
        return false;
    }
}
