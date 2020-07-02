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


import accountSetting from '@/components/accountSetting'
import offlineActivity from '@/components/offlineActivity'



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
      component: loginPage
    }, 
    //儿童之家首页
    {
      path: '/childrenHomePage',
      name: 'childrenHomePage',
      component: childrenHomePage
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
      component: socialParticipation
    },
    {
      path: '/familyResponsibility',
      name: 'familyResponsibility',
      component: familyResponsibility
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
      component: accountSetting
    },
    //线下活动
    {
      path: '/offlineActivity',
      name: 'offlineActivity',
      component: offlineActivity
    },
    {
      path: '/addActivity',
      name: 'addActivity',
      component: addActivity
    },
    //新建儿童信息
    {
      path: '/addChildren',
      name: 'addChildren',
      component: addChildren
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
      component: socialWorkstation
    },
    {
      path: '/socialWorkstationDetail',
      name: 'socialWorkstationDetail',
      component: socialWorkstationDetail
    },
    {
      path: '/assistantChildrenHomeDetail',
      name: 'assistantChildrenHomeDetail',
      component: assistantChildrenHomeDetail
    },
    {
      path: '/addLowIncomePerson',
      name: 'addLowIncomePerson',
      component: addLowIncomePerson
    },
  ] 
})

const originalPush = Router.prototype.push
  Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router
