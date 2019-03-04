<template>
	<div class="listContainer">
	  <mdb-badge class="domains" v-for="item in arrayList" color="success-color">{{ item }}</mdb-badge>
	</div>
</template>

<script>
import { mdbBadge, mdbChip } from 'mdbvue'
export default {
	name: 'RenderObjArray',
	components: { mdbBadge, mdbChip},
	 computed: {
	  arrayList() {
		  console.log(this.params)
		  const data = this.params.value
		  let displayVal = []
		  if (data) {
			  displayVal = data
		  }
		  return displayVal
		  },
	},
}
</script>

<style lang="scss" scoped>
.domains {
    margin: 2px;
    display:block;
}
.listContainer {
    margin: 0 5 0 5;
    display:block;
    height: 30px !important;
    overflow-y: scrooll;
}
</style>