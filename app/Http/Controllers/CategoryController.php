<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $data = Categories::query()
            ->leftJoin('projects', 'categories.id', '=', 'projects.category_id')
            ->leftJoin('articles', 'categories.id', '=', 'articles.category_id')
            ->select('categories.name', 'projects.title as projects', 'articles.title as articles')
            ->orderBy('categories.id', 'desc')
            ->paginate(10);

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

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $data = Categories::create([
            'name' => $request->name,
            'created_by' => $request->createdBy
        ]);

        return redirect()->route('categories.index')->with('success', 'Categories created successfully');
    }
}
