<template>
	<mdb-navbar dark position="top" class="default-color lighten-1" scrolling>
		<mdb-navbar-brand class="med-width white-text">
			<router-link to="/">
				<QCLogo color="white">DataCheck - Enabling Quality Data</QCLogo>
			</router-link>
		</mdb-navbar-brand>
		<navbar-collapse>
			<NavLinks v-if="isLoggedIn"/>
			<navbar-nav right>
				<WelcomeLogout v-if="isLoggedIn" :user="getUser"/>
				<LoginForm v-on:error="loginError" v-else/>
			</navbar-nav>
			<!-- Search form -->
		</navbar-collapse>
		<modal v-show="isError" @close="close" danger>
		<modal-header>
			<modal-title>Danger Modal</modal-title>
		</modal-header>
		<modal-body>
			<row>
			<column col="3" class="text-center"><fa icon="shopping-cart" size="4x"/></column>
			<column col="9">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, molestiae provident temporibus sunt earum.</p>
				<h2><badge>v52gs1</badge></h2>
			</column>
			</row>
		</modal-body>
		<modal-footer center>
			<btn color="danger">Get it now <fa icon="diamond" class="ml-1" color="white"/></btn>
			<btn @click="close" outline="danger">No, thanks</btn>
		</modal-footer>
		</modal>
	</mdb-navbar>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import QCLogo from './QCLogo.vue'
import LoginForm from './LoginForm.vue'
import WelcomeLogout from './WelcomeLogout.vue'
import NavLinks from './NavLinks.vue'
import {
	mdbNavbar,
	NavbarNav,
	NavbarCollapse,
	mdbNavbarBrand,
	Modal,
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
	Column,
	Badge,
	Row,
	Fa,
	Btn,
} from 'mdbvue'

export default {
	name: 'QCHeader',
	components: {
		mdbNavbar,
		NavbarNav,
		NavbarCollapse,
		mdbNavbarBrand,
		Modal,
		ModalHeader,
		ModalTitle,
		ModalBody,
		ModalFooter,
		Column,
		Badge,
		Row,
		Fa,
		Btn,
		QCLogo,
		LoginForm,
		WelcomeLogout,
		NavLinks,
	},
	data() {
		return {
			isError: false,
		}
	},
	computed: {
		...mapGetters(['getUser']),

		isLoggedIn() { return this.$store.getters.isLoggedIn },
	},
	methods: {
		loginError() {
			 console.log('loginError')
			if (this.isError === true) {
				this.isError = false
			} else {
				this.isError = true
			}
		},
		close() {
			// console.log('toggleUserModal')
			if (this.isError === true) {
				this.isError = false
			}
		 },
		
	}
}
</script>

<style scoped>
.navbar {
	height: 52px !important
}
</style>
