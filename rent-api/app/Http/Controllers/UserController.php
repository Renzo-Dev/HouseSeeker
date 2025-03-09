<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function checkUserExists(Request $request): JsonResponse
    {
        // проверка есть ли пользователь с таким telegram_id в бд
        $user = false;
        if ($user) {
            return response()->json([
                'exists' => true
            ]);
        }
        return response()->json([
            'exists' => false
        ],
        );
    }
}
