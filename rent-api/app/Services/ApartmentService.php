<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ApartmentService
{
    private const CHACHE_KEY = 'apartments_list';
    private const CHACHE_TTL = 20; // избегаем удаления до след обновления

    public function updateApartmentsList()
    {
        try {
            $response = Http::post('https://maps.polyestate.de/web/index.php/real-estate/get-marker', [
                'anbieterId' => '456745',
                'apiKey' => '345uhhjGSAFHjb46nbhv467hbnvjSDAwh4g64h5j7fvdsjhgrgttruru',
                'orderHeuristic' => 'SORT_ASC',
                'orderField' => 'gesamtpreis',
                'mieten' => 1,
                'kaufen' => 0,
                'wohnen' => 1,
                'parken' => 0,
                'gewerbe' => 0,
                'balkon' => 0,
                'garten' => 0,
                'kautionsfrei' => 0,
                'fahrstuhl_personen' => 0,
                'unterkellert_keller' => 0,
                'stellplatz' => 0,
                'wbs' => 0,
                'preisMin' => 5,
                'preisMax' => 7527,
                'flaecheMin' => 16,
                'flaecheMax' => 160,
                'zimmerMin' => 1,
                'zimmerMax' => 6,
                'etageMin' => 0,
                'etageMax' => 19,
                'requestSource' => 'MAPS',
            ]);

            return $response->json();
        } catch (\Exception $e) {
            \Log::error('Error updating apartments list: ' . $e->getMessage());
            return null;
        }
    }
}
