<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
   // app/Http/Controllers/CommentController.php

   public function index($postId)
   {
       try {
           // Fetch comments along with user data, ordered from the most recent
           $comments = Comment::with('user')
               ->where('id_post', $postId)
               ->orderBy('created_at', 'desc')
               ->get();
           
           // Check if comments are empty
           if ($comments->isEmpty()) {
               return response()->json([
                   'message' => 'No comments found for this post.'
               ], 404);
           }
   
           // Return comments as JSON response
           return response()->json($comments);
   
       } catch (\Exception $e) {
           // Handle any exceptions and return a proper error response
           return response()->json([
               'error' => 'Failed to fetch comments',
               'message' => $e->getMessage()
           ], 500);
       }
   }

   public function store(Request $request)
   {
       try {
           // Validate incoming request data
           $request->validate([
               'comment' => 'required|string',
               'commenter_Id' => 'required|integer|exists:users,id',
               'postId' => 'required|integer|exists:posts,post_id',
           ]);
   
           // Create a new comment
           $comment = new Comment();
           $comment->content = $request->input('content');
           $comment->commenter_id = $request->input('commenter_Id');
           $comment->id_post = $request->input('postId');
           $comment->save();
   
           return response()->json(['message' => 'Comment added successfully'], 201);
       } catch (\Exception $e) {
           // Handle exceptions
           return response()->json(['error' => 'Failed to add comment'], 500);
       }
   }
   
}
