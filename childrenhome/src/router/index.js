import Vue from 'vue'
import Router from 'vue-router' 
import home from '@/components/index'
import newsDetail from '@/components/newsDetail'
import socialParticipation from '@/components/socialParticipation'
import familyResponsibility from '@/components/familyResponsibility'
import careIndex from '@/components/careIndex'
import growthStory from '@/components/growthStory'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/governmentLed',
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
  ]
})
