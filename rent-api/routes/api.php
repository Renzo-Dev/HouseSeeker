<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('user')->group(function () {
    Route::post('/details', [UserController::class, 'getUserDetails']);
    Route::post('/create', [UserController::class, 'create']);
    Route::post('/checkExists', [UserController::class, 'checkExists']);
});

Route::prefix('sub')->group(function () {
});
