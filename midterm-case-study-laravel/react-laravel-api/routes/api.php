<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\TaskController;  // Import TaskController
use App\Http\Controllers\ProjectController;

Route::get('/users', [App\Http\Controllers\Controller::class, 'getUsers']);

Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'apiLogin']);
Route::post('/register', [App\Http\Controllers\Auth\RegisterController::class, 'apiRegister']);

// Project Routes (Authenticated)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/projects', [ProjectController::class, 'store']);  // Create a new project
    Route::get('/projects', [ProjectController::class, 'index']);   // Get all projects
    Route::get('projects/{id}', [ProjectController::class, 'show']); // Get a specific project
    Route::put('projects/{id}', [ProjectController::class, 'update']); // Update an existing project
    Route::delete('projects/{id}', [ProjectController::class, 'destroy']); // Delete a project

    Route::put('/projects/{id}/budget', [ProjectController::class, 'updateBudget']);


    // Task Routes (Authenticated)
    Route::post('/tasks', [TaskController::class, 'store']);  // Create a new task
    Route::get('/tasks', [TaskController::class, 'index']);   // Get all tasks
    Route::get('tasks/{id}', [TaskController::class, 'show']); // Get a specific task
    Route::put('tasks/{id}', [TaskController::class, 'update']); // Update a task
    Route::delete('tasks/{id}', [TaskController::class, 'destroy']); // Delete a task
    Route::get('/projects/{projectId}/tasks', [TaskController::class, 'index']);

});

// Logout Route
Route::post('/logout', function () {
    Auth::logout();
    return response()->json(['message' => 'Logged out successfully']);
});
