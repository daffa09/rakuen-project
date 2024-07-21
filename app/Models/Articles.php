<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Articles extends Model
{
    use HasFactory;

    protected $fillable =
    [
        'title',
        'banner',
        'content',
        'category_id',
        'created_by',
        'updated_by',
    ];
}
