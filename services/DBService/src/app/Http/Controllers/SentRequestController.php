<?php

namespace App\Http\Controllers;

use App\Services\SentRequestService;
use Illuminate\Http\Request;

class SentRequestController extends Controller
{
    protected SentRequestService $sentRequestService;

    public function __construct(SentRequestService $sentRequestService)
    {
        $this->sentRequestService = $sentRequestService;
    }

    public function getAllSentRequestsByTelegramId($telegram_id)
    {
        $sentRequests = $this->sentRequestService->getAllSentRequestsByTelegramId($telegram_id);
        return response()->json([
            'sent_requests' => $sentRequests,
        ]);
    }

    public function getAllSentRequestsByUserId($user_id)
    {
        $sentRequests = $this->sentRequestService->getAllSentRequestsByUserId($user_id);
        return response()->json([
            'sent_requests' => $sentRequests,
        ]);
    }

    public function addSentRequest(Request $request)
    {
        try {
            $data = $request->all();

            $this->sentRequestService->addSentRequest($data);
            return response()->json([
                'sent_request' => 'Sent request created successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Sent request already exists'
            ], 409);
        }
    }
}
