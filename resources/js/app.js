
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import moment from 'moment';
import { Form, HasError, AlertError } from 'vform';

// sweet alert notification
import swal from 'sweetalert2'
window.swal = swal;

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  window.toast = toast;

window.Form = Form;

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

// import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// import tags
import VueTags from 'vue-tags'
//Vue.use(VueTags);
Vue.component('input-tags', VueTags);

// import tinymce
import tinymce from '@tinymce/tinymce-vue'
Vue.component('tinymce', tinymce)

//start vue progress bar
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
  })
//end vue progress bar

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
    },
    {
        path: '/locations',
        component: require('./components/Location.vue')
    },
    {
        path: '/developer',
        component: require('./components/Developer.vue')
    },
    {
        path: '/blog',
        component: require('./components/Blog.vue')
    },
    {
        path: '/blog/new',
        component: require('./components/BlogNew.vue')
    },
]

const router = new VueRouter ({
   mode: 'history',
    routes //short for routes
})

Vue.filter('upText', function(text) {
    // return text.toUpperCase(); ->this converts ALL text to uppercase
    return text.charAt(0).toUpperCase() + text.slice(1);
})

Vue.filter('myDate', function(created) {
    return moment(created).format('MMMM Do YYYY');
})


Vue.filter('slugify', function(value) {
    value = value.replace(/^\s+|\s+$/g, ''); // trim
    value = value.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      value = value.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
  
    value = value.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes
  
    return value;
  });
  
  var slug = function(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
  
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes
  
    return str;
  };

// update after every change
window.Fire = new Vue();

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example-component', require('./components/ExampleComponent.vue'));

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue')
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue')
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue')
);

const app = new Vue({
    el: '#app',
    router
});
