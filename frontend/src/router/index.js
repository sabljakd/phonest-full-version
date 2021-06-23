import Vue from 'vue'
import VueRouter from 'vue-router'
import jwt from 'jsonwebtoken';
import store from '@/store'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'naslovnica',
    component: () => import(/* webpackChunkName: "about" */ '../views/naslovnica.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    beforeEnter: routeGuard,
    component: () => import(/* webpackChunkName: "about" */ '../views/posts.vue')
  },
  {
    path: '/phone/:id',
    name: 'detaljno',
    component: () => import(/* webpackChunkName: "about" */ '../views/detaljno.vue')
  },
  {
    path: '/dodavanje',
    name: 'dodavanje',
    beforeEnter: routeGuard,
    component: () => import(/* webpackChunkName: "about" */ '../views/dodavanje.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "about" */ '../components/signin.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../components/login.vue')
  },
  {
    path: '/profil',
    name: 'profil',
    beforeEnter: routeGuard,
    component: () => import(/* webpackChunkName: "about" */ '../components/profil.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


function routeGuard(to, from, next)
{
    store.token = localStorage.getItem('token')
    console.log(store.token);
    if(store.token === null || store.token === undefined) next('/')  
  	let decoded = jwt.verify(store.token, 'phonesApp')
    if(decoded){
      store.user = decoded._id
        next()
    }else {
        localStorage.clear()
        next('/');
    }  
}


export default router
