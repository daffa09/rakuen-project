<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use App\Models\Images;
use App\Models\Gallery;
use App\Http\Requests\StoreArticlesRequest;
use App\Http\Requests\UpdateArticlesRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Articles::query()
            ->leftJoin('categories', 'articles.category_id', '=', 'categories.id')
            ->selectRaw('articles.id, articles.title, articles.banner, articles.content, articles.publish, articles.created_at, articles.updated_at, articles.category_id, MAX(categories.name) as category_name')
            ->where('articles.publish', '1')
            ->groupBy('articles.id', 'articles.title', 'articles.banner', 'articles.content', 'articles.publish', 'articles.created_at', 'articles.updated_at', 'articles.category_id')
            ->orderBy('articles.created_at')
            ->paginate(5);

            $query->getCollection()->transform(function ($articles) {
            $articles->banner = asset('storage/' . $articles->banner);
            return $articles;
        });

        return Inertia::render('Articles', [
            'title' => 'Articles',
            'active' => 'Articles',
            "data" => $query
        ]);
    }

    public function indexDashboard() {
        $query = Articles::query()
            ->leftjoin('categories', 'articles.category_id', '=', 'categories.id')
            ->select('articles.*', 'categories.name as category_name')
            ->orderBy('created_at')
            ->paginate(5);

        $query->getCollection()->transform(function ($article) {
            // Assuming the image URLs are relative and stored in the 'storage' directory
            $article->banner = asset('storage/' . $article->banner); // Adjust this if necessary
            return $article;
        });

        return Inertia::render('Dashboard/Articles/Index', [
            'title' => 'Articles',
            'active' => 'Articles',
            "data" => $query
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Articles/Create', [
            'title' => 'Articles',
            'active' => 'Articles',
            'editData' => ""
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

        // Create the article
        $article = new Articles();
        $article->id = (string) \Illuminate\Support\Str::uuid();
        $article->title = $validatedData['title'];
        $article->banner = $validatedData['banner'] ?? null;
        $article->content = $validatedData['content'];
        $article->category_id = $validatedData['category'];
        $article->publish = 0; // Set to 0 by default
        $article->created_by = auth()->id();
        $article->created_at = now();
        $article->save();

        // create image for banner
        $image = new Images();
        $image->id = (string) \Illuminate\Support\Str::uuid();
        $image->article_id = $article->id;
        $image->image_url = $article->banner;
        $image->created_by = auth()->id();
        $image->created_at = now();
        $image->save();

        // Save gallery images
        if (!empty($galleryPaths)) {
            foreach ($galleryPaths as $path) {
                $gallery = new Gallery();
                $gallery->id = (string) \Illuminate\Support\Str::uuid();
                $gallery->article_id = $article->id;
                $gallery->image_url = $path;
                $gallery->created_by = auth()->id();
                $gallery->save();
            }
        }

        // Redirect or return a response
        return redirect()->route('articles.indexDashboard')->with('success', 'Articles created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $articles = Articles::query()
            ->leftJoin('categories', 'articles.category_id', '=', 'categories.id')
            ->selectRaw('
                articles.id,
                articles.title,
                articles.banner,
                articles.content,
                articles.publish,
                articles.created_at,
                articles.updated_at,
                articles.category_id,
                MAX(categories.name) as category_name,
                (
                    SELECT GROUP_CONCAT(gallery.image_url)
                    FROM gallery
                    WHERE gallery.article_id = articles.id
                ) as gallery
            ')
            ->where('articles.id', $id)
            ->groupBy([
                'articles.id',
                'articles.title',
                'articles.banner',
                'articles.content',
                'articles.publish',
                'articles.created_at',
                'articles.updated_at',
                'articles.category_id',
                'categories.name'
            ])
            ->first();

        $articles->banner = asset('storage/' . $articles->banner);
        $articles->gallery = $articles->gallery ? array_map(fn($item) => asset('storage/' . $item), explode(',', $articles->gallery)) : [];

        return Inertia::render('Dashboard/Articles/Show', [
            'title' => 'Articles',
            'active' => 'Articles',
            'data' => $articles
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // get the data
        $articles = Articles::query()
            ->leftJoin('categories', 'articles.category_id', '=', 'categories.id')
            ->selectRaw('
                articles.id,
                articles.title,
                articles.banner,
                articles.content,
                articles.publish,
                articles.created_at,
                articles.updated_at,
                articles.category_id,
                MAX(categories.name) as category_name,
                (
                    SELECT GROUP_CONCAT(gallery.image_url)
                    FROM gallery
                    WHERE gallery.article_id = articles.id
                ) as gallery
            ')
            ->where('articles.id', $id)
            ->groupBy([
                'articles.id',
                'articles.title',
                'articles.banner',
                'articles.content',
                'articles.publish',
                'articles.created_at',
                'articles.updated_at',
                'articles.category_id',
                'categories.name'
            ])
            ->first();

        $articles->banner = asset('storage/' . $articles->banner);
        $articles->gallery = $articles->gallery ? array_map(fn($item) => asset('storage/' . $item), explode(',', $articles->gallery)) : [];

        return Inertia::render('Dashboard/Articles/Create', [
            'title' => 'Articles',
            'active' => 'Articles',
            'editData' => $articles
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
         // Validate the request
        $validatedData = $request->validate([
            'id' => 'required|string',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|exists:categories,id',
            'gallery' => 'nullable|array'
        ]);

        $id = $validatedData['id'];

        // Handle banner upload
        if ($request->hasFile('banner')) {
            $validatedData['banner'] = $request->file('banner')->store('banners', 'public');
        } else {
            // get filename start banner/ from request, because filename is string
            $filename = strstr($request->input('banner'), 'banners/');
            $validatedData['banner'] = $filename;
        }

        // Handle gallery upload
        $galleryPaths = [];
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $galleryPaths[] = $file->store('galleries', 'public');
            }
        }

        // update the articles
        $articles = Articles::findOrFail($id);
        $articles->title = $validatedData['title'];
        $articles->banner = $validatedData['banner'];
        $articles->content = $validatedData['content'];
        $articles->category_id = $validatedData['category'];
        $articles->updated_by = auth()->id();
        $articles->updated_at = now();
        $articles->save();

        // cek banner image
        if ($request->hasFile('banner')) {
            $image = Images::where('article_id', $id)->first();

            // remove from storage first
            $path = strstr($image->image_url, 'banners/');
            Storage::disk('public')->delete($path);

            // update image
            if ($image) {
                $image->image_url = $articles->banner;
                $image->updated_by = auth()->id();
                $image->updated_at = now();
                $image->save();
            }
        }

        // Save gallery images
        if (!empty($galleryPaths)) {
            // Fetch and delete existing gallery images along with their files
            $existingGalleries = Gallery::where('article_id', $id)->get();
            foreach ($existingGalleries as $gallery) {
                // delete gallery image from disk
                $path = strstr($gallery->image_url, 'galleries/');
                Storage::disk('public')->delete($path);

                // delete from database
                $gallery = Gallery::where('article_id', $id)->first();
                $gallery->delete();
            }

            // Save new gallery images
            foreach ($galleryPaths as $path) {
                $gallery = new Gallery();
                $gallery->id = (string) \Illuminate\Support\Str::uuid();
                $gallery->article_id = $id;
                $gallery->image_url = $path;
                $gallery->created_by = auth()->id();
                $gallery->created_at = now();
                $gallery->updated_by = auth()->id();
                $gallery->updated_at = now();
                $gallery->save();
            }
        }

        // Redirect or return a response
        return redirect()->route('articles.indexDashboard')->with('success', 'Article created successfully');
    }

    public function publish(string $id) {
        $articles = Articles::find($id);
        $articles->publish = 1;
        $articles->save();

        return redirect()->route('articles.indexDashboard')->with('success', 'Articles published successfully');
    }

    public function unpublish(string $id) {
        $articles = Articles::find($id);
        $articles->publish = 0;
        $articles->save();

        return redirect()->route('articles.indexDashboard')->with('success', 'Article unpublished successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // remove banner image form disk
        $image = Images::where('article_id', $id)->first();
        $path = strstr($image->image_url, 'banners/');
        Storage::disk('public')->delete($path);

        // remove gallery image from disk
        $gallery = Gallery::where('article_id', $id)->get();
        foreach ($gallery as $item) {
            $path = strstr($item->image_url, 'galleries/');
            Storage::disk('public')->delete($path);
        }

        // remove from database
        $articles = Articles::find($id);
        $articles->delete();


        return redirect()->route('articles.indexDashboard')->with('success', 'Articles deleted successfully');
    }
}
