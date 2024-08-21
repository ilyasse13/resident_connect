<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index($residence_id)
    {
        try {
            // Fetch posts for the given residence ID with user data
            $posts = Post::with('user') // Eager load the user relationship
                ->where('residence_id', $residence_id)
                ->orderBy('created_at', 'desc')
                ->get();

            // Check if posts are found
            if ($posts->isEmpty()) {
                return response()->json(['message' => 'No posts found'], 404);
            }

            // Return the posts if found
            return response()->json($posts, 200);
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json(['message' => 'Server error!'], 500);
        }
    }
    public function store(Request $request)
    {
        try {
            // Validate the incoming request
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'poster_id' => 'required|exists:users,id',
                'residence_id' => 'required|exists:residences,id_residence',
            ]);

            // Handle image upload
            $imagePath = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                try {
                    $imagePath = $image->store('images', 'public'); // Store the image in the 'public/images' directory
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Image upload failed.'], 500);
                }
            }

            // Create a new post record
            try {
                $post = Post::create([
                    'titre' => $request->input('title'),
                    'description' => $request->input('description'),
                    'image' => $imagePath,
                    'poster_id' => $request->input('poster_id'),
                    'residence_id' => $request->input('residence_id'),
                ]);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to create post.'], 500);
            }

            // Return a success response
            return response()->json(['message' => 'Post created successfully!', 'post' => $post], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Handle other errors
            return response()->json(['error' => 'An unexpected error occurred.'], 500);
        }
    }
    public function getUserPosts($userId)
    {
        try {
            // Fetch posts associated with the given user ID
            $posts = Post::where('poster_id', $userId)
            ->orderBy('created_at','desc')
            ->get();

            // Return the posts as a JSON response
            return response()->json($posts, 200);
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json(['message' => 'Error fetching data'], 500);
        }
    }
    public function destroy($post_id)
    {
        try {
            $post = Post::find($post_id);
            if (!$post) {
                return response()->json(['message' => 'Post not found.'], 404);
            }
            if ($post->image) {
                Storage::disk("public")->delete($post->image);
            }
            $post->delete();
            return response()->json(['message' => 'Post deleted successfully.'], 204);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete post.'], 500);
        }
    }
}
