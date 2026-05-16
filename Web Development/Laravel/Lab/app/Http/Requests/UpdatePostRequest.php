<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
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
        $postId = $this->route('post');
        return [
            'title' => 'required|min:3|unique:posts,title,' . $postId,
            'description' => 'required|min:10',
            'owner_id' => 'required|exists:users,id',
            'image' => 'nullable|image|mimes:jpg,png',
            'tags' => 'nullable|string',
        ];
    }
}
