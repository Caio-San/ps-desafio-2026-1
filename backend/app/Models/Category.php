<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;


class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'name',
    ];

    public function artigos() {
        return $this->hasMany(Artigo::class, 'category_id', 'id');
    }

    protected static function booted()
    {
        self::deleting(function (Category $category) {
            foreach ($category->artigos as $artigo) {
                $artigo->delete();
            }
        });
    }
}
