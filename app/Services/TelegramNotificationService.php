<?php

namespace App\Services;

use App\Models\Guestbook;
use App\Models\Rsvp;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramNotificationService
{
    public function send(string $message): void
    {
        $botToken = config('services.telegram.bot_token');
        $chatId = config('services.telegram.chat_id');

        if (!$botToken || !$chatId) {
            Log::warning('Telegram notification skipped: configuration missing.');

            return;
        }

        try {
            $response = Http::timeout(10)
                ->post(
                    "https://api.telegram.org/bot{$botToken}/sendMessage",
                    [
                        'chat_id' => $chatId,
                        'text' => $message,
                        'parse_mode' => 'HTML',
                    ]
                );

            if ($response->failed()) {
                Log::error('Telegram notification failed.', [
                    'status' => $response->status(),
                    'response' => $response->body(),
                ]);
            }
        } catch (\Throwable $e) {
            Log::error('Telegram notification exception.', [
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function sendNewWish(Guestbook $guestbook): void
    {
        $message =
            "💌 <b>New Wedding Wish</b>\n\n" .
            "🆔 <b>ID:</b> " . $guestbook->id . "\n\n" .
            "👤 <b>From:</b> " . e($guestbook->name) . "\n" .
            "💬 <b>Message:</b> " . e($guestbook->message);

        $this->send($message);
    }

    public function sendNewRsvp(Rsvp $rsvp): void
    {
        $message =
            "💍 <b>New RSVP</b>\n\n" .
            "🆔 <b>ID:</b> " . $rsvp->id . "\n\n" .
            "👤 <b>Name:</b> " . e($rsvp->name) . "\n" .
            "📋 <b>Attendance:</b> " . e($rsvp->attendance) . "\n" .
            "👥 <b>Pax:</b> " . e($rsvp->pax);

        $this->send($message);
    }
}