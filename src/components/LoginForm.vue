<template>
<form id="login-form" class="needs-validation form-inline ml-5 flex-nowrap" novalidate @submit.prevent="login(userLogin)">
	<div class="input-group mr-3">
		<div class="input-group-prepend">
			<span class="input-group-text" id="basic-addon">
				<i class="fa fa-envelope prefix"></i>
			</span>
		</div>
		<input class="form-control border border-left-0" aria-label="Email Address" type="email"
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
import {mapActions} from 'vuex'
const stackTop = {
	dir1: 'down',
	firstpos1: 55,
	firstpos2: 240,
	push: 'top',
	modal: false,
	context: document.getElementById('login-form'),
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
				var loginData = data
			}).catch(err => {
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
	},
}
</script>
<style scoped>
input {
	border-bottom-right-radius: 4px !important;
	border-top-right-radius: 4px !important;
}
 .ui-pnotify.stackTop {
      top: auto;
      left: auto;
      bottom: 200px;
      right: 200px;
    }
</style>
