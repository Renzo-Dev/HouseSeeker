<?php

namespace App\Http\Controllers;

use App\Services\SubscribeService;
use Illuminate\Http\JsonResponse;

class SubscribesController extends Controller
{
    protected SubscribeService $subscribeService;

    public function __construct(SubscribeService $subscribeService)
    {
        $this->subscribeService = $subscribeService;
    }

    /**
     * Возвращает активные подписки.
     *
     * @return JsonResponse
     */
    public function getActiveSubscribes(): JsonResponse
    {
        $subscribes = $this->subscribeService->getActiveSubscribes();
        return response()->json($subscribes);
    }

    /**
     * Проверка подписки по Telegram ID.
     *
     * @param int|string $telegram_id
     * @return JsonResponse
     */
    public function checkSubscribeByTelegramId($telegram_id): JsonResponse
    {
        return $this->checkSubscribe(function () use ($telegram_id) {
            return $this->subscribeService->checkSubscribeByTelegramId($telegram_id);
        });
    }

    /**
     * Проверка подписки по User ID.
     *
     * @param int|string $user_id
     * @return JsonResponse
     */
    public function checkSubscribeByUserId($user_id): JsonResponse
    {
        return $this->checkSubscribe(function () use ($user_id) {
            return $this->subscribeService->checkSubscribeByUserId($user_id);
        });
    }

    /**
     * Обёртка для проверки подписки с обработкой исключений.
     *
     * @param callable $callback
     * @return JsonResponse
     */
    protected function checkSubscribe(callable $callback): JsonResponse
    {
        try {
            $status = $callback();
            return response()->json(['status' => (bool) $status]);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Failed to check subscribe'], 500);
        }
    }
}
