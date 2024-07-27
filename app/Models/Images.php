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
}
