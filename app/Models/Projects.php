<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projects extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'id',
        'title',
        'banner',
        'content',
        'category_id',
        'prototype_link',
        'publish',
        'created_by',
        "created_at",
        'updated_by',
        "updated_at",
    ];

    public function image()
    {
        return $this->hasMany(Images::class, 'id', 'project_id');
    }

    public function category()
    {
        return $this->belongsTo(Categories::class, 'id', 'category_id');
    }

    public function gallery()
    {
        return $this->hasMany(Gallery::class, 'id', 'project_id');
    }
}
