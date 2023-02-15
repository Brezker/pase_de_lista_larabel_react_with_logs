<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\alumnoController;
use App\Http\Controllers\ProfesoresController;
use App\Http\Controllers\MateriasController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/alumnos', [alumnoController::class, 'lista']);
Route::get('/alumno', [alumnoController::class, 'alumno']);
Route::post('/alumno', [alumnoController::class, 'guardar']);
Route::post('/alumno/borrar', [alumnoController::class, 'borrar']);

Route::get('/profesores', [ProfesoresController::class, 'lista']);
Route::get('/profesor', [ProfesoresController::class, 'profesor']);
Route::post('/profesor', [ProfesoresController::class, 'guardar']);
Route::post('/profesor/borrar', [ProfesoresController::class, 'borrar']);

Route::get('/materias', [MateriasController::class, 'lista']);
Route::get('/materia', [MateriasController::class, 'materia']);
Route::post('/materia', [MateriasController::class, 'guardar']);
Route::post('/materia/borrar', [MateriasController::class, 'borrar']);
