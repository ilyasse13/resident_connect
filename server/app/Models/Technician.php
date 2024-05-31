<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Technician extends Model
{
    use HasFactory;

   

    protected $fillable = ['Nom', 'Prenom', 'Telephone', 'id_metier','residence_id'];

    public function metier()
    {
        return $this->belongsTo(Metier::class, 'id_metier', 'id');
    }
}
