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
        'prototype_link',
        'publish',
        'created_by',
        'updated_by',
    ];

    public function image()
    {
        return $this->hasMany(Images::class, 'id', 'id_project');
    }
}
