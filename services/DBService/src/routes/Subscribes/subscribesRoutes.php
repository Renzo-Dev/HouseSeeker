<?php

use App\Http\Controllers\SubscribesController;
use Illuminate\Support\Facades\Route;

Route::prefix('sub')->group(function () {
    Route::get('getActiveSubscribes', [SubscribesController::class, 'getActiveSubscribes'])
        ->name('subscribes.getActiveSubscribes');

    Route::get('tg/{telegram_id}', [SubscribesController::class, 'checkSubscribeByTelegramId'])
        ->name('subscribes.checkSubscribeByTelegramId');

    Route::get('id/{user_id}', [SubscribesController::class, 'checkSubscribeByUserId'])
        ->name('subscribes.checkSubscribeByUserId');
});
