<template>
<i class="fa fa-edit green-text large"></i>
</template>

<script>
export default {
	name: 'EditUserLink',
	methods: {
		editUserForm() {
			const gridRef = this.$parent.$parent
			const gridApi = gridRef.gridApi
			const selectedNodes = gridApi.getSelectedNodes()
			console.log(selectedNodes)
			console.log(this.$parent.$parent)
		},
	},
}
</script>

<style scoped>
.large {
	font-size: 20px;
	text-align: center;
	vertical-align: middle;
}
</style>