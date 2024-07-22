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
            ->leftJoin('categories', 'projects.category_id', '=', 'categories.id')
            ->leftJoin('lang_images', 'projects.id', '=', 'lang_images.projects_id')
            ->selectRaw('projects.id, projects.title, projects.banner, projects.content, projects.publish, projects.created_at, projects.updated_at, projects.category_id, MAX(categories.name) as category_name, GROUP_CONCAT(lang_images.url) as lang_urls')
            ->where('projects.publish', '1')
            ->groupBy('projects.id', 'projects.title', 'projects.banner', 'projects.content', 'projects.publish', 'projects.created_at', 'projects.updated_at', 'projects.category_id')
            ->orderBy('projects.created_at')
            ->paginate(5);

        // Memisahkan string 'lang_urls' menjadi array
        $query->getCollection()->transform(function ($project) {
            $project->lang_urls = $project->lang_urls ? explode(',', $project->lang_urls) : [];
            return $project;
        });

        return Inertia::render('Portofolio', [
            'title' => 'Portofolio',
            'active' => 'Portofolio',
            "data" => $query
        ]);
    }

    public function indexDashboard()
    {
        $query = Projects::query()
            ->leftJoin('categories', 'projects.category_id', '=', 'categories.id')
            ->leftJoin('lang_images', 'projects.id', '=', 'lang_images.projects_id')
            ->selectRaw('projects.id, projects.title, projects.banner, projects.content, projects.publish, projects.created_at, projects.updated_at, projects.category_id, MAX(categories.name) as category_name, GROUP_CONCAT(lang_images.url) as lang_urls')
            ->groupBy('projects.id', 'projects.title', 'projects.banner', 'projects.content', 'projects.publish', 'projects.created_at', 'projects.updated_at', 'projects.category_id')
            ->orderBy('projects.created_at')
            ->paginate(10);

        // Memisahkan string 'lang_urls' menjadi array
        $query->getCollection()->transform(function ($project) {
            $project->lang_urls = $project->lang_urls ? explode(',', $project->lang_urls) : [];
            return $project;
        });


        return Inertia::render('Dashboard/Projects/Index', [
            'title' => 'Projects',
            'active' => 'Projects',
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
