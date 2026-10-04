<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RsvpRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'attendance' => ['required', Rule::in(['Yes', 'No',])],
            'pax' => ['nullable', 'integer', 'min:1', 'required_if:attendance,Yes'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Sila masukkan nama anda.',
            'name.max' => 'Nama tidak boleh melebihi 255 aksara.',
            'attendance.required' => 'Sila pilih kehadiran anda.',
            'attendance.in' => 'Pilihan kehadiran tidak sah.',
            'pax.required_if' => 'Sila masukkan bilangan pax.',
            'pax.integer' => 'Bilangan pax mestilah nombor.',
            'pax.min' => 'Bilangan pax mestilah sekurang-kurangnya 1.',
        ];
    }
}
