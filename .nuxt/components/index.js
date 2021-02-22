export { default as ItemList } from '../../components/ItemList.vue'
export { default as LoginForm } from '../../components/LoginForm.vue'
export { default as MainCarousel } from '../../components/MainCarousel.vue'
export { default as VersusFooter } from '../../components/VersusFooter.vue'

export const LazyItemList = import('../../components/ItemList.vue' /* webpackChunkName: "components/item-list" */).then(c => c.default || c)
export const LazyLoginForm = import('../../components/LoginForm.vue' /* webpackChunkName: "components/login-form" */).then(c => c.default || c)
export const LazyMainCarousel = import('../../components/MainCarousel.vue' /* webpackChunkName: "components/main-carousel" */).then(c => c.default || c)
export const LazyVersusFooter = import('../../components/VersusFooter.vue' /* webpackChunkName: "components/versus-footer" */).then(c => c.default || c)
