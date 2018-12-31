import qs from 'qs'
import axios from 'axios'

const ROOT_URL = 'http://dat-edge.epa.gov:9301/api/users'

export default {
	fetchUsers(token) {
		return axios.get(`${ROOT_URL}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
			},
		})
	},
	userById(id, token) {
		return axios.get(`${ROOT_URL}/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
			},
		})
	},
}