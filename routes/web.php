<?php

use App\Http\Controllers\GuestbookController;
use App\Http\Controllers\RsvpController;
use App\Http\Controllers\WeddingCardController;
use Illuminate\Support\Facades\Route;

$slug = 'laila-putra';

Route::get('/', function () {
    // return view('welcome');
    return redirect()->route('card');
});

Route::prefix("card/{$slug}")
    ->group(function () {
        Route::get(
            '/',
            [WeddingCardController::class, 'index']
        )->name('card');

        Route::post(
            '/rsvp',
            [RsvpController::class, 'store']
        )->name('card.rsvp.store');

        Route::post(
            '/guestbook',
            [GuestbookController::class, 'store']
        )->name('card.guestbook.store');
    });