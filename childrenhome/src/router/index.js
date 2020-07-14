import Vue from 'vue'
import Router from 'vue-router'

import loginPage from '@/components/loginPage'
import childrenHomePage from '@/components/childrenHomePage'
import ennterPage from '@/components/ennterPage'
import home from '@/components/index'
import newsDetail from '@/components/newsDetail'
import activityDetail from '@/components/activityDetail'
import courseDetail from '@/components/courseDetail'
import childrenHomeDetail from '@/components/childrenHomeDetail'
import lessonPage from '@/components/lessonPage'
import changeCityPage from '@/components/changeCityPage'
import socialParticipation from '@/components/socialParticipation'
import familyResponsibility from '@/components/familyResponsibility'
import careIndex from '@/components/careIndex'

import addChildren from '@/components/addChildren'
import growthStory from '@/components/growthStory'
import addActivity from '@/components/addActivity'
import editActivity from '@/components/editActivity'
import socialWorkstation from '@/components/socialWorkstation'
import socialWorkstationDetail from '@/components/socialWorkstationDetail'
import assistantChildrenHomeDetail from '@/components/assistantChildrenHomeDetail'
import addLowIncomePerson from '@/components/addLowIncomePerson'
import unfinishedActivity from '@/components/unfinishedActivity'
import articleDetail from '@/components/articleDetail'
import assistantEnnterPage from '@/components/assistantEnnterPage'

import accountSetting from '@/components/accountSetting'
import offlineActivity from '@/components/offlineActivity'

import { getUserInfo } from "@/api/home";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/changeCityPage',
    },
    {
      path: '/loginPage',
      name: 'loginPage',
      component: loginPage,
      // meta: {
      //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的

      // },
    },
    //儿童之家首页
    {
      path: '/childrenHomePage',
      name: 'childrenHomePage',
      component: childrenHomePage,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的

      },
    },
    {
      path: '/ennterPage',
      name: 'ennterPage',
      component: ennterPage
    },
    {
      path: '/governmentLed',
      name: 'governmentLed',
      component: home
    },
    {
      path: '/newsDetail',
      name: 'newsDetail',
      component: newsDetail
    },
    {
      path: '/activityDetail',
      name: 'activityDetail',
      component: activityDetail
    },
    {
      path: '/courseDetail',
      name: 'courseDetail',
      component: courseDetail
    },
    {
      path: '/childrenHomeDetail',
      name: 'childrenHomeDetail',
      component: childrenHomeDetail
    },
    {
      path: '/lessonPage',
      name: 'lessonPage',
      component: lessonPage
    },
    {
      path: '/socialParticipation',
      name: 'socialParticipation',
      component: socialParticipation,

    },
    {
      path: '/familyResponsibility',
      name: 'familyResponsibility',
      component: familyResponsibility,

    },
    {
      path: '/careIndex',
      name: 'careIndex',
      component: careIndex
    },
    {
      path: '/growthStory',
      name: 'growthStory',
      component: growthStory
    },
    {
      path: '/changeCityPage',
      name: 'changeCityPage',
      component: changeCityPage
    },
    {
      path: '/accountSetting',
      name: 'accountSetting',
      component: accountSetting,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的

      },
    },
    //线下活动
    {
      path: '/offlineActivity',
      name: 'offlineActivity',
      component: offlineActivity,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的

      },
    },
    {
      path: '/addActivity',
      name: 'addActivity',
      component: addActivity,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的

      },
    },
    //新建儿童信息
    {
      path: '/addChildren',
      name: 'addChildren',
      component: addChildren,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的

      },
    },
    //编辑活动信息
    {
      path: '/editActivity',
      name: 'editActivity',
      component: editActivity
    },
    //社会工作站
    {
      path: '/socialWorkstation',
      name: 'socialWorkstation',
      component: socialWorkstation,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的

      },
    },
    {
      path: '/socialWorkstationDetail',
      name: 'socialWorkstationDetail',
      component: socialWorkstationDetail,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的

      },
    },
    {
      path: '/assistantChildrenHomeDetail',
      name: 'assistantChildrenHomeDetail',
      component: assistantChildrenHomeDetail,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的

      },
    },
    {
      path: '/addLowIncomePerson',
      name: 'addLowIncomePerson',
      component: addLowIncomePerson,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的

      },
    },
    //线下未完成活动
    {
      path: '/unfinishedActivity',
      name: 'unfinishedActivity',
      component: unfinishedActivity,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的

      },
    },
    //成长故事详情
    {
      path: '/articleDetail',
      name: 'articleDetail',
      component: articleDetail,
    },
    //助手端入口
    {
      path: '/assistantEnnterPage',
      name: 'assistantEnnterPage',
      component: assistantEnnterPage,
    },
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  //判断是否需要登录
  if (to.meta.requireAuth || to.fullPath === '/loginPage') {
    if (window.localStorage.getItem('Token')) {
      if (to.fullPath === '/loginPage') {
        getUserInfo(window.localStorage.getItem('Token'))
          .then(res => {
            console.log("getUserInfo", res);
            //type 4:儿童主任,显示儿童之家，type 社会救助服务管理员 显示社工服务   1. 市级管理员 2. 县级管理员  3. 镇级管理员 4. 村级管理员 5. 村级讲师 6. 助理 7. 志愿者 11. 家长用户
            if (res.data.user.Type === 4) {
              next({
                path: "/childrenHomePage",
                // path: '/socialWorkstation',
                query: {
                  User: res.data.user,
                  UserTpye: res.data.user.Type,
                }
              })
            } else if (res.data.user.Type === 12) {
              next({
                path: "/socialWorkstation",
                query: {
                  User: res.data.user,
                  UserTpye: res.data.user.Type,
                }
              })
            } else {
              next({
                path: "/governmentLed",
                query: {
                  User: res.data.user,
                  UserTpye: res.data.user.Type,
                }
              })
            }
          })
          .catch(err2 => {
            console.log("err", err2);
          });
      } else {
        next()
      }
    } else {
      if (to.fullPath === '/loginPage') {
        next()
      } else {
        next("/loginPage")
      }

    }
  } else {
    next()
  }
})
export default router
