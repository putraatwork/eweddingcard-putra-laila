<?php

namespace App\Http\Controllers;

use App\Models\Guestbook;

class WeddingCardController extends Controller
{
    public function index()
    {
        $guestbook = Guestbook::latest()->get();

        return view('card', [
            'guestbook' => $guestbook,
        ]);
    }
}
