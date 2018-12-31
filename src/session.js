import api from './api/auth.js'

function login(username, password, remember) {
	return getCredentials(username, password).then(creds => {
		return saveCredentials(creds, remember)
	})
}

function getCredentials(username, password) {
	console.log('getCredentials')
	return api.login(username, password).then(({data}) => {
		if (!data.access_token) {
			throw new Error('Login failed')
		} else {
			const token = data.access_token
			const payload = JSON.parse(atob(data.access_token.split('.')[1]))
			//	console.log(payload)
			const refresh_token = data.refresh_token
			const authorities = payload.authorities
			const currentUser = {
				first_name: payload.nameFirst,
				last_name: payload.nameLast,
				email: payload.user_name,
				id: payload.userId,
			}
			return {
				token: token,
				refresh_token: refresh_token,
				authorities: authorities,
				user: currentUser,
			}
		}
	}).catch(err => {
		return err
		//		console.log('session.login error: ' + err.message)
	})
}
	
	// save credentials from server to local
function saveCredentials(creds) {
	if (creds.token && creds.user) {
		const storage = window.localStorage
		storage.setItem('token', creds.token)
		storage.setItem('refresh_token', creds.refresh_token)
		storage.setItem('user', JSON.stringify(creds.user))
		storage.setItem('authorities', JSON.stringify(creds.authorities))
	} else {
		throw new Error('Error logging in')
	}
}

function refreshToken(refresh_token) {
	return api.requestRefreshToken(refresh_token).then(({data}) => {
	//	console.log(data)
		return data
	}).catch(err => {
		const storage = getStorage()
		const error = `Network Error during token refresh ${err.message}`
		storage.setItem('error', error)
		return error
	})
}

function logout() {
	clearSession()
}

function currentUser() {
	const storage = getStorage()
	return storage ? JSON.parse(storage.getItem('user')) : null
}

function validateLocalToken() {
	// Check if  we actually have things stored first
//	console.log('validateLocalToken')
	const storage = getStorage()
	//	console.log('storage: ', storage)
	if (!storage) {
		return Promise.resolve(false)
	}
	const token = getToken()
	const user = currentUser()

	if (!(token && user)) {
		clearSession()
		return Promise.resolve(false)
	}

	// If we do, check validity
	return api.validateLocalTokenRequest(token).then(({data}) => {
		// Prepare to share with other tabs the correct token
		initializeTabSessionSharing()
		return data.success
	}).catch(() => {
		clearSession()
		return false
	})
}

// Get the credentials from server


function clearSession() {
	window.localStorage.clear()
	window.sessionStorage.clear()
}

// There should only be one storage with data
function getStorage() {
	return window.localStorage
}

function getToken() {
	const storage = getStorage()
	return storage.getItem('token')
}

function initializeTabSessionSharing() {
	// Listen for storage requests
	window.addEventListener('storage', (ev) => {
		if (ev.key === 'getSessionStorage') {
			// Some tab asked for the sessionStorage -> send it
			window.localStorage.setItem('sessionStorage', JSON.stringify(window.sessionStorage))
			window.localStorage.removeItem('sessionStorage')
		}
	})
}

function getSharedTabSession(cb) {
	// Resolves if a valid token was sent from another tab
	window.addEventListener('storage', ev => {
		if (ev.key === 'sessionStorage') {
			// some tab sent us a token -> we use it if we haven't logged in manually already
			if (getToken() || !ev.newValue || !Object.keys(ev.newValue).length) {
				return false
			}
			// Set this tab's session to the received session
			const newStorageValue = JSON.parse(ev.newValue)
			saveCredentials({
				token: newStorageValue.token,
				user: JSON.parse(newStorageValue.user),
			}, false)
			// We assume token is good
			if (cb) {
				return cb()
			}

			// Use this to validate if we don't trust other tab for some reason
			// validateLocalToken().then(isValid => {
			// 	if (isValid) {
			// 		res()
			// 	} else {
			// 		clearSession()
			// 	}
			// })
		}
		return false
	})

	// Ask for a token
	window.localStorage.setItem('getSessionStorage', Date.now().toString())
}

export default {
	validateLocalToken, login, logout, currentUser, getToken, getSharedTabSession, refreshToken,
}
