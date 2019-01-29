import actions from '@/store/modules/auth/actions.js'
import auth from '@/api/auth.js'
import session from '@/session.js'
import router from '@/router.js'

jest.mock('@/api/auth.js', () => ({isServerUp: jest.fn().mockResolvedValue({status: 200})}))
jest.mock('@/session.js', () => ({
	validateLocalToken: jest.fn().mockResolvedValue(false),
	getSharedTabSession: jest.fn(cb => cb()),
	login: jest.fn().mockResolvedValue({}),
	logout: jest.fn().mockResolvedValue({}),
}))
jest.mock('@/router.js', () => ({push: jest.fn()}))

const ctx = {
	dispatch: jest.fn().mockResolvedValue({}),
	commit: jest.fn(),
	getters: {},
}

describe('DataCheck actions', () => {
	describe('checkLogin', () => {
		it('should change state for server down when rejected', async() => {
			auth.isServerUp.mockRejectedValueOnce({})
			await actions.checkLogin(ctx)
			expect(auth.isServerUp).toBeCalled()
			expect(ctx.commit).toBeCalledWith('serverDown')
		})
		it('should change state for server down when resolved without status 200', async() => {
			auth.isServerUp.mockResolvedValueOnce({})
			await actions.checkLogin(ctx)
			expect(auth.isServerUp).toBeCalled()
			expect(ctx.commit).toBeCalledWith('serverDown')
		})
		it('should try to login when server is up', async() => {
			await actions.checkLogin(ctx)
			expect(auth.isServerUp).toBeCalled()
			expect(ctx.dispatch).toBeCalledWith('tryLogin')
		})
	})
	describe('tryLogin', () => {
		it('should set the app to not be loading if token found and user is already logged in', async() => {
			ctx.getters.isLoggedIn = true
			await actions.tryLogin(ctx)
			expect(session.validateLocalToken).toBeCalled()
			expect(session.getSharedTabSession).toBeCalled()
			expect(ctx.commit).not.toBeCalledWith('login')
			expect(ctx.commit).toBeCalledWith('loaded')
		})
		it('should find the token on other tab if current is invalid', async() => {
			ctx.getters.isLoggedIn = false
			await actions.tryLogin(ctx)
			expect(session.validateLocalToken).toBeCalled()
			expect(session.getSharedTabSession).toBeCalled()
			expect(ctx.commit).toBeCalledWith('login')
			expect(ctx.commit).toBeCalledWith('loaded')
		})
		it('should login if token is valid', async() => {
			session.validateLocalToken.mockResolvedValueOnce(true)
			await actions.tryLogin(ctx)
			expect(session.validateLocalToken).toBeCalled()
			expect(ctx.commit).toBeCalledWith('login')
			expect(ctx.commit).not.toBeCalledWith('loaded')
		})
	})
	describe('login', () => {
		it('should not log in on error', async() => {
			session.login.mockRejectedValueOnce({message: 'foo!'})
			const login = {email: 't@f.oo', password: 'password'}
			await actions.login(ctx, login)
			expect(session.login).toBeCalledWith('t@f.oo', 'password', false)
			expect(ctx.commit).not.toBeCalled()
		})
		it('should attempt to log user in', async() => {
			const login = {email: 't@f.oo', password: 'password'}
			await actions.login(ctx, login)
			expect(session.login).toBeCalledWith('t@f.oo', 'password', false)
			expect(ctx.commit).toBeCalledWith('login')
		})
	})
	describe('logout', () => {
		it('should logout of session and navigate home', async() => {
			await actions.logout(ctx)
			expect(session.logout).toBeCalled()
			expect(router.push).toBeCalledWith('/')
			expect(ctx.commit).toBeCalledWith('logout')
		})
	})
})
