<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function index()
    {
        $data = Categories::query()
            ->leftJoin('projects', 'categories.id', '=', 'projects.category_id')
            ->leftJoin('articles', 'categories.id', '=', 'articles.category_id')
            ->select(
                'categories.id',
                'categories.name',
                DB::raw('GROUP_CONCAT(DISTINCT projects.title) AS projects'),
                DB::raw('GROUP_CONCAT(DISTINCT articles.title) AS articles')
            )
            ->groupBy('categories.name', 'categories.id')
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
            'name' => 'required|string|max:225',
            'createdBy' => 'required|string|max:250'
        ]);

        $data = new Categories();
        $data->name = $request->name;
        $data->created_by = $request->createdBy;
        $data->created_at = now();
        $data->save();

        return redirect()->route('categories.index')->with('success', 'Categories created successfully');
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|string|max:255',
            'updatedBy' => 'required|string|max:255',
        ]);

        $data = Categories::findOrFail($id);
        $data->name = $request->name;
        $data->updated_by = $request->updatedBy;
        $data->updated_at = now();
        $data->save();

        return redirect()->route('categories.index')->with('success', 'Categories updated successfully');
    }


    public function destroy($id) {
        $data = Categories::find($id);
        $data->delete();

        return redirect()->route('categories.index')->with('success', 'Categories deleted successfully');
    }
}
