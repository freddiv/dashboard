<template>
<div id="app" class="flyout">
	<QCHeader/>
	<main :style="{marginTop: '53px', minHeight: '750px'}">
		<transition enter-active-class="animated fadeInTop" leave-active-class="animated fadeOutBottom">
			<router-view/>
		</transition>
	</main>
	<QCFooter/>
</div>
</template>

<script>
import QCHeader from '@/components/QCHeader.vue'
import QCFooter from '@/components/QCFooter.vue'

export default {
	name: 'QCTools',
	components: {QCHeader, QCFooter},
}
</script>

<style lang="scss">
@import "./styles/config-variables.scss";
@import "./styles/imported-variables.scss";
@import "./styles/_custom-variables.scss";

.flyout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}
.active {
  background-color: rgba(255, 255, 255, 0.1);
}
.page {
	position: fixed;
	width: inherit;
}
</style>
