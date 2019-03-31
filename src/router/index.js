import Vue from 'vue'
import Router from 'vue-router'
import MyWorld from '@/components/MyWorld'
import TodosManager from '@/components/TodosManager'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-129894.okta.com/oauth2/default',
  client_id: '0oaeksir1To3YBRTm356',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MyWorld',
      component: MyWorld
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/todos-manager',
      name: 'TodosManager',
      component: TodosManager,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
