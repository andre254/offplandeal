<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

class Developer extends Model
{
    use HasApiTokens;

    protected $fillable = [
        'name','desc','slug','logo',
    ];
}
