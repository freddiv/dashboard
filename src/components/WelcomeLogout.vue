<template>
<div>
	<span class="white-text">{{ getUser.firstName }} {{ getUser.lastName}}</span>
	<mdb-btn icon="user" iconClass="pr-2" iconLeft @click.native="logout">
		<span class="white-text font-weight-bold">Logout</span>
	</mdb-btn>
</div>
</template>

<script>
import {mdbBtn} from 'mdbvue'
import {mapActions, mapGetters} from 'vuex'

export default {
	name: 'WelcomeLogout',
	components: {mdbBtn},
	computed: mapGetters(['getUser']),
	methods: mapActions(['logout']),
}
</script>

