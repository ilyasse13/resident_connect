<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function getPaymentsForResidence($residence_id)
    {
        try {
            // Get the current year
            $currentYear = Carbon::now()->year;

            // Fetch the payments where residence_id matches and the year is the current year
            $payments = Payment::where('residence_id', $residence_id)
                                ->whereYear('created_at', $currentYear)
                                ->get();

            if ($payments->isEmpty()) {
                return response()->json(['message' => 'No payments found'], 404);
            } else {
                return response()->json($payments, 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server error!'], 500);
        }
    }
    public function store(Request $request)
    {
        try{
            $payment= Payment::create([
                'user'=>$request['id'],
                 'state'=>'paid',
                 'mounth'=>$request['mounth'],
                'residence_id'=>$request['residence_id']
            ]);            
            return response()->json(['message' => 'New payment added successfully',
                                      'payment'=>$payment
        ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server error!'], 500);
        }
    }
    public function destroy($id_pay){
        $payment = Payment::find($id_pay);
            
        try {
            if (!$payment) {
                return response()->json(['message' => 'payment not found.'], 404);
            }else{
                 $payment->delete();
                 return response()->json(['message' => 'payment deleted successfully.'], 204);
            }   
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete payment.'], 500);
        }
    }
}
