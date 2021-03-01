import Vue from 'vue'
import Router from 'vue-router'
import AppMainRateCript from '../components/app-main-rate-cript/AppMainRateCript.vue'
import AppMainRate from '../components/app-main-rate/AppMainRate.vue'

Vue.use(Router)

export default new Router ({
    mode: "history",
    routes: [
        {
            path: '/',
            component: AppMainRateCript,
        },
        {
            path: '/rate',
            component: AppMainRate,
        }
    ]
})