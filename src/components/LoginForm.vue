<template>
<form id="login-form" class="needs-validation form-inline ml-5 flex-nowrap" novalidate @submit.prevent="login(userLogin)">
	<div class="input-group mr-3">
		<div class="input-group-prepend">
			<span class="input-group-text" id="basic-addon">
				<i class="fa fa-envelope prefix"></i>
			</span>
		</div>
		<input class="form-control border border-left-0 rounded" aria-label="Email Address" type="email"
			v-model="userLogin.email" id="emailAddress" label="emailAddress" placeholder="Email Address" required>
		<div class="invalid-tooltip">Please enter a valid email address.</div>
	</div>
	<div class="input-group">
		<div class="input-group-prepend">
			<span class="input-group-text" id="basic-addon">
				<i class="fa fa-lock prefix"></i>
			</span>
		</div>
		<label for="password" class="sr-only">Password</label>
		<input class="form-control" aria-label="Your password" v-model="userLogin.password" label="Your password"
			placeholder="Your password" id="password" icon="lock" type="password" required>
		<div class="invalid-tooltip">Please enter a password.</div>
	</div>
	<mdb-btn icon="user" iconClass="pr-2" iconLeft>
		<span class="white-text font-weight-bold">Login</span>
	</mdb-btn>
</form>
</template>

<script>
import session from '../session.js'
import {mdbBtn} from 'mdbvue'
import {mapActions, mapGetters} from 'vuex'
const stackTop = {
  dir1: 'down', // With a dir1 of 'up', the stacks will start appearing at the bottom.
  // Without a `dir2`, this stack will be horizontally centered, since the `dir1` axis is vertical.
  firstpos1: 55, // The notices will appear 25 pixels from the bottom of the context.
  firstpos2: 240,
  push: 'top', // Each new notice will appear at the bottom of the screen, which is where the 'top' of the stack is. Other notices will be pushed up.
  modal: false, // When a notice appears in this stack, a modal overlay will be created.
   // When the user clicks on the overlay, all notices in this stack will be closed.
  context: document.getElementById('login-form') // The notices will be placed in the 'page-container' element.
}
export default {
	name: 'LoginForm',
	components: {mdbBtn},
	data() {
		return {
			userLogin: {
				email: '',
				password: '',
			},
		}
	},
	computed: {
		user() { return this.$store.state.user },
	},
	methods: {
		...mapActions(['login']),
		loginUser() {
			var error = ''
			session.login(this.userLogin.email, this.userLogin.password, false).then((data) => {
			console.log('session.login returned in action.login > then: ', data)
		}).catch(err => {
			console.log('session.login error: ' + err.message)
			error = err
		})
			this.$pnotify.alert({
						text: 'another message',
						left: '900px',
						delay: 6000,
						stack: stackTop,
					})
		},
		 close() {
			 this.$emit('close', event)
		 },
	}
}
</script>
<style scoped>
 .ui-pnotify.stackTop {
      top: auto;
      left: auto;
      bottom: 200px;
      right: 200px;
    }
</style>
