import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Temoignage from '@/pages/Temoignage'
import Quiz from '@/pages/Quiz'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/temoignage/:id',
      name: 'Temoignage',
      component: Temoignage
    },
    {
      path: '/quiz/:id',
      name: 'Quiz',
      component: Quiz
    }
  ]
})
