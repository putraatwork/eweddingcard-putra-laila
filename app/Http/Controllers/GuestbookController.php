<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuestbookRequest;
use App\Models\Guestbook;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GuestbookController extends Controller
{
    public function store(
        GuestbookRequest $request
    ): JsonResponse {

        $guestbook =
            Guestbook::create(
                $request->validated()
            );

        return response()->json([
            'success' => true,

            'message' =>
                'Ucapan anda berjaya dihantar.',

            'data' => [
                'id' => $guestbook->id,
                'name' => $guestbook->name,
                'message' => $guestbook->message,
            ],
        ]);
    }
}
