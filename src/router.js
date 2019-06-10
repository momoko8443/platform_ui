import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import erpHome from './views/erpHome.vue'
import dashboard from './views/dashboard.vue'
import errorPage from './views/errorPage.vue'
import idmHome from './views/idmHome'
import memberMgr from './views/idm/memberMgr.vue'
import roleMgr from './views/idm/roleMgr.vue'
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
          path: 'error',
          name: 'error',
          component: errorPage,
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
          path:'idm',
          name:'idm',
          component: idmHome,
          meta: {
            nav:[
              {name:"物", path:"idm"}
            ]
          }
        },
        {
          path:'member',
          name:'member',
          component: memberMgr,
          meta: {
            nav:[
              {name:"人", path:"idm"},
              {name:"成员", path:"member"}
            ]
          }
        },
        {
          path:'role',
          name:'role',
          component: roleMgr,
          meta: {
            nav:[
              {name:"人", path:"idm"},
              {name:"角色", path:"role"}
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
  ]
})
