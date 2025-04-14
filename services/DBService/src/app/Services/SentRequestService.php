<?php

namespace App\Services;


class SentRequestService
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    function addSentRequest($data)
    {
        $user = $this->userService->getUserById($data['user_id']);
        if ($user) {
            // Добавляем запрос в массив sent_requests
            $user->sent_requests()->create([
                'house_id' => $data['house_id'],
                'link' => $data['link'],
            ]);
            return $user;
        }
        return null;
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

    function getAllSentRequestsByUserId($id)
    {
        $user = $this->userService->getUserById($id);
        if ($user) {
            // Получаем все отправленные запросы для пользователя
            return $user->sent_requests;
        }
        return [];
    }
}
