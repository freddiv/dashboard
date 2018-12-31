<template>
<row class="d-flex flex-row justify-content-center">
	<div class="card">
		<div class="card-body d-flex flex-column">
			<!-- Title -->
			<h2 class="card-title">
				<strong class="blue-text">Welcome to Datacheck</strong>
			</h2>
			<!-- Text -->
			<p class="card-text text-left">
				National Center for Computational Toxicology DataCheck – Enabling Quality Data.
			</p>
		</div>
	</div>
	<div class="card">
		<!-- Card content -->
		<div class="card-body">
			<!-- Title -->
			<h4 class="card-title">
			</h4>
			<!-- Text -->
			<p class="card-text">
				Maybe there's a bunch of tables here or something. You know, the stuff an Admin would want.
			</p>
		</div>
	</div>
</row>
</template>

<script>
import {Row} from 'mdbvue'

export default {
	name: 'AdminDashboard',
	components: {Row},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
	font-weight: normal;
}
.card {
	width: 34rem;
}

.home-feature-box {
	padding: 40px 0;
}

.home-feature-box i {
	font-size: 6rem;
}

.home-feature-box span {
	display: block;
	color: black;
	font-size: 20px;
	font-weight: bold;
	padding-top: 20px;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
}

a {
	color: #42b983;
}
</style>
