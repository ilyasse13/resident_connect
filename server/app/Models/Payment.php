<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = ['user', 'state', 'mounth', 'residence_id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user', 'user_id');
    }

    public function residence()
    {
        return $this->belongsTo(Residence::class, 'residence_id', 'id_residence');
    }
}
