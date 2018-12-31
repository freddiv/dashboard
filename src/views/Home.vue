<template>
	<div class="container-fluid mt-5">
		<AdminDashboard v-if="isLoggedIn && isAdmin"/>
		<ReviewerDashboard v-else-if="isLoggedIn"/>
		<GuestHome v-else/>
	</div>
</template>

<script>
import AdminDashboard from '../components/AdminDashboard.vue'
import ReviewerDashboard from '../components/ReviewerDashboard.vue'
import GuestHome from '../components/GuestHome.vue'
import {mapGetters} from 'vuex'

export default {
	name: 'HomePage',
	components: {
		AdminDashboard,
		ReviewerDashboard,
		GuestHome,
	},
	computed: mapGetters(['isLoggedIn', 'isAdmin']),
}
</script>
