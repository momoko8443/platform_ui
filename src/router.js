import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import erpHome from './views/erpHome.vue'
import dashboard from './views/dashboard.vue'
import warehouse from './views/warehouse.vue'
import goods from './views/goods.vue'
import purchaseMgr from './views/purchaseMgr.vue'
import purchaseCreate from './views/purchaseCreate.vue'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: '',
          name: 'dashboard',
          component: dashboard,
        },
        {
          path:'erp',
          name:'erp',
          component: erpHome,
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'warehouse',
          name: 'warehouse',
          component: warehouse
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'goods',
          name: 'goods',
          component: goods
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'purchase',
          name: 'purchase',
          component: purchaseMgr
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'purchase_create',
          name: 'purchase_create',
          component: purchaseCreate
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
