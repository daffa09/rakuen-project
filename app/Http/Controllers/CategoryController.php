<?php

namespace App\Http\Controllers;

use App\Models\Categories;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
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
