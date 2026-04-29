<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageAdminController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $messages = ContactMessage::query()
            ->when($search, function ($query, string $searchTerm) {
                $query->where(function ($innerQuery) use ($searchTerm) {
                    $innerQuery
                        ->where('first_name', 'like', "%{$searchTerm}%")
                        ->orWhere('last_name', 'like', "%{$searchTerm}%")
                        ->orWhere('email', 'like', "%{$searchTerm}%")
                        ->orWhere('phone', 'like', "%{$searchTerm}%")
                        ->orWhere('inquiry_type', 'like', "%{$searchTerm}%")
                        ->orWhere('message', 'like', "%{$searchTerm}%");
                });
            })
            ->latest()
            ->get()
            ->map(fn (ContactMessage $message) => [
                'id' => $message->id,
                'first_name' => $message->first_name,
                'last_name' => $message->last_name,
                'email' => $message->email,
                'phone' => $message->phone,
                'inquiry_type' => $message->inquiry_type,
                'message' => $message->message,
                'created_at' => $message->created_at?->toISOString(),
            ])
            ->values();

        return Inertia::render('Admin/Contacts/Index', [
            'messages' => $messages,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }
}
