<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/about-us', function () {
    return Inertia::render('AboutUs');
});

Route::get('/gallery', function () {
    return Inertia::render('Gallery');
});

Route::get('/shop', function () {
    return Inertia::render('Shop');
});

Route::get('/adopt', function () {
    return Inertia::render('Adopt');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::get('/adoption-abroad', function () {
    return Inertia::render('AdoptionAbroad');
});

Route::get('/support', function () {
    return Inertia::render('Support');
});

Route::get('/available-cats', function () {
    return Inertia::render('AvailableCats');
});

Route::get('/cat-profile', function () {
    return Inertia::render('CatProfile');
});
