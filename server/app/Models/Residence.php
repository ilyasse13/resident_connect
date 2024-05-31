<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Residence extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_residence';

    protected $fillable = [
        'nom_residence', 'id_admin',
    ];

    

    public function posts()
    {
        return $this->hasMany(Post::class, 'residence_id', 'id_residence');
    }
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
