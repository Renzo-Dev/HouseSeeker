<?php

namespace App\Services;


use App\Models\Subscribe;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

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

    function getActiveSubscribes(): Collection|JsonResponse
    {
        try {
            return Subscribe::all();
        } catch (\Exception $exception) {
            return response()->json(['error' => 'Failed to retrieve subscribes'], 500);
        }
    }

    function checkSubscribeByTelegramId($telegram_id)
    {
        try {
            $user = $this->userService->getUserByTelegramId($telegram_id);
            if ($user) {
                $subscribe = $user->subscribe;
                if ($subscribe) {
                    return $subscribe->status;
                }
            }
            return false;
        } catch (\Exception $exception) {
            return response()->json(['error' => 'Failed to check subscribe'], 500);
        }
    }

    function checkSubscribeByUserId($user_id)
    {
        try {
            $user = $this->userService->getUserById($user_id);
            if ($user) {
                $subscribe = $user->subscribe;
                if ($subscribe) {
                    return $subscribe->status;
                }
            }
            return false;
        } catch (\Exception $exception) {
            return response()->json(['error' => 'Failed to check subscribe'], 500);
        }
    }
}
