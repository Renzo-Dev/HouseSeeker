<?php

namespace App\Services;

use App\Models\SentRequest;

class SentRequestService
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    function addSentRequest($data)
    {
        try {
            $sentData = [
                'user_id' => $data['user_id'],
                'house_id' => $data['house_id'],
                'link' => $data['link'],
            ];
            Sentrequest::create($sentData);
        } catch (\Exception $e) {
            throw new \Exception('Error adding sent request: ' . $e->getMessage());
        }
    }

    function getAllSentRequestsByTelegramId($telegram_id)
    {
        $user = $this->userService->getUserByTelegramId($telegram_id);
        if ($user) {
            return $user->sent_requests;
        }

        // Если пользователь не найден, возвращаем пустой массив
        return [];
    }

    function getAllSentRequestsByUserId($user_id)
    {
        $user = $this->userService->getUserById($user_id);
        if ($user) {
            // Получаем все отправленные запросы для пользователя
            return $user->sent_requests;
        }
        return [];
    }
}
