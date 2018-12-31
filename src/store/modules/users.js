import usersJson from './users/users-json.js'
import api from '../../api/users'
const state = {
	users: [],
	columnDefs: [],
	sortConfig: [],
	filterConfig: [],
	userById: {},
}

const getters = {
	allUsers: state => state.users,
	user: state => state.userById,
	columnDefs: state => state.columnDefs,
}

const actions = {
	 async fetchUsers({
		 rootState,
		 commit,
	}) {
		const {token} = rootState.auth
		const response = await api.fetchUsers(token)
		commit('setColumnDefs', response.data.agGridProfile.columnDefs)
		commit('setUsers', response.data.data)
	},
	async userById({
		id,
		rootState,
		commit,
	}) {
		const {token} = rootState.auth
		const response = await api.userById(id, token)
		commit('setUser', response.data.data)
	},
	fetchUserGrid({commit}) {
		const data = usersJson.user_data
		commit('setUsers', data.rowData)
		commit('setColumnDefs', data.columnDefs)
	},
	fetchUser({commit}, id) {
		const usersArray = state.users
		const newUser = {
			id: '',
			first_name: '',
			last_name: '',
			email: '',
			description: '',
			is_active: false,
			roles: '',
			domains: '',
			expertise: '',
			sources: '',
			date_created: '',
		}

		var found = usersArray.filter(function(user) {
			return user.id === id
		})
		if (found.length === 1) {
			commit('setUser', found[0])
		} else {
			commit('setUser', newUser)
		}
	},
	addUser({commit}, formData) {
	//	commit('setUsers', response.data.data)
	},
}

const mutations = {
	setUsers: (state, users) => {
		state.users = users
	},
	setUser: (state, user) => {
		state.userById = user
	},
	setColumnDefs: (state, columnDefs) => {
		state.columnDefs = columnDefs
	},
	setFilterConfig: (state, filterConfig) => {
		state.filterConfig = filterConfig
	},
	setSortConfig: (state, sortConfig) => {
		state.sortConfig = sortConfig
	},
}

export default {
	state,
	getters,
	actions,
	mutations,
}