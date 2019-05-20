import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import erpHome from './views/erpHome.vue'
import dashboard from './views/dashboard.vue'
import warehouse from './views/warehouse.vue'
import goods from './views/goods.vue'
import purchaseMgr from './views/purchaseMgr.vue'
import purchaseCreate from './views/purchaseCreate.vue'
import saleOrderMgr from './views/saleOrderMgr.vue'
import saleOrderCreate from './views/saleOrderCreate.vue'
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
          meta: {
            nav:[
              {name:"物", path:"erp"}
            ]
          }
        },
        {
          path: 'warehouse',
          name: 'warehouse',
          component: warehouse,
          meta: {
            nav:[
              {name:"物", path:"erp"},
              {name:"库存", path:"warehouse"}
            ]
          }
        },
        {
          path: 'goods',
          name: 'goods',
          component: goods,
          meta: {
            nav:[
              {name:"物", path:"erp"},
              {name:"初始", path:"goods"}
            ]
          }
        },
        {
          path: 'purchase',
          name: 'purchase',
          component: purchaseMgr,
          meta: {
            nav:[
              {name:"物", path:"erp"},
              {name:"进货", path:"purchase"}
            ]
          }
        },
        {
          path: 'purchase_create',
          name: 'purchase_create',
          component: purchaseCreate,
          meta: {
            nav:[
              {name:"物", path:"erp"},
              {name:"进货", path:"purchase"},
              {name:"创建进货单", path:"purchase_create"}
            ]
          }
        },
        {
          path: 'sale',
          name: 'sale',
          component: saleOrderMgr,
          meta: {
            nav:[
              {name:"物", path:"erp"},
              {name:"销售", path:"sale"},
            ]
          }
        },
        {
          path: 'sale_create',
          name: 'sale_create',
          component: saleOrderCreate,
          meta: {
            nav:[
              {name:"物", path:"erp"},
              {name:"销售", path:"sale"},
              {name:"创建销售单", path:"sale_create"}
            ]
          }
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
