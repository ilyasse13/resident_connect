<?php

namespace App\Http\Controllers;

use App\Http\Requests\TechnicianRequest;
use App\Models\Metier;
use App\Models\Technician;
use Illuminate\Http\Request;

class TechnicianController extends Controller
{
    public function metierindex()
    {
        try {
            $metiers = Metier::all();
            return response()->json($metiers, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server error!'], 500);
        }
    }

    public function index($residence_id)
    {
        try{
            $technicians=Technician::where('residence_id',$residence_id)->get();
            return response()->json($technicians, 200);
        }catch (\Exception $e) {
            return response()->json(['message' => 'Server error!'], 500);
        }
    } 
    public function store(TechnicianRequest $request)
{
    try {
        $data = $request->validated();

        $technician = Technician::create([
            'Prenom' => $data['first_name'],
            'Nom' => $data['last_name'],
            'Telephone' => $data['PhoneNumber'],
            'residence_id' => $data['residence_id'],
            'id_metier' => $data['JobID']
        ]);

        return response()->json([
            'message' => 'New technician added successfully',
            'technician' => $technician
        ]);
    } catch (\Exception $e) {
        // Return the error message to the client
        return response()->json(['message' => $e->getMessage()], 500);
    }
}
public function destroy($id){
    $technician = Technician::find($id);
        
    try {
        if (!$technician) {
            return response()->json(['message' => 'Technician not found.'], 404);
        }else{
             $technician->delete();
             return response()->json(['message' => 'Technician deleted successfully.'], 204);
        }   
    } catch (\Exception $e) {
        return response()->json(['message' => 'Failed to delete technician.'], 500);
    }
}
}
