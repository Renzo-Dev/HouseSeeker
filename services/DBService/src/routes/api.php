<?php

//use App\Http\Controllers\UserController;
//use Illuminate\Support\Facades\Route;
//
//Route::prefix('users')->group(function () {
//    Route::post('/', [UserController::class, 'store']);
//    Route::get('/check/{telegram_id}', [UserController::class, 'check']);
//    Route::get('/tg/{telegram_id}', [UserController::class, 'byTelegramId']);
//    Route::get('/id/{user_id}', [UserController::class, 'byUserId']);
//});

require_once 'User/userRoutes.php';
require_once 'Sent_requests/sentRequestRoutes.php';
require_once 'Subscribes/subscribesRoutes.php';
