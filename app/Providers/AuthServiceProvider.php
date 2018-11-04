<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot(GateContract $gate)
    {
        Passport::routes();
        
        $this->registerPolicies($gate);

        $gate->define('isAdmin', function($user){
            return $user->type == 'admin';
        });

        $gate->define('isManager', function($user){
            return $user->type == 'manager';
        });

        $gate->define('isBlogger', function($user){
            return $user->type == 'blogger';
        });

        $gate->define('isUser', function($user){
            return $user->type == 'user';
        });
    }
}
