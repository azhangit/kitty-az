<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageSubmitted;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Throwable;

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

        $contactMessage = ContactMessage::create($validated);

        try {
            Mail::to('info@dubaistrreetkitties.ae')
                ->send(new ContactMessageSubmitted($contactMessage));
        } catch (Throwable $exception) {
            report($exception);

            return back()->with('error', 'Your message was saved, but email delivery failed.');
        }

        return back()->with('success', 'Thanks! Your message has been sent.');
    }
}
