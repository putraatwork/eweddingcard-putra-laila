<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuestbookRequest;
use App\Models\Guestbook;
use App\Services\TelegramNotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GuestbookController extends Controller
{
    public function store(
        GuestbookRequest $request,
        TelegramNotificationService $telegram
    ): JsonResponse {

        $guestbook =
            Guestbook::create(
                $request->validated()
            );

        $telegram->sendNewWish($guestbook);

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
