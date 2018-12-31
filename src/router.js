import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Records from './views/Records.vue'
import Users from './views/Users.vue'
import Allocations from './views/Allocations.vue'
import store from './store/index.js'
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js'
import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons.js'
import PNotifyStyleMaterial from '../node_modules/pnotify/dist/es/PNotifyStyleMaterial.js'
PNotify.defaults.styling = 'material'
// This icon setting requires the Material Icons font. (See below.)
PNotify.defaults.icons = 'material'

Vue.use(Router)

const qcRouter = new Router({
	mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				requireAuth: false,
			},
		}, {
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			// eslint-disable-next-line no-inline-comments
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
			meta: {
				requireAuth: false,
			},
		}, {
			path: '/records',
			name: 'records',
			component: Records,
			meta: {
				requireAuth: true,
			},
		}, {
			path: '/users',
			name: 'users',
			component: Users,
			meta: {
				requireAuth: true,
				requireAdmin: true,
			},
		}, {
			path: '/allocations',
			name: 'allocations',
			component: Allocations,
			meta: {
				requireAuth: true,
				requireAdmin: true,
			},
		},
	],
})

qcRouter.beforeEach((to, from, next) => {
	if (!to.meta.requireAuth) {
	// console.log('if !to.meta.requireAuth')
		if (store.state.loading || !store.getters.isLoggedIn) {
		//	 console.log('store.state.loading || !store.getters.isLoggedIn')
			store.dispatch('timeout')
			return next()
		}
		store.dispatch('timeout')
		return next()
	} else if (!to.meta.requireAdmin) {
		// console.log('if !to.meta.requireAdmin')
		// if user isn't logged in, send them to homepage
		if (!store.state.loading && store.getters.isLoggedIn) {
		//	 console.log('!store.state.loading && store.getters.isLoggedIn')
			 store.dispatch('checkLogin').then(() => {
				// console.log('else !to.meta.requireAdmin')
				if (store.getters.isLoggedIn) {
					store.dispatch('timeout')
					return next()
				}
				return next('/')
			})
		}
		store.dispatch('checkLogin').then(() => {
			// console.log('else !to.meta.requireAdmin')
			if (store.getters.isLoggedIn) {
				store.dispatch('timeout')
				return next()
			}
			return next('/')
		})
	} else {
		if (!store.state.loading && store.getters.isLoggedIn && store.getters.isAdmin) {
			// console.log('!store.state.loading && store.getters.isLoggedIn & store.getters.isAdmin')
			store.dispatch('checkLogin').then(() => {
			// console.log('store.getters.isAdmin: ', store.getters.isAdmin, 'store.getters.isLoggedIn: ', store.getters.isLoggedIn)
				if (store.getters.isAdmin) {
					// console.log('loggedin')
					store.dispatch('timeout')
					return next()
				}
				return next('/')
			})
		}
		 store.dispatch('checkLogin').then(() => {
			if (store.getters.isLoggedIn && store.getters.isAdmin) {
				// console.log('store.getters.isLoggedIn & store.getters.isAdmin')
				store.dispatch('timeout')
				return next()
			}
			return next('/')
		})
	}
})

export default qcRouter
