<?php

use App\Jobs\PruneOldPostsJob;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

/*
|--------------------------------------------------------------------------
| Task Scheduling
|--------------------------------------------------------------------------
|
| Schedule PruneOldPostsJob to run daily at midnight.
| This job deletes posts created more than 2 years ago.
|
| Queue Job: A queue job is a unit of work that is pushed onto a queue
| and processed asynchronously by a queue worker. The database queue driver
| stores jobs in a database table, making it easy to set up without
| external services like Redis.
|
| Task Scheduling: Laravel's task scheduler allows you to define your
| command schedule within Laravel itself. When using the scheduler, only a
| single cron entry is needed on your server: * * * * * cd /path && php artisan schedule:run
|
*/
Schedule::job(new PruneOldPostsJob)->daily()->at('00:00');
