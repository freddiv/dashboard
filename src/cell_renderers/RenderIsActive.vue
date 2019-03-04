<template>
	<div class="isActiveUser">
	  <mdb-badge color="primary-color">{{displayValue}}</mdb-badge>
	</div>
</template>

<script>
import { mdbBadge, mdbChip } from 'mdbvue'
export default {
	name: 'RenderIsActive',
	components: { mdbBadge, mdbChip},
	 computed: {
	  displayValue() {
		  const data = this.params.data
		  let displayVal = 'Deactivated'
		  if (data && data.is_active) {
			  displayVal = 'Active'
		  }
		  return displayVal
		  },
	},
}
</script>

<style lang="scss" scoped>
</style>