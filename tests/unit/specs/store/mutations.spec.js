import session from '@/session.js'
import authStore from '@/store/modules/auth.js'
const mutations = authStore.mutations

jest.mock('@/session.js', () => ({
	currentUser: jest.fn(() => ({firstName: 'Jon', lastName: 'Anderson'})),
}))

describe('DataCheck mutations', () => {
	describe('serverDown', () => {
		const state = {loading: true}
		it('should set a server down message', () => {
			mutations.serverDown(state)
			expect(state.serverDown).toBeDefined()
			expect(state.loading).toBe(false)
		})
	})
	describe('loaded', () => {
		const state = {loading: true}
		it('should set loading to false', () => {
			mutations.loaded(state)
			expect(state.loading).toBe(false)
		})
	})
	describe('login', () => {
		const state = {loading: true}
		it('should set the user', () => {
			mutations.login(state)
			expect(session.currentUser).toBeCalled()
			expect(state.user).toEqual({firstName: 'Jon', lastName: 'Anderson'})
			expect(state.loading).toBe(false)
		})
	})
	describe('logout', () => {
		const state = {loading: true}
		it('should unset the user', () => {
			mutations.logout(state)
			expect(state.user).toEqual({})
			expect(state.loading).toBe(false)
		})
	})
})
