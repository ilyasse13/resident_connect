<?php

namespace App\Http\Controllers;

use App\Http\Requests\HabitantRequest;
use App\Models\User;
use App\Services\ProfileImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

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
    public function updateUser(Request $request, $id)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'cin' => ['required', 'regex:/^[A-Z]{2}\d{6}$/'],
            'firstName' => ['required', 'regex:/^[A-Z][a-zA-Z]*$/'],
            'lastName' => ['required', 'regex:/^[A-Z][a-zA-Z]*$/'],
            'username' => ['required', 'string', 'max:255'],
            'oldPassword' => ['nullable', 'string'],
            'newPassword' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }
    
        $user = User::findOrFail($id);
    
        // Check if the username is available
        if (User::where('username', $request->input('username'))->where('id', '!=', $id)->exists()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Username is already taken.'
            ], 400);
        }
    
        // Check if old password matches
        if ($request->filled('oldPassword') && !Hash::check($request->input('oldPassword'), $user->Password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Old password is incorrect.'
            ], 400);
        }
    
        // Update the user data
        $user->user_id = $request->input('cin');
        $user->Prenom = $request->input('firstName');
        $user->Nom = $request->input('lastName');
        $user->Username = $request->input('username');
    
        if ($request->filled('newPassword')) {
            $user->Password = Hash::make($request->input('newPassword'));
        }
    
        $user->save();
    
        return response()->json([
            'status' => 'success',
            'message' => 'User information updated successfully.',
            'user'=>$user
        ]);
    }
}
