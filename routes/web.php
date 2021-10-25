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
    $data['nome'] = 'alan';
    $data['url'] = 'http://192.168.88.231/images/0D0j22w1wh33L58b2j21185Vc4b1tIJ1Ry.jpg';
    event(new MessageNotification($data));
    echo 'message send';
});

Route::get('/listen', function () {
    return view('listen');
});
