<template>
	<mdb-navbar id="userToolbar" class="blue-grey lighten-4 mt-1" reverse>
		<mdb-btn size="sm" outline="default" icon="refresh" class="font-weight-bold" @click.native="resetGrid"> Reset Grid </mdb-btn>
		<mdb-btn size="sm" outline="default" icon="user-plus" class="font-weight-bold" @click.native="showUserForm"> Add User </mdb-btn>
		<navbar-nav right>
			<form class="form-inline">
				<input class="form-control mr-sm-2" type="text"  @keyup="onQuickFilterChange" id="quickFilterInput" placeholder="Type text to filter..." aria-label="Search">
			</form>
		</navbar-nav>
	</mdb-navbar>
</template>

<script>
import {eventBus} from '../../main.js'
import {
	mdbNavbar,
	NavbarItem,
	NavbarNav,
	mdbBtn,
} from 'mdbvue'

export default {
	name: 'UserToolBar',
	props: ['gridRef'],
	components: {
		mdbNavbar,
		NavbarItem,
		NavbarNav,
		mdbBtn,
	},
	data() {
		return {

		}
	},
	 methods: {
		toggleUserModal() {
			eventBus.$emit('toggleUserModal', 0)
		},
		showUserForm() {
			const eventData = {
				userId: 0,
				selectedView: 'UserForm',
			 }
			 console.log(eventData) 
       // eventBus.$emit('toggleUserModal', params.value)
        eventBus.$emit('showUserForm', eventData)
		 },
		 onQuickFilterChange(event) {
			 console.log(event.target.value)
			 this.$emit('onQuickFilterChange', event.target.value)
		 },
		 resetGrid() {
			this.gridRef.setFilterModel()
			this.gridRef.setSortModel()
		 },
	 },
}

</script>

<style scoped>
.btn.btn-sm {
		padding: 0.5rem .6rem;
		background-color: aliceblue;
}
.navbar {
	margin-top: 25px;
	margin-bottom: 25px;
	background-color:darkgrey;
}
#userToolbar {
width: 900px;
}
.btn-outline-default {
	background-color: aliceblue !important;
}
</style>