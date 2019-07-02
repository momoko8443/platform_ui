import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import dashboard from './views/dashboard.vue'
import errorPage from './views/errorPage.vue'
import emptyPage from './views/emptyPage.vue'
import idmHome from './views/idmHome'
import memberMgr from './views/idm/memberMgr.vue'
import roleMgr from './views/idm/roleMgr.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  //base: process.env.BASE_URL?process.env.BASE_URL:'/main',
  base: '/main',
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
          path: 'empty',
          name: 'empty',
          component: emptyPage,
        },
        
        {
          path:'idm',
          name:'idm',
          component: idmHome,
          meta: {
            nav:[
              {name:"权限管理", path:"idm"}
            ]
          }
        },
        {
          path:'member',
          name:'member',
          component: memberMgr,
          meta: {
            nav:[
              {name:"权限管理", path:"idm"},
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
              {name:"权限管理", path:"idm"},
              {name:"角色", path:"role"}
            ]
          }
        },
      ]
    },
  ]
})
