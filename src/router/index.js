import Vue from 'vue'
import Router from 'vue-router'
import List from '@/pages/list/List'
import Home from '@/pages/home/Home'
import Set from '@/pages/set/Set'
import Comment from '@/pages/comment/comment'
import Login from '@/components/Login'
import Reginster from '@/components/Reginster'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/home'
    },
    {
      path:'/home',
      name:'home',
      component:Home,
    },
    {
      path:'/list',
      name:'List',
      component:List,
    },
    {
      path:'/login',
      name:'login',
      component:Login,
    },
    {
      path:'/reginster',
      name:'reginster',
      component:Reginster,
    },
    {
      path:'/set',
      name:'set',
      component:Set,
    },
    {
      path:'/comment',
      name:'set',
      component:Comment,
    },
  ]
})
