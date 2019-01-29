import authStore from '@/store/modules/auth.js'
const getters = authStore.getters

describe('DataCheck getters', () => {
	const state = {user: {}}
	describe('isLoggedIn', () => {
		it('should return whether the user exists', () => {
			expect(getters.isLoggedIn(state)).toBe(false)
			state.user = {firstName: 'Jon', lastName: 'Anderson'}
			expect(getters.isLoggedIn(state)).toBe(true)
		})
	})
	describe('isAdmin', () => {
		it('should return whether the user has admin rights', () => {
			expect(getters.isAdmin(state)).toBe(false)
			state.user = {
				firstName: 'Jon', lastName: 'Anderson', authorities: ['ROLE_ADMIN'],
			}
			expect(getters.isAdmin(state)).toBe(true)
		})
	})
})
