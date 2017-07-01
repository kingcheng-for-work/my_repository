import Vue from 'vue'
import Router from 'vue-router'

import Movie from '@/components/movie/movie'
import Cinema from '@/components/cinema/cinema'
import Show from '@/components/show/show'
import Shopmall from '@/components/shopmall/shopmall'
import Mine from '@/components/mine/mine'
import Location from '@/components/location'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: "/movie"},
//  {path: '/location', name: 'location', component: Location},
    
    {path: '/movie', name: 'movie', component: Movie,
    	children:[
    		{path: 'location', name: 'location', component: Location}
    	]
    },
    
    
    {path: '/cinema', name: 'cinema', component: Cinema},
    {path: '/cinema/location', name: 'location', component: Location},
    
    {path: '/show', name: 'show', component: Show},
    {path: '/shopmall', name: 'shopmall', component: Shopmall},
    {path: '/mine', name: 'mine', component: Mine},
    
//  重定向
		{path: '/*', name: 'movie', component: Movie}
  ]
})
