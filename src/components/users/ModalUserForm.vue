<template>
	<container>
		<row>
			<column size="12" class="text-center mb-5">
				 <modal @close="close" cascade class="text-left">
					<form class="needs-validation" id="userForm"  @keydown="stopRKey()"  @submit.prevent="addUser()">
					<modal-header class="primary-color white-text">
						<h4 class="title"><fa v-if="userId != 0" class="fa fa-pencil" /><fa v-if="userId == 0" class="fa fa-user" /> {{userId == 0 ? 'Add New' : 'Edit'}} User </h4>
					</modal-header>
					<modal-body class="grey-text">
					<div class="input-group mt-3">
						<div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon">
								<i class="fa fa-user prefix mr-1"></i>
							</span>
						</div>
						<input class="form-control border border-left-0" aria-label="First Name" type="text"
							id="first_name" name="first_name" v-model="userById.first_name" label="First Name" placeholder="First Name" required>
						<div class="invalid-tooltip">Please enter a first name.</div>
					</div>
						<div class="input-group mt-3">
						<div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon">
								<i class="fa fa-user prefix mr-1"></i>
							</span>
						</div>
						<input class="form-control border border-left-0" aria-label="Last Name" type="text"
							id="last_name" name="last_name" v-model="userById.last_name" label="Last Name" placeholder="Last Name" required>
						<div class="invalid-tooltip">Please enter a valid email address.</div>
					</div>
					<div class="input-group mt-3">
						<div class="input-group-prepend">
							<span class="input-group-text" id="basic-addon">
								<i class="fa fa-envelope prefix"></i>
							</span>
						</div>
						<input class="form-control border border-left-0" aria-label="Email Address" type="email"
							 id="email" name="email" v-model="userById.email" label="Email Address" placeholder="Email Address" required>
						<div class="invalid-tooltip">Please enter a valid email address.</div>
					</div>
						<div class="form-group mt-3">
							<select class="browser-default custom-select" id="roles" name="roles" v-model="userById.roles" required>
								<option value="">Select Roles</option>
								<option value="1">Reviewer</option>
								<option value="2">Admin</option>
							</select>
							<div class="invalid-tooltip">Select at least one Role per userById.</div>
						</div>
						<div class="mt-3">
							<select class="browser-default custom-select" id="domains" v-model="userById.domains" required>
								<option value="">Select Domain</option>
								<option value="1">HHRA</option>
								<option value="2">Genotox</option>
							</select>
							<div class="invalid-tooltip">Select at least one Domain per userById.</div>
						</div>
						<div class="mt-3">
							<select class="browser-default custom-select" id="sources"  v-model="userById.sources" required>
								<option value="" >Select Source</option>
								<option value="1">Source 1</option>
								<option value="2">Source 2</option>
							</select>
							<div class="invalid-tooltip">Select at least one Source per userById.</div>
						</div>
						<div class="mt-3">
							<select class="browser-default custom-select" id="expertise"  v-model="userById.expertise" required>
								<option value="">Select Expertise</option>
								<option value="1">Expertise 1</option>
								<option value="2">Expertise 2</option>
							</select>
							<div class="invalid-tooltip">Select at least one Expertise per userById.</div>
						</div>
						<!-- Default unchecked -->
						<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="is_active" name="is_active" value="true" v-model="userById.is_active">
								<label class="custom-control-label" for="is_active">Check to make user active</label>
						</div>
					</modal-body>
					<modal-footer>
						<btn color="warning" @click.native="close">Close</btn>
						<btn color="green">{{userId == 0 ? 'Add New' : 'Edit'}} User </btn>
					</modal-footer>
					 </form>
				</modal>
			</column>
		</row>
	</container>
</template>

<script>
import {eventBus} from '../../main.js'
import {
	mapActions, mapGetters, mapState,
} from 'vuex'
import {
	Container, Row, Btn, Fa, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Column,
	mdbContainer,
} from 'mdbvue'

export default {
	name: 'ModalUserForm',
	components: {
		Container,
		mdbContainer,
		Row,
		Card,
		CardBody,
		Column,
		Btn,
		Fa,
		Modal,
		ModalHeader,
		ModalBody,
		ModalFooter,
	},
	props: ['userId', 'gridRef'],
	data() {
		return {
			userById: {
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
			},
			showModal: false,
		}
	},
	watch: {
		...mapState(['userById']),
	},
	methods: {
		...mapActions(['fetchUser', 'addUser']),
		 close() {
			 eventBus.$emit('toggleUserModal', 0)
		 },
		 addUser() {
			// console.log(event)
			// console.log(this.user)
			// console.log(this.gridRef)
			event.target.classList.add('was-validated')
			const newItem = this.user
		// this.gridRef.api.addItems([newItem])
		},
		stopRKey() {
			if (event.keyCode === 13) {
				event.stopPropagation()
				event.stopImmediatePropagation()
				event.preventDefault()
				return false
			}
		},
	 },
	 created() {
		this.fetchUser(this.userId)
		this.userById = this.$store.state.users.userById
	},
}
</script>

<style scoped>
.invalid-tooltip {
	position:relative;
}
</style>