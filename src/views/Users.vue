<template>
	<div class="container container-fluid">
		<div><h3 class="h3-responsive blue-text mt-4">User Management</h3></div>
		<!--Grid row-->
		<div class="row justify-content-center">
			<div id="ag-grid-demo">
				<user-tool-bar
				v-on:onQuickFilterChange="onQuickFilterChanged"
				:gridRef="gridRef"></user-tool-bar>
					<keep-alive>
						<transition name='slide' mode="out-in" reaveal>
							<component :is="selectedView" :userId="userId"></component>	
						</transition>
					</keep-alive>			
				<modal-user-form
				:gridRef="gridRef"
				:userId="userId"
				v-on:addNewUser="addUser"
				v-if="showModal"></modal-user-form>
			</div>
		</div>
	</div>
</template>

<script>
import {eventBus} from '../main.js'
import {mapActions, mapGetters} from 'vuex'
import UserToolBar from '../components/users/ToolBar'
import ModalUserForm from '../components/users/ModalUserForm'
import UserForm from '../components/users/UserForm'
import UserGrid from '../components/users/UserGrid'
export default {
	name: 'Users',
	data() {
		return {
			showModal: false,
			userId: 0,
			selectedView: 'UserGrid',
		}
	},
	components: {
		UserToolBar,
		ModalUserForm,
		UserGrid,
		UserForm,
	},
	computed: {
		...mapGetters(['allUsers', 'columnDefs']),
		gridRef() {
			return this.gridApi
		},
	},
	methods: {
		...mapActions(['fetchUserGrid', 'addUser', 'fetchUsers']),
		onQuickFilterChanged(fieldVal) {
			 console.log(fieldVal)
			console.log(this)
			// console.log(this.gridApi)
			this.gridApi.setQuickFilter(fieldVal)
		},
	},
	created() {
		 eventBus.$on('showUserForm', (data) => {
			 console.log(data)
				this.userId = data.userId
				this.selectedView = data.selectedView
		 })
	}
}
</script>

<style>
#ag-grid-demo {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	width: '900px';
}
	.fade-enter {
		opacity: 0;
	}
	.fade-enter-active {
		transition: opacity 2s;
	}
	.fade-leave {
	/* opacity: 1 */
	}
	.fade-leave-active {
		transition: opacity 2s;
		opacity: 0;
	}

	.slide-enter {
	 opacity: 0;
	}
	.slide-enter-active {
		animation: slide-in 2s ease-out forwards;
		transition: opacity 1.5s;
	}
	.slide-leave {
	/* opacity: 1 */
	}
	.slide-leave-active {
			animation: slide-out 2s ease-out forwards;
			opacity: 0;
			transition: opacity 2s;
			position: absolute;
	}
	@keyframes slide-in {
		from {
			transform: translateX(-600px);
		}
		to {
			transform: translateX(0px);
		}
	}
	@keyframes slide-out {
		from {
			transform: translateX(0px);
		}
		to {
			transform: translateX(600px);
		}
	}
</style>