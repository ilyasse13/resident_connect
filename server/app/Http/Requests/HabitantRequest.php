<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HabitantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'CIN' => ['required', 'regex:/^[A-Za-z]{2}\d{6}$/'],
            'last_name' => 'required|string',
            'first_name' => 'required|string',
            'building_number' => 'required|numeric',
            'apartment_number' => 'required|numeric',
            'residence_id'=>'required|numeric'
        ];
    }
}
