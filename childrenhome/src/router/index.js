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
import growthStory from '@/components/growthStory'


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
  ]
})

const originalPush = Router.prototype.push
  Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router
