import session from '../../../session.js'
import api from '../../../api/auth'
import Vue from 'vue'

import {debounce} from 'debounce'

export default {

	async checkLogin({commit, getters}) {
		var newToken = {}
		const refreshed = await api.requestRefreshToken(getters.getRefreshToken)
		if (refreshed.data) {
			 newToken.access_token = refreshed.data.access_token
			 newToken.refresh_token = refreshed.data.refresh_token
			 commit('refreshToken', newToken)
		} else {
			const message = `Error validating session. ${refreshed}`
			Vue.pnotify.alert({
				text: message,
				delay: 6000,
				stack: {
					dir1: 'down',
					dir2: 'right',
					firstpos1: 90,
					firstpos2: 600,
				},
			})
			await session.logout()
			commit('logout')
		}
	//	return refreshed
	},
	async tryLogin({commit, getters}) {
		const valid = await session.validateLocalToken()
		if (valid) {
			commit('login')
		} else {
			session.getSharedTabSession(() => {
				if (!getters.isLoggedIn) {
					commit('login')
				}
			})
			commit('loaded')
		}
	},
	login({commit}, userLogin) {
		session.login(userLogin.email, userLogin.password, false).then(() => {
		//	console.log('session.login returned in action.login > then')
			commit('login')
		}).catch(err => {
			return err
			// commit('error', err.message)
			//		console.log('session.login error: ' + err.message)
		})
	},
	async logout({commit}) {
		await session.logout()
		commit('logout')
		location.reload(true)
	},
	timeout() {
	//	console.log('called timeout')
		debounce(timeout, 1800000)
	},
}

function timeout({dispatch}) {
//	console.log('wtf timeout')
	dispatch('logout')
}
