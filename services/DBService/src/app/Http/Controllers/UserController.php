<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class UserController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function store(Request $request)
    {
        $data = $request->all();
        if ($this->userService->checkUserExists($data['telegram_id'])) {
            return response()->json([
                'message' => 'User exists',
            ], 409);
        }

        $user = $this->userService->addUser($data);
        return response()->json([
            'message' => 'User created',
            'user' => $user,
        ], 201);
    }

    public function check($telegram_id)
    {
        $exists = $this->userService->checkUserExists($telegram_id);
        return response()->json([
            'exists' => $exists,
        ]);
    }

    public function byTelegramId($telegram_id)
    {
        $user = $this->userService->getUserByTelegramId($telegram_id);
        return response()->json($user);
    }

    public function byUserId($userId){
        $user = $this->userService->getUserById($userId);
        return response()->json($user);
    }
}
