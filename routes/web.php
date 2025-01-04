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
Route::get('/portofolio/detail/{id}', [PortofolioController::class, 'showDetail'])->name('portofolio.showDetail');

Route::get('/articles', [ArticlesController::class, 'index'])->name('articles');
Route::get('/articles/detail/{id}', [ArticlesController::class, 'showDetail'])->name('articles.showDetail');
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
    Route::post('/projects/edit', [PortofolioController::class, 'update'])->name('projects.update');
    Route::delete('/projects/delete/{id}', [PortofolioController::class, 'destroy'])->name('projects.destroy');

    // articles
    Route::get('/articles/dashboard', [ArticlesController::class, 'indexDashboard'])->name('articles.indexDashboard');
    Route::get('/articles/create', [ArticlesController::class, 'create'])->name('articles.create');
    Route::get('/articles/show/{id}', [ArticlesController::class, 'show'])->name('articles.show');
    Route::patch('/articles/publish/{id}', [ArticlesController::class, 'publish'])->name('articles.publish');
    Route::patch('/articles/unpublish/{id}', [ArticlesController::class, 'unpublish'])->name('articles.unpublish');
    Route::post('/articles', [ArticlesController::class, 'store'])->name('articles.store');
    Route::get('/articles/edit/{id}', [ArticlesController::class, 'edit'])->name('articles.edit');
    Route::post('/articles/edit', [ArticlesController::class, 'update'])->name('articles.update');
    Route::delete('/articles/delete/{id}', [ArticlesController::class, 'destroy'])->name('articles.destroy');

    // category
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/getAllCategories', [CategoryController::class, 'getAllCategories'])->name('categories.getAllCategories');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::patch('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
});

Route::get('/create-symlink', function () {
    symlink('/home/path/to/domain/app/folder/storage/app/public', '/home/path/to/public/folder/public_html/storage');
    echo "Symlink Created. Thanks";
});

require __DIR__ . '/auth.php';
