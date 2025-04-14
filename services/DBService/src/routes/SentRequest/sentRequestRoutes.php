<?php

use App\Http\Controllers\SentRequestController;
use Illuminate\Support\Facades\Route;

Route::prefix('sent')->group(function () {
    Route::post('/', [SentRequestController::class, 'addSentRequest']);
    Route::get('/tg/{telegram_id}', [SentRequestController::class, 'getAllSentRequestsByTelegramId']);
    Route::get('/id/{user_id}', [SentRequestController::class, 'getAllSentRequestsByUserId']);
});
