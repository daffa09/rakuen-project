<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    // Specify the table name
    protected $table = 'gallery';

    protected $fillable = [
        'id',
        'id_project',
        'image_url',
        'created_by',
        'created_at',
        'updated_by',
        'updated_at',
    ];

    public function project()
    {
        return $this->belongsTo(Projects::class, 'id_project', 'id');
    }
}
