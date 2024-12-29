<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $data = Categories::orderBy('id', 'desc')->paginate(10);
        return Inertia::render('Dashboard/Categories/Index', [
            'title' => 'Categories',
            'active' => 'Categories',
            "data" => $data
        ]);
    }

    public function getAllCategories() {
        $data = Categories::orderBy('created_at')->get();
        // create json respon api
        return response()->json([
            "code" => 200,
            'status' => 'success',
            'message' => 'successs.get.data_categories',
            'data' => $data
        ]);
    }
}
