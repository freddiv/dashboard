<template>
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
</template>

<script>
import {eventBus} from '../../main.js'
import {AgGridVue} from 'ag-grid-vue'
import {mapActions, mapGetters} from 'vuex'
import RenderIsActive from '../../cell_renderers/RenderIsActive'
import EditUserLink from '../../cell_renderers/EditUserLink'

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
	name: 'UserGrid',
	data() {
		return {
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
			this.gridApi = params.api
			this.columnApi = params.columnApi
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
			if (params.colDef.field === 'id') {
				const eventData = {
					userId: params.value,
					selectedView: 'UserForm',
			 }
       // eventBus.$emit('toggleUserModal', params.value)
				eventBus.$emit('showUserForm', eventData)
			}
		},
		onRowSelected(event) {
			const selectedNodes = this.gridApi.getSelectedNodes()
		},
	},
	created() {
		this.fetchUserGrid()
		eventBus.$on('toggleUserModal', (userId) => {
			this.userId = userId
			if (this.showModal === true) {
				this.showModal = false
			} else {
				this.showModal = true
			}
		 })
		 eventBus.$on('userFilter', (str) => {
			 this.onQuickFilterChanged(str)
		 })
	//	this.fetchUsers()
	},
}

</script>

<style scoped>
</style>