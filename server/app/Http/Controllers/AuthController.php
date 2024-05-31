<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Admin;
use App\Models\Residence;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  


   public function register(RegisterRequest $request) 
   {
      $data= $request->validated();
      $admin=Admin::create([
        'CIN'=>$data['CIN'],
        'Nom'=>$data['last_name'],
        'prenom'=>$data['first_name'],
        'email'=>$data['email'],
        'tel'=>$data['phone']
      ]);
      $residence = Residence::create([
        'nom_residence' => $data['residence_name'],
        'id_admin' => $data['CIN']
    ]);
      $user=User::create([
        'user_id'=>$data['CIN'],
        'Nom'=>$data['last_name'],
        'Prenom'=>$data['first_name'],
        'Username'=>$data['username'],
        'Password'=>Hash::make($data['password']),
        'Type'=>'Admin',
        'num_app'=>$data['apartment_number'],
        'num_imm'=>$data['building_number'],
        'residence_id'=>$residence->id_residence
      ]);
      $token=$user->createToken('main')->plainTextToken;
      return response()->json([
        'user'=>$user,
        'token'=>$token
      ]);
   }
   public function login(LoginRequest $request) {
    $data = $request->validated();

    $user = User::where('Username', $data['username'])->first();

    if (!$user || !Hash::check($data['password'], $user->Password)) {
        return response()->json([
            'message' => 'username or password is incorrect!'
        ], 401);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

   

    return response()->json([
        'user' => $user,
        'token' => $token
    ]);
}

public function logout(Request $request)
{
    $user = $request->user();
    $user->currentAccessToken()->delete();
    return response('', 204);
}
}
