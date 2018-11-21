import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/Editor'
import Viewer from '@/components/Viewer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/viewer/:route(.*)',
      name: 'Viewer',
      component: Viewer
    },
    {
      path: '/editor/:route(.*)',
      name: 'Editor',
      component: Editor
    }
  ]
})
