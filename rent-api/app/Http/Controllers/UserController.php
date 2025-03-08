<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function checkUserExists(Request $request): JsonResponse
    {
        return response()->json(['exists' => true]);
    }
}
