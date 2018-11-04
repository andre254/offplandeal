<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

class Blog extends Model
{
    use HasApiTokens;

    // protected $fillable = [
    //     'title', 'slug', 'feat_img', 'content', 'author', 'meta_title', 'meta_key', 'meta_desc'
    // ];
}
