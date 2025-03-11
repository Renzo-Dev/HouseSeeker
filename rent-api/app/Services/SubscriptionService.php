<?php

namespace App\Services;

use App\Models\Subscription;
use App\Repositories\Subscribe\SubscribeRepository;

class SubscriptionService
{
    protected SubscribeRepository $subscribeRepository;

    public function __construct(SubscribeRepository $subscribeRepository)
    {
        $this->subscribeRepository = $subscribeRepository;
    }

    public function checkSubscription($user): bool
    {
        $subscribe = Subscription::where('user_id', $user["id"])->first()->jsonSerialize();
        if ($subscribe["status"] === 'active') {
            return true;
        }
        return false;
    }
}
