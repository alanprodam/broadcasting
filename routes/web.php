<?php

use App\Events\MessageNotification;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/event', function () {
//    MessageNotification::dispatch('This is the first message');
    event(new MessageNotification('This is the first message'));
});

Route::get('/listen', function () {
    return view('listen');
});
