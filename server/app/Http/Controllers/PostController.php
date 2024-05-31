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
            $posts = Post::where('residence_id' . '=', $residence_id)->get();
            if ($posts->isEmpty()) {
                return response()->json(['message' => 'No posts found'], 404);
            } else {
                return response()->json($posts, 200);
            }
        } catch (\Exception $e) {
            return response()->json(['messsage' => 'Server error!'], 500);
        }
    }

    public function store(PostRequest $request)
    {
        $data= $request->validated();
        try {
            if($request->hasFile('image')){
                $data['image']=$request->file('image')->store('images','public');
             }else{
                 $data['image']=null;
             }
             
            $post = Post::create([
                'title'=>$data['title'],
                'description'=>$data['description'],
                'poster_id'=>$data['poster_id'],
                'residence_id'=>$data['residence_id'],
                'image'=>$data['image'],
            ]);


            return response()->json(['message' => 'post created successfully.', 'post' => $post], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create post.'], 500);
        }
    }

    public function destroy($post_id)
    {
        try {
            $post = Post::find($post_id);
            if (!$post) {
                return response()->json(['message' => 'Post not found.'], 404);
            }
            if($post->image){
                Storage::disk("public")->delete($post->image);
            }
            $post->delete();
            return response()->json(['message' => 'Post deleted successfully.'], 204);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete post.'], 500);
        }
    
    }
}
