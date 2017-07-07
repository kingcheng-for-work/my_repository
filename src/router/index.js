import Vue from 'vue'
import Router from 'vue-router'

import Movie from '@/components/movie/movie'
import Cinema from '@/components/cinema/cinema'
import Show from '@/components/show/show'
import Shopmall from '@/components/shopmall/shopmall'
import Mine from '@/components/mine/mine'
import Location from '@/components/location'
import Detail from '@/components/common/detail'
import Theatre from '@/components/common/theatre'
import Schedule from '@/components/show/schedule'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: "/movie"},
//  {path: '/location', name: 'location', component: Location},
    
    {path: '/movie', name: 'movie', component: Movie,
    	children:[
    		{path: 'location', name: 'location', component: Location},
    		{path: 'detail/:id', name: 'detail', component: Detail,
    			children:[
    				{path: 'theatre', name:'theatre',component: Theatre}
    			]
    		}
    	]
    },
    
    
    {path: '/cinema', name: 'cinema', component: Cinema},
    {path: '/cinema/location', name: 'location', component: Location},
    
    {path: '/show', name: 'show', component: Show,
    	children:[
    		{path: 'schedule/:id' , name:'schedule', component:Schedule}
    	]
    },
    {path: '/shopmall', name: 'shopmall', component: Shopmall},
    {path: '/mine', name: 'mine', component: Mine}
    
  ]
})
