<?php

namespace App\Http\Controllers;

use App\Http\Requests\RsvpRequest;
use App\Models\Rsvp;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RsvpController extends Controller
{
    public function store(RsvpRequest $request): JsonResponse 
    {

        $rsvp = Rsvp::create(
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' =>
                'RSVP anda berjaya dihantar.',
            'data' => [
                'id' => $rsvp->id,
            ],
        ]);
    }
}
