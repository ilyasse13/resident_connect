<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $primaryKey = 'post_id';

    protected $fillable = [
        'titre', 'description', 'image', 'poster_id', 'residence_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'poster_id', 'id');
    }
    

    public function session()
    {
        return $this->belongsTo(Residence::class, 'residence_id', 'id_residence');
    }
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
