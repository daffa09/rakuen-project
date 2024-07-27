<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use App\Models\Images;
use App\Models\Gallery;
use App\Models\LangImages;
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
            ->leftJoin('lang_images', 'projects.id', '=', 'lang_images.project_id')
            ->selectRaw('projects.id, projects.title, projects.banner, projects.content, projects.publish, projects.created_at, projects.updated_at, projects.category_id, MAX(categories.name) as category_name, GROUP_CONCAT(lang_images.url) as lang_urls')
            ->where('projects.publish', '1')
            ->groupBy('projects.id', 'projects.title', 'projects.banner', 'projects.content', 'projects.publish', 'projects.created_at', 'projects.updated_at', 'projects.category_id')
            ->orderBy('projects.created_at')
            ->paginate(5);

        // Transform the collection to ensure 'lang_urls' is an array
        $query->getCollection()->transform(function ($project) {
            // Assuming the image URLs are relative and stored in the 'storage' directory
            $project->banner = asset('storage/' . $project->banner); // Adjust this if necessary
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
            ->leftJoin('lang_images', 'projects.id', '=', 'lang_images.project_id')
            ->selectRaw('projects.id, projects.title, projects.banner, projects.content, projects.publish, projects.created_at, projects.updated_at, projects.category_id, MAX(categories.name) as category_name, GROUP_CONCAT(lang_images.url) as lang_urls')
            ->groupBy('projects.id', 'projects.title', 'projects.banner', 'projects.content', 'projects.publish', 'projects.created_at', 'projects.updated_at', 'projects.category_id')
            ->orderBy('projects.created_at')
            ->paginate(10);

        // Transform the collection to ensure 'lang_urls' is an array
        $query->getCollection()->transform(function ($project) {
            // Assuming the image URLs are relative and stored in the 'storage' directory
            $project->banner = asset('storage/' . $project->banner); // Adjust this if necessary
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
        return Inertia::render('Dashboard/Projects/Create', [
            'title' => 'Projects',
            'active' => 'Projects',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
            'content' => 'required|string',
            'category' => 'required|exists:categories,id',
            "lang_images" => 'nullable|string',
            'gallery' => 'nullable|array',
            'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        // Handle banner upload
        if ($request->hasFile('banner')) {
            $validatedData['banner'] = $request->file('banner')->store('banners', 'public');
        }

        // Handle gallery upload
        $galleryPaths = [];
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $galleryPaths[] = $file->store('galleries', 'public');
            }
        }

        // explode lang_images from coma
        $lang_images = explode(',', $validatedData['lang_images']);

        // Create the project
        $project = new Projects();
        $project->id = (string) \Illuminate\Support\Str::uuid();
        $project->title = $validatedData['title'];
        $project->banner = $validatedData['banner'] ?? null;
        $project->content = $validatedData['content'];
        $project->category_id = $validatedData['category'];
        $project->publish = 0; // Set to 0 by default
        $project->created_by = auth()->id();
        $project->created_at = now();
        $project->save();

        // create image for banner
        $image = new Images();
        $image->id = (string) \Illuminate\Support\Str::uuid();
        $image->project_id = $project->id;
        $image->image_url = $project->banner;
        $image->created_by = auth()->id();
        $image->created_at = now();
        $image->save();

        // Save gallery images
        if (!empty($galleryPaths)) {
            foreach ($galleryPaths as $path) {
                $gallery = new Gallery();
                $gallery->id = (string) \Illuminate\Support\Str::uuid();
                $gallery->project_id = $project->id;
                $gallery->image_url = $path;
                $gallery->created_by = auth()->id();
                $gallery->save();
            }
        }

        // save to lang images
        if (!empty($lang_images)) {
            foreach ($lang_images as $path) {
                $lang_image = new LangImages();
                $lang_image->id = (string) \Illuminate\Support\Str::uuid();
                $lang_image->project_id = $project->id;
                $lang_image->url = $path;
                $lang_image->created_by = auth()->id();
                $lang_image->created_at = now();
                $lang_image->save();
            }
        }

        // Redirect or return a response
        return redirect()->route('projects.indexDashboard')->with('success', 'Project created successfully');
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
