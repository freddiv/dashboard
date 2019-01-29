<template>
<Footer color="default-color align-middle">
	<div class="d-flex flex-lg-row d-inline-flex w-100 mt-5">
		<div class="d-flex flex-column justify-content-start h-100 w-25">
			<img class="img-fluid w-100 h-100 ml-2" alt="Responsive image" src="../assets/epa-logo-1.png">
		</div>
			<div class="d-flex flex-row justify-content-around w-75">
				<router-link to="/about" class="info-ic">
					<mdb-tooltip :options="{placement: 'top'}">
						<div class="tooltip">About QC DataCheck</div>
						<i slot="reference" class="fa fa-info-circle white-text mr-md-5 mr-3 fa-3x"></i>
					</mdb-tooltip>
				</router-link>
				<a class="help-ic">
					<mdb-tooltip :options="{placement: 'top'}">
						<div class="tooltip">Help</div>
						<i slot="reference" class="fa fa fa-question-circle-o white-text mr-md-5 mr-3 fa-3x"></i>
					</mdb-tooltip>
				</a>
				<a class="contact-ic">
					<mdb-tooltip :options="{placement: 'top'}">
						<div class="tooltip">Contact us</div>
						<i slot="reference" class="fa fa-at white-text mr-md-5 mr-3 fa-3x"></i>
					</mdb-tooltip>
				</a>
			</div>
	</div>
</Footer>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {
	Footer,
	mdbTooltip,
	Modal,
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
	Column,
	Badge,
	Row,
	Btn,
} from 'mdbvue'

export default {
	name: 'QCFooter',
	components: {
		Footer,
		mdbTooltip,
		Modal,
		ModalHeader,
		ModalTitle,
		ModalBody,
		ModalFooter,
		Column,
		Badge,
		Row,
		Btn,
	},
	data() {
		return {
			error: window.localStorage.getItem('error') || null,
		}
	},
	computed: {
		...mapGetters(['getUser', 'columnDefs', 'isError']),
		isError() {
			return this.error
		},
		isLoggedIn() { return this.$store.getters.isLoggedIn },
	},
	methods: {
		 close() {
			 console.log('close')
			 localStorage.removeItem('error')
			 this.error = null
		 },
	},
	onRender() {
		this.error = window.localStorage.getItem('error')
	},
}
</script>

<style scoped>
footer {
	height: 135px !important;
}
</style>
