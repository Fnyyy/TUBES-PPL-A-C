<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\ArticleController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/articles', [ArticleController::class, 'index']);
Route::post('/reports', [ReportController::class, 'store']);
Route::get('/reports/track/{code}', [ReportController::class, 'track']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (staff only)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/dashboard/reports', [ReportController::class, 'index']);
    Route::put('/reports/{report}/status', [ReportController::class, 'updateStatus']);
    Route::post('/reports/{report}/respond', [ReportController::class, 'respond']);
});
