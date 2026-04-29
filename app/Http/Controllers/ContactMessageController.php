<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'inquiry_type' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:3000'],
        ]);

        ContactMessage::create($validated);

        return back()->with('success', 'Thanks! Your message has been sent.');
    }
}
