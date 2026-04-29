<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GalleryImage extends Model
{
    use HasFactory;

    public const TYPES = [
        'Happy Cat',
        'Kittens',
        'New Member',
    ];

    protected $fillable = [
        'type',
        'path',
        'sort_order',
    ];
}
