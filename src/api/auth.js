import axios from 'axios'
import axiosRetry from 'axios-retry'
import qs from 'qs'

const ROOT_URL = 'http://dat-edge.epa.gov:9301'
const CLIENT = 'ncct-dat'
const readClientPw = 'SiFZR2RqJmt1bGdmOTgz'
const writeClientPw = 'K0tVaCpIRlI5QDg3'
const CLIENT_SECRET = CLIENT === 'ncct-dat' ? writeClientPw : readClientPw
const BASIC_AUTH = 'Basic ' + btoa(CLIENT + ':' + atob(CLIENT_SECRET))

const qcAuthAxios = axios.create({
	baseURL: ROOT_URL,
	headers: {
		Authorization: BASIC_AUTH,
		'Content-Type': 'application/x-www-form-urlencoded',
		Accept: 'application/json',
	},
})

axiosRetry(qcAuthAxios, {retries: 3})

export default {
	isServerUp() {
		console.log('isServerUp')
		const url = `${ROOT_URL}/oauth/token`
		return qcAuthAxios.options({
			url,
		})
	},
	validateLocalTokenRequest(token) {
		console.log('validateLocalTokenRequest')
		const url = `${ROOT_URL}`
		return axios({
			url,
			transformResponse: [
				() => {
					if (token[0] === 'h' && token[token.length - 1] === 'c') {
						return {success: true}
					} else {
						return {success: false}
					}
				},
			],
		})
	},
	login(email, password) {
		const url = `${ROOT_URL}/oauth/token`
		return qcAuthAxios.post(url, qs.stringify({
			grant_type: 'password',
			username: email,
			password: password,
			client_id: CLIENT,
		})).catch(function(error) {
			if (error.response) {
				return error
			} else if (error.request) {
				return error
			} else {
				// Something happened in setting up the request that triggered an Error
				return error
			}
		})
	},
	requestRefreshToken(token) {
		const url = `${ROOT_URL}/oauth/token`
		return qcAuthAxios.post(url, qs.stringify({
			grant_type: 'refresh_token',
			refresh_token: token,
		})).catch(function(error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				return error
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				return error
			} else {
				// Something happened in setting up the request that triggered an Error
				return error
			}
		})
	},

	logout() {
		console.log('logout')
		return qcAuthAxios.options({
			ROOT_URL,
		})
	},
}
