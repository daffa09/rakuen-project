<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'id_project',
        'image_url',
        'created_by',
        'updated_by',
    ];

    public function project()
    {
        return $this->belongsTo(Projects::class, 'id_project', 'id');
    }
}
