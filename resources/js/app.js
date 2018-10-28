
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform';

window.Form = Form;

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

// import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = [
    {
        path: '/dashboard',
        component: require('./components/Dashboard.vue')
    },
    {
        path: '/profile',
        component: require('./components/Profile.vue')
    },
    {
        path: '/users',
        component: require('./components/Users.vue')
    }
]

const router = new VueRouter ({
    mode: 'history',
    routes //short for routes
})

Vue.filter('upText', function(text) {
    // return text.toUpperCase(); ->this converts ALL text to uppercase
    return text.charAt(0).toUpperCase() + text.slice(1);
})


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app',
    router
});
