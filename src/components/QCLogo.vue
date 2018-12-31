<template functional>
<div class="logo" :style="{fontSize: props.size, color: props.color}">
	<svg enable-background="new 0 0 128 128" version="1.1" viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="1.2em" width="1.2em">
		<g class="data" transform="translate(-10,0)" :style="{stroke: props.color}">
			<g class="outline">
				<ellipse cx="64" cy="44" rx="44" ry="12"/>
				<line x1="108" x2="108" y1="44" y2="104"/>
				<line x1="20" x2="20" y1="44" y2="104"/>
				<path d="M20,103 C20,125 108,125 108,103"/>
			</g>
			<g class="dots" :style="{fill: props.color}">
				<circle cx="96" cy="64" r="4"/>
				<circle cx="96" cy="84" r="4"/>
				<circle cx="96" cy="104" r="4"/>
			</g>
			<path d="M20,64 C20,81 108,81 108,64"/>
			<path d="M20,84 C20,101 108,101 108,84"/>
		</g>
		<g class="check" transform="translate(0,-10)" :style="{stroke: props.color}">
			<path d="M52,84 Q60,90 72,100 Q92,80 124,60"/>
		</g>
	</svg>
	<slot></slot>
</div>
</template>

<style scoped lang="scss">
.logo {
	display: flex;
	.data {
		stroke: black;
		stroke-width: 5;
		fill: transparent;
		.outline {
			stroke-width: 8;
		}
		.dots {
			fill: #333;
			stroke: none;
		}
	}

	.check {
		fill: none;
		stroke: darkgreen;
		stroke-width: 13;
	}
}
</style>
