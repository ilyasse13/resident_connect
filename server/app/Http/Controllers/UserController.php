<?php

namespace App\Http\Controllers;

use App\Http\Requests\HabitantRequest;
use App\Models\User;
use App\Services\ProfileImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index($residence_id)
    {
        try {
            $users = User::where('residence_id', $residence_id)->get();
            if ($users->isEmpty()) {
                return response()->json(['message' => 'No user found'], 404);
            } else {
                return response()->json($users, 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server error!'], 500);
        }
    }


    public function store (HabitantRequest $request)
    {
        $data = $request->validated();

        try{
            $password = $data['first_name'] . $data['last_name'];
            $username = $data['first_name'] . '.' . $data['last_name'];
    
            $user= User::create([
                'user_id'=>$data['CIN'],
                'Prenom'=>$data['first_name'],
                'Nom'=>$data['last_name'],
                'Type'=>'Habitant',
                'num_app'=>$data['apartment_number'],
                'num_imm'=>$data['building_number'],
                'Username'=>$username,
                'Password'=>Hash::make($password),
                'residence_id'=>$data['residence_id']
            ]);
            
            return response()->json(['message' => 'New User created successfully',
                                      'user'=>$user
        ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server error!'], 500);
        }
    }

    public function destroy($Username){
        try {
            $user = User::where('Username', $Username)->firstOrFail();
            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }
    
            // Check if the user has an image and delete it
            if ($user->image) {
                Storage::disk("public")->delete($user->image);
            }
    
            $user->delete();
            return response()->json(['message' => 'User deleted successfully.'], 204);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete user.'], 500);
        }
    }
}
