<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profesores extends Model
{
    use HasFactory;
    // protected $table = "profesores";
    protected $fillable = ['nom_profesor', 'apat_profesor', 'amat_profesor', 'matricula_profesor'];
}
