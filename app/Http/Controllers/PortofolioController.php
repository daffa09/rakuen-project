<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortofolioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = Projects::query()
            ->join('categories', 'projects.category_id', '=', 'categories.id')
            ->select('projects.*', 'categories.name as category_name')
            ->orderBy('projects.created_at')
            ->paginate(2);

        return Inertia::render('Portofolio', [
            'title' => 'Portofolio',
            'active' => 'Portofolio',
            "data" => $query
        ]);
    }

    public function allProject(Request $request)
    {
        $query = Projects::query();

        // if ($search = $request->input('search')) {
        //     $query->where('title', 'like', "%{$search}%")
        //         ->orWhere('content', 'like', "%{$search}%");
        // }

        $paginator = $query->orderBy('created_at')->paginate(5);

        return response()->json($paginator);
    }




    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
