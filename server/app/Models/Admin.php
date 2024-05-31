<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;
    protected $primaryKey = 'CIN';

    protected $fillable = [
        'CIN', 'Nom', 'prenom', 'tel', 'email',
    ];

    public function residences()
    {
        return $this->hasMany(Residence::class);
    }
}
