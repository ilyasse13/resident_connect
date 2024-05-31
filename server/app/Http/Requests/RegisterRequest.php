<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'username' => 'required|unique:users',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
            'phone' => 'required',
            'building_number' => 'required|numeric',
            'apartment_number' => 'required|numeric',
            'residence_name'=>'required|string'

        ];
    }
}
