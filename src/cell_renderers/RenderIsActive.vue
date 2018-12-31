<template>
	<div class="isActiveUser">
	  <strong><span> {{displayValue}} </span></strong>
	</div>
</template>

<script>
export default {
	name: 'RenderIsActive',
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