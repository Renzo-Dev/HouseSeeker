<?php

namespace App\Services;


class SubscribeService
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    function addSubscribeByTelegramId($telegram_id)
    {
    }

    function addSubscribeByUserId($user_id)
    {
    }

    function getActiveSubscribes()
    {

    }

    function checkSubscribeByTelegramId($telegram_id)
    {

    }

    function checkSubscribeByUserId($user_id)
    {

    }
}
