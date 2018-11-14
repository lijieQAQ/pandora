import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import Layout from '@/views/layout/Layout'
import priceLadder from '@/views/priceLadder/priceLadder'
import bmwProduct from '@/views/bmwProduct/bmwProduct'
import MasterDataBmw from '@/components/MasterDataBmw'
import MasterDataCmp from '@/components/MasterDataCmp'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: 'priceLadder',
          component: priceLadder
        },
        {
          path: 'bmwProduct',
          component: bmwProduct,
          children: [
            {
              path: 'masterDateBmw',
              component: MasterDataBmw
            },
            {
              path: 'masterDateCmp',
              component: MasterDataCmp
            }
          ]
        }]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
