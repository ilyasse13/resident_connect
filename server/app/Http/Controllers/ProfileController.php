<?php

namespace App\Http\Controllers;

use App\Models\Residence;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function currentuser($id)
    {
        try {
            $user = User::findOrFail($id);

            $residence = Residence::findOrFail($user->residence_id);
            $admin = User::where('residence_id', $user->residence_id)->where('Type', 'Admin')->first();

            return response()->json([
                'residence' => $residence,
                'admin' => $admin,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Resource not found',
                'message' => $e->getMessage()
            ], 404);
        }
    }

    public function updateImage(Request $request, $id)
    {
        // Validate the incoming request
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust max file size as needed
        ]);

        try {
            // Find the user by ID
            $user = User::findOrFail($id);

            // Handle the uploaded image
            if ($request->hasFile('image')) {
                // Delete the old image if it exists
                if ($user->image) {
                    Storage::disk('public')->delete($user->image);
                }
                // Store the new image
                $path = $request->file('image')->store('images', 'public');
                $user->image = $path;
            }

            // Save the updated user
            $user->save();

            return response()->json(['message' => 'Image updated successfully.', 'user' => $user], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to update image.'], 500);
        }
    }
    public function deleteImage($id)
{
    try {
        // Find the user by ID
        $user = User::findOrFail($id);

        // Check if the user has an image
        if ($user->image) {
            // Delete the image file from storage
            Storage::disk('public')->delete($user->image);

            // Set the image field to null
            $user->image = null;
            $user->save();
        }

        return response()->json(['message' => 'Image deleted successfully.',
    'user'=>$user], 200);
    } catch (Exception $e) {
        return response()->json(['message' => 'Failed to delete image.'], 500);
    }
}
}
