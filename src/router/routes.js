

import login from '@/views/login';
import page404 from '@/views/error-page/404';
import page401 from '@/views/error-page/401';
import register from '@/views/register';
import pile_modify from '@/views/admin/pile_modify';
import pile_query from '@/views/admin/pile_query';
import report_query from '@/views/admin/report_query';
import charge_modify from '@/views/user/charge_modify';
// import charge_cancel from '@/views/user/charge_cancel';
import charge_query from '@/views/user/charge_query';
export const constantRouterMap = [
  { path: '/login', name: 'login', meta: { title: "系统登录", hidden: true }, component: login },
  { path: '/register', name: 'register', meta: { title: "系统注册", hidden: true }, component: register},
  { path: "/404", name: "page404", meta: { title: "页面走丢了", hidden: true }, component: page404 },
  { path: "/401", name: "page401", meta: { title: "权限不足", hidden: true }, component: page401 }
]


const layout = () => import(/* webpackChunkName: "group-index" */ '@/views/layout');
export const asyncRouterMap = [
  {
    path: '/admin',
    name: 'admin',
    meta: { title: "系统管理", icon: "dbm d-icon-zujian" ,roles:['admin']},
    component: layout,
    children: [
      {path:'pile_query',name:'pile_query',meta:{title:'查询充电桩信息',icon:'dbm d-icon-zujian'},component:pile_query},
      {path:'pile_modify',name:'pile_modify',meta:{title:'修改充电桩信息',icon:'dbm d-icon-zujian'},component:pile_modify},
      {path:'report_query',name:'report_query',meta:{title:'查询报表',icon:'dbm d-icon-zujian'},component:report_query},
    ]
  },
  {
    path: '/user',
    name: 'user',
    meta: {title:"充电管理",icon:"dbm d-icon-zujian"},
    component: layout,
    children: [
      {path:'modify',name:'modify',meta:{title:'管理充电请求',icon:'dbm d-icon-zujian'},component:charge_modify},
      {path:'query',name:'query',meta:{title:'查询充电信息',icon:'dbm d-icon-zujian'},component:charge_query},
    ]
  },
  {
    path: '/',
    name: 'index',
    meta: { title: "首页", icon: "dbm d-icon-zujian" },
    component: layout
  },
  //default
  { path: '*', redirect: '/404', hidden: true }
]