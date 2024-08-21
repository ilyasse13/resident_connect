<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TechnicianController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login',[AuthController::class,'login']);
Route::post('/register',[AuthController::class,'register']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/users/{residence_id}', [UserController::class, 'index']);
Route::middleware('auth:sanctum')->post('/createUser',[UserController::class,'store']);
Route::middleware('auth:sanctum')->delete('/deleteUser/{Username}',[UserController::class,'destroy']);
Route::middleware('auth:sanctum')->get('/metiers',[TechnicianController::class,'metierindex']);
Route::middleware('auth:sanctum')->post('/createtech',[TechnicianController::class,'store']);
Route::middleware('auth:sanctum')->get('/technicians/{residence_id}',[TechnicianController::class,'index']);
Route::middleware('auth:sanctum')->delete('/deletetech/{id}',[TechnicianController::class,'destroy']);
Route::middleware('auth:sanctum')->get('/payements/{residence_id}',[PaymentController::class,'getPaymentsForResidence']);
Route::middleware('auth:sanctum')->post('/addPayment',[PaymentController::class,'store']);
Route::middleware('auth:sanctum')->delete('/deletePayement/{id_pay}',[PaymentController::class,'destroy']);
Route::middleware('auth:sanctum')->get('/currentuser/{id}',[ProfileController::class,'currentuser']);
Route::middleware('auth:sanctum')->patch('/updateimage/{id}',[ProfileController::class,'updateImage']);
Route::middleware('auth:sanctum')->delete('/deleteimage/{id}',[ProfileController::class,'deleteImage']);
Route::middleware('auth:sanctum')->post('/addPost',[PostController::class,'store']);
Route::middleware('auth:sanctum')->get('/posts/{residence_id}',[PostController::class,'index']);
Route::middleware('auth:sanctum')->get('/comments/{postId}',[CommentController::class,'index']);
Route::middleware('auth:sanctum')->post('/addComment',[CommentController::class,'store']);
Route::middleware('auth:sanctum')->get('/userposts/{userId}',[PostController::class,'getUserPosts']);
Route::middleware('auth:sanctum')->put('/updateUser/{userId}',[UserController::class,'updateUser']);