import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../views/Login/login.vue')
  },
  {
    path: '/manage',
    component: () => import('../views/Manage/index.vue'),
    children: [
      {
        path: '/manage/sendMessage',
        component: () => import('../views/Manage/sendMessage/index.vue')
      },
      {
        path: '/manage/ruleConfig',
        component: () => import('../views/Manage/ruleConfig/index.vue')
      },
      {
        path: '/manage/messageTemplate',
        component: () => import('../views/Manage/messageTemplate/index.vue')
      },
      {
        path: '/manage/dataBoard',
        component: () => import('../views/Manage/dataBoard/index.vue')
      },
      {
        path: '/manage/userManage/manage',
        component: () => import('../views/Manage/userManage/manage/index.vue')
      },
      {
        path: '/manage/userManage/userGroup',
        component: () => import('../views/Manage/userManage/userGroup/index.vue')
      },
      {
        path: '/manage/userManage/groupConfig',
        component: () => import('../views/Manage/userManage/groupConfig/index.vue')
      },
      {
        path: '/manage/robotManage',
        component: () => import('../views/Manage/robotManage/index.vue')
      },
      {
        path: '/manage/alarmReminder',
        component: () => import('../views/Manage/alarmReminder/index.vue')
      },
      {
        path: '/manage/missionLog',
        component: () => import('../views/Manage/missionLog/index.vue')
      },
      {
        path: '/manage/informLog',
        component: () => import('../views/Manage/informLog/index.vue')
      },

    ]
  },

]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
