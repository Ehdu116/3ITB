<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/users', [App\Http\Controllers\Controller::class, 'getUsers']);


Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'apiLogin']);
Route::post('/register', [App\Http\Controllers\Controller::class, 'register']);


Route::post('/logout', function () {
    Auth::logout();
    return response()->json(['message' => 'Logged out successfully']);
});
