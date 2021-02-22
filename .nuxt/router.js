import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _cd488d4c = () => interopDefault(import('../pages/createPost.vue' /* webpackChunkName: "pages/createPost" */))
const _5153587b = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _fea48094 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _eac5bcb8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/createPost",
    component: _cd488d4c,
    name: "createPost"
  }, {
    path: "/profile",
    component: _5153587b,
    name: "profile"
  }, {
    path: "/signup",
    component: _fea48094,
    name: "signup"
  }, {
    path: "/",
    component: _eac5bcb8,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
