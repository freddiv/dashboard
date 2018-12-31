<template>
<navbar-nav right>
	<router-link to="/users" v-if="isAdmin">
		<navbar-item class="default-color font-weight-bold">
			Users
		</navbar-item>
	</router-link>
	<router-link to="/allocations" v-if="isAdmin">
		<navbar-item class="default-color font-weight-bold">
			Allocations
		</navbar-item>
	</router-link>
	<dropdown tag="li" aria-label="Review" class="nav-item">
		<dropdown-toggle class="font-weight-bold" slot="toggle" tag="a" color="primary" waves-fixed navLink>
			Review
		</dropdown-toggle>
		<dropdown-menu>
			<dropdown-item aria-label="Pending">
				<router-link to="/records">Pending</router-link>
			</dropdown-item>
			<dropdown-item aria-label="Completed">
				<router-link to="/records">Completed</router-link>
			</dropdown-item>
		</dropdown-menu>
	</dropdown>
</navbar-nav>
</template>

<script>
import {
	NavbarItem,
	NavbarNav,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from 'mdbvue'
import {mapGetters} from 'vuex'

export default {
	name: 'NavLinks',
	components: {
		NavbarItem,
		NavbarNav,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
	},
	computed: mapGetters(['isAdmin']),
}
</script>
