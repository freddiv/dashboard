<template>
 <fa icon="edit" size="2x" class="green-text"/>
</template>

<script>
import {Fa} from 'mdbvue'
export default {
	name: 'EditUserLink',
	components: {Fa},
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

<style lang="scss" scoped>

</style>