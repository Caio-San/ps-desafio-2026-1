<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Artigo extends Model
{
    /** @use HasFactory<\Database\Factories\ArtigoFactory> */
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'name',
        'brand',
        'price',
        'year',
        'image',
        'amount',
        'category_id',
    ];


    public function category() {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    protected static function booted()
    {
        static::deleting(function ($artigo) {
            if ($artigo->image) {
                try {
                    $image_name = explode('artigos/', $artigo['image']);
                    Storage::disk('public')->delete('artigos/' . $image_name[1]);
                } catch (Throwable) {
                }
            }
        });
    }
}
