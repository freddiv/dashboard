import actions from './auth/actions.js'
import router from '../../router.js'

const state = {
	loading: true,
	token: window.localStorage.getItem('token') || null,
	refresh_token: window.localStorage.getItem('refresh_token') || null,
	user: window.localStorage.getItem('user') || null,
	error: window.localStorage.getItem('error') || null,
	authorities: window.localStorage.getItem('authorities') || ' ',
	serverDown: null,
}
const getters = {
	isLoggedIn() { return state.token},
	isAdmin() {return	state.authorities ? state.authorities.indexOf('ROLE_ADMIN') > -1 : null},
	isError() {return state.error},
	getUser: state => state.user,
	getRefreshToken: state => state.refresh_token,
}
const mutations = {
	serverDown(state) {
		state.loading = false
		state.serverDown = 'The server is currently unreachable. Please try again later.'
		state.error = 'The server is currently unreachable. Please try again later.'
	},
	loaded(state) {
		state.loading = false
	},
	error(state, error) {
		state.error = error
	},
	login(state) {
		state.loading = false
		state.error = null
		state.token = window.localStorage.getItem('token')
		state.refresh_token = window.localStorage.getItem('refresh_token')
		state.authorities = window.localStorage.getItem('authorities')
		state.user = window.localStorage.getItem('user')
		router.push('/users')
	},
	logout(state) {
		state.loading = false
		window.localStorage.clear()
		state.user = {}
		state.token = null
		state.refresh_token = null
		state.authorities = null
		window.localStorage.clear()
		router.push('/')
	},
	refreshToken(newToken) {
		window.localStorage.setItem('token', newToken.token)
		window.localStorage.setItem('refresh_token', newToken.refresh_token)
		state.token = window.localStorage.getItem('token')
		state.refresh_token = window.localStorage.getItem('refresh_token')
	}
}

export default {
	  state,
	  getters,
	  actions,
	  mutations,
}
