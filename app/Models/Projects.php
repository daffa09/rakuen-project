<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projects extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'title',
        'banner',
        'content',
        'id_image',
        'prototype_link',
        'publish',
        'created_by',
        'updated_by',
    ];
}
