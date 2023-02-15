<?php

namespace App\Http\Controllers;

use App\Models\m_alumno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http\Models\Alumno;

class alumnoController extends Controller
{
    public function index()
    {
        return view('alumno');
    }
    public function lista()
    {
        $alumno = m_alumno::all();
        return $alumno;
    }
    public function alumno(Request $request)
    {
        $alumno = m_alumno::find($request->id);
        return $alumno;
    }
    public function guardar(Request $request)
    {
        if ($request->id == 0) {
            $alumno = new m_alumno();
        } else {
            $alumno = m_alumno::find($request->id);
        }

        $alumno->nom_alumno = $request->nom_alumno;
        $alumno->apat_alumno = $request->apat_alumno;
        $alumno->amat_alumno = $request->amat_alumno;
        $alumno->matricula_alumno = $request->matricula_alumno;

        $alumno->save();

        return $alumno;
    }
    public function borrar(Request $request)
    {

        $alumno = m_alumno::find($request->id);
        $alumno->delete();
        return "OK";
    }
}
