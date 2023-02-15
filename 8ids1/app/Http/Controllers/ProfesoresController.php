<?php

namespace App\Http\Controllers;

use App\Models\Profesores;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Http\Models\Profesores;

class ProfesoresController extends Controller
{
    public function index()
    {
        return view('profesor');
    }

    public function lista()
    {
        $profesor = Profesores::all();
        return $profesor;
    }

    public function profesor(Request $request)
    {
        $profesor = Profesores::find($request->id);
        return $profesor;
    }

    public function guardar(Request $request)
    {
        if ($request->id == 0) {
            $profesor = new Profesores();
        } else {
            $profesor = Profesores::find($request->id);
        }

        $profesor->nom_profesor = $request->nom_profesor;
        $profesor->apat_profesor = $request->apat_profesor;
        $profesor->amat_profesor = $request->amat_profesor;
        $profesor->matricula_profesor = $request->matricula_profesor;

        $profesor->save();

        return $profesor;
    }

    public function borrar(Request $request)
    {

        $profesor = Profesores::find($request->id);
        $profesor->delete();
        return "OK";
    }
}
