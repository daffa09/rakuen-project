<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\CategoryController;
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
    Route::get('/projects/create', [PortofolioController::class, 'create'])->name('projects.create');
    Route::get('/projects/show/{id}', [PortofolioController::class, 'show'])->name('projects.show');
    Route::patch('/projects/publish/{id}', [PortofolioController::class, 'publish'])->name('projects.publish');
    Route::patch('/projects/unpublish/{id}', [PortofolioController::class, 'unpublish'])->name('projects.unpublish');
    Route::post('/projects', [PortofolioController::class, 'store'])->name('projects.store');
    Route::get('/projects/edit/{id}', [PortofolioController::class, 'edit'])->name('projects.edit');
    Route::put('/projects/edit/{id}', [PortofolioController::class, 'update'])->name('projects.update');
    Route::delete('/projects/delete/{id}', [PortofolioController::class, 'destroy'])->name('projects.destroy');

    // category
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/getAllCategories', [CategoryController::class, 'getAllCategories'])->name('categories.getAllCategories');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::patch('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
});

require __DIR__ . '/auth.php';
