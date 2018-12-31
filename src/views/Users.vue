<template>
	<div class="container container-fluid">
		<div><h3 class="h3-responsive blue-text mt-4">User Management</h3></div>
		<!--Grid row-->
		<div class="row justify-content-center">

			<div id="ag-grid-demo">
				<user-tool-bar
				v-on:closeUserModal="toggleUserModal"
				v-on:toggleUserModalNew="toggleUserModalNew"
				v-on:onQuickFilterChange="onQuickFilterChanged"
				:gridRef="gridRef"></user-tool-bar>
				<user-form
				:gridRef="gridRef"
				:userId="userId"
				v-on:close="toggleUserModal"
				v-on:addNewUser="addUser"
				v-if="showModal"></user-form>
				<ag-grid-vue ref="userGrid" v-bind:style="gridSize"
							class="ag-theme-balham"
							:defaultColDef="defaultColDef"
							:columnDefs="columnDefs"
							:rowData="allUsers"
							:cellClicked="onCellClicked"
							:enableSorting="true"
							:enableFilter="true"
							rowSelection="single"
							:gridReady="onGridReady"
							:rowSelected="onRowSelected">
				</ag-grid-vue>
			</div>
		</div>
	</div>
</template>

<script>
import {AgGridVue} from 'ag-grid-vue'
import {mapActions, mapGetters} from 'vuex'
import RenderIsActive from '../cell_renderers/RenderIsActive'
import EditUserLink from '../cell_renderers/EditUserLink'
import UserToolBar from '../components/users/ToolBar'
import UserForm from '../components/users/UserForm'

const GRID_KEY = 'user-grid-config'
const gridStore = {
	fetch() {
		var saveduserGridConfig = JSON.parse(localStorage.getItem(GRID_KEY)) || ''
		return saveduserGridConfig
	},
	save(userGridConfig) {
		localStorage.setItem(GRID_KEY, userGridConfig)
	},
}

export default {
	name: 'Users',
	data() {
		return {
			showModal: false,
			gridSize: {
				width: '900px',
				height: '500px',
			},
			defaultColDef: {
				width: 100,
				editable: true,
				filter: 'agTextColumnFilter',
			},
			userId: 0,
			gridApi: '',
			columnApi: '',
			userGridConfig: gridStore.fetch(GRID_KEY) || '',
		}
	},
	components: {
		AgGridVue,
		RenderIsActive,
		EditUserLink,
		UserToolBar,
		UserForm,
	},
	computed: {
		...mapGetters(['allUsers', 'columnDefs']),
		gridRef() {
			return this.gridApi
		},
	},
	watch: {
		userGridConfig: {
			handler(userGridConfig) {
				// console.log('saved userGridConfig watch')
				gridStore.save(userGridConfig)
			},
			deep: true,
		},
	},
	methods: {
		...mapActions(['fetchUserGrid', 'addUser', 'fetchUsers']),
		toggleUserModal() {
			// console.log('toggleUserModal')
			if (this.showModal === true) {
				this.showModal = false
			} else {
				this.showModal = true
			}
		 },
		 toggleUserModalNew() {
			 // console.log('toggleUserModal')
			 this.userId = 0
			if (this.showModal === true) {
				this.showModal = false
			} else {
				this.showModal = true
			}
		 },
		parseRow(item) {
			const selectedNodes = []
			if (item) {
				selectedNodes.push(item)
				const selectedData = selectedNodes.map(node => node.data)
				const mappedData = selectedData[0]
				const columnObj = this.gridRef.columnController.columnDefs.slice(0)
				const mapped = columnObj.map(function(column) {
					var field = column.field
					column.val = mappedData[field]
					return column
				})
				return mapped
			}
			return item
		},
		onGridReady(params) {
			this.gridComponent = this.$refs.userGrid
			// console.log(params)

			this.gridApi = params.api
			this.columnApi = params.columnApi
			// get a reference to the column
			// var col = this.columnApi.getColumn('is_active')
			// obtain the column definition from the column
			// var colDef = col.getColDef()
			// console.log(colDef)
		},
		getSelectedRows() {
			const selectedNodes = this.gridApi.getSelectedNodes()
			const selectedData = selectedNodes.map(node => node.data)
			const selectedDataStringPresentation = selectedData.map(node => node.id + ' ' + node.email).join(', ')
			alert(`Selected nodes: ${selectedDataStringPresentation}`)
		},
		onQuickFilterChanged(fieldVal) {
			// console.log(fieldVal)
			// console.log(this.gridApi)
			this.gridApi.setQuickFilter(fieldVal)
		},
		onCellClicked(params) {
			// console.log(params)
			if (params.colDef.field === 'id') {
				this.userId = params.value
				this.toggleUserModal()
			//	console.log(params.value)
			}
		},
		onRowSelected(event) {
			const selectedNodes = this.gridApi.getSelectedNodes()
		},
	},
	created() {
		//this.fetchUserGrid()
		this.fetchUsers()
	},
}

</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>