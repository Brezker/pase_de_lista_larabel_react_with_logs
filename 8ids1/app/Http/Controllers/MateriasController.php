<?php

namespace App\Http\Controllers;

use App\Models\Materias;
use Illuminate\Http\Request;

class MateriasController extends Controller
{
    public function index()
    {
        return view('materia');
    }

    public function lista()
    {
        $materia = Materias::all();
        return $materia;
    }

    public function materia(Request $request)
    {
        $materia = Materias::find($request->id);
        return $materia;
    }

    public function guardar(Request $request)
    {
        if ($request->id == 0) {
            $materia = new Materias();
        } else {
            $materia = Materias::find($request->id);
        }

        $materia->nom_materia = $request->nom_materia;

        $materia->save();

        return $materia;
    }

    public function borrar(Request $request)
    {

        $materia = Materias::find($request->id);
        $materia->delete();
        return "OK";
    }
}
