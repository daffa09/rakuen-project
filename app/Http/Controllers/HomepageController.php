<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomepageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data =
            Projects::query()
            ->leftJoin('categories', 'projects.category_id', '=', 'categories.id')
            ->leftJoin('lang_images', 'projects.id', '=', 'lang_images.project_id')
            ->selectRaw('projects.id, projects.title, projects.banner, projects.content, projects.publish, projects.created_at, projects.updated_at, projects.category_id, MAX(categories.name) as category_name, GROUP_CONCAT(lang_images.url) as lang_urls')
            ->where('projects.publish', '0')
            ->groupBy('projects.id', 'projects.title', 'projects.banner', 'projects.content', 'projects.publish', 'projects.created_at', 'projects.updated_at', 'projects.category_id')
            ->orderBy('projects.created_at')
            ->paginate(3);

        // Transform the collection to ensure 'lang_urls' is an array
        $data->getCollection()->transform(function ($data) {
            // Assuming the image URLs are relative and stored in the 'storage' directory
            $data->banner = asset('storage/' . $data->banner); // Adjust this if necessary
            $data->lang_urls = $data->lang_urls ? explode(',', $data->lang_urls) : [];
            return $data;
        });

        return Inertia::render('Homepage', [
            'title' => 'Homepage',
            'active' => 'Home',
            'data' => $data
        ]);
    }

    public function contact()
    {
        return Inertia::render('Contact', [
            'title' => 'Contact',
            'active' => 'Contact'
        ]);
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
