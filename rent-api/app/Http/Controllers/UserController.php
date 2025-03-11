<?php

namespace App\Http\Controllers;

use App\Services\ApartmentService;
use App\Services\SubscriptionService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected ApartmentService $apartmentService;
    protected UserService $userService;
    protected SubscriptionService $subscriptionService;

    public function __construct(ApartmentService $apartmentService, UserService $userService, SubscriptionService $subscriptionService)
    {
        $this->apartmentService = $apartmentService;
        $this->userService = $userService;
        $this->subscriptionService = $subscriptionService;
    }

    public function getUserDetails(Request $request)
    {
        $telegram_id = $request->telegram_id;
        $user = $this->userService->getUser($telegram_id);


        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }


        return response()->json([
            'success' => true,
            'data' => [
                "firstNames" => "Test",
            ],
        ]);
    }

    public function create(Request $request)
    {

    }

    public function updateDetails(Request $request)
    {

    }

    public function delete()
    {
    }

    public function checkExists(Request $request): JsonResponse
    {
        $telegram_id = $request->telegram_id;
        // проверяем есть ли пользователь с таким telegram_id в БД
        $user = $this->userService->checkUserExists($telegram_id);
        if ($user) {
            // если пользователь найден, проверяем есть ли у него подписка
            if ($this->subscriptionService->checkSubscription($user)) {
                return response()->json([
                    'user' => true,
                    'subscribe' => true,
                ]);
            }
        }

        return response()->json([
            'user' => false,
            'subscribe' => false,
        ]);
    }
}
