<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ['content', 'commenter_id','id_post'];

    // In Comment.php
public function user()
{
    return $this->belongsTo(User::class, 'commenter_id');
}

}
