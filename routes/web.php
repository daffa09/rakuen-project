<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\PortofolioController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomepageController::class, 'index'])->name('home');
Route::get('/portofolio', [PortofolioController::class, 'index'])->name('portofolio');
Route::get('/portofolio/all', [PortofolioController::class, 'allProject'])->name('portofolio.all');

Route::get('/articles', [ArticlesController::class, 'index'])->name('articles');
Route::get('/contact', [HomepageController::class, 'contact'])->name('contact');


Route::middleware('auth', 'verified')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Index', [
            'title' => 'Dashboard',
            'active' => 'Dashboard',
        ]);
    })->name('dashboard');

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // projects
    Route::get('/projects', [PortofolioController::class, 'indexDashboard'])->name('projects.indexDashboard');
});

require __DIR__ . '/auth.php';
