<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'project_id',
        'article_id',
        'image_url',
        'created_by',
        "created_at",
        'updated_by',
        "updated_at",
    ];

    public function project()
    {
        return $this->belongsTo(Projects::class, 'project_id', 'id');
    }

    public function article()
    {
        return $this->belongsTo(Articles::class, 'article_id', 'id');
    }
}
