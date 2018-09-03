import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import AddAccount from '@/components/AddAccount'
import FindAccount from '@/components/FindAccount'
import test from '@/components/JorDan'
Vue.use(Router)

export default new Router({
  routes: [
    //{
    //  path: '/',
    //  name: 'HelloWorld',
    //  component: HelloWorld
    //},
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add',
      name: 'AddAccount',
      component: AddAccount
    },
    {
      path: '/find',
      name: 'FindAccount',
      component: FindAccount
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
