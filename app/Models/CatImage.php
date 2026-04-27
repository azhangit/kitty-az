<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CatImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'cat_id',
        'path',
        'sort_order',
    ];

    public function cat(): BelongsTo
    {
        return $this->belongsTo(Cat::class);
    }
}
