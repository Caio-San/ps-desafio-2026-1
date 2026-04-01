<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});



Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);
    Route::post("/category/{id}", [\App\Http\Controllers\CategoryController::class, 'update']);
    Route::post("/category", [\App\Http\Controllers\CategoryController::class, 'store']);

    Route::delete("/category/{id}", [\App\Http\Controllers\CategoryController::class, 'destroy']);
    Route::post("/artigo/{id}", [\App\Http\Controllers\ArtigoController::class, 'update']);
    Route::delete("/artigo/{id}", [\App\Http\Controllers\ArtigoController::class, 'destroy']);
    Route::post("/artigo", [\App\Http\Controllers\ArtigoController::class, 'store']);
});

Route::get("/category", [\App\Http\Controllers\CategoryController::class, 'index']);



Route::get("/category/{id}", [\App\Http\Controllers\CategoryController::class, 'show']);




Route::get("/artigo", [\App\Http\Controllers\ArtigoController::class, 'index']);

Route::get("/artigo/{id}", [\App\Http\Controllers\ArtigoController::class, 'show']);



Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
