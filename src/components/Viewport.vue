<template>
	<div class="an-viewport">
		<div class="overlay-menu">
			<button @click="toggleLock">
				<span v-if="locked" class="material-symbols-outlined">lock</span>
				<span v-else class="material-symbols-outlined">lock_open</span>
			</button>
			<button @click="togglePan">
				<span class="material-symbols-outlined" :class="{'active':pan_active}">pan_tool</span>
			</button>
		</div>
		<main v-setup ref="viewport" class="an-panport">
			<NodeLink/>
			<NodeLink/>

			<DataTable @vnode-updated="handleColision"/>
			<DataTable/>

		</main>
	</div>
</template>
<script setup lang="ts">

import { ref } from "vue";
import {MainViewport} from "../composables/viewport";
import DataTable from "./DataTable.vue";
import NodeLink from "./NodeLink.vue";

function handleColision(){
	console.log(arguments);
}

const vSetup = {
	created: (root:HTMLElement) => {
		// console.log("click");
		// MainViewport.attach(el);
	},
	// beforeMount: (el) => {},
	// mounted: (el) => {},
	// beforeUpdate: (el) => {},
	updated: (root:HTMLElement) => {
		console.log("updated");
	},
	// beforeUnmount:(el)=>{},
	// unmounted:(el) => {}
}

const locked = ref(MainViewport.locked);
const pan_active = ref(true);

function toggleLock() {
	MainViewport.toggleLock();
	locked.value = MainViewport.locked
}

function togglePan(){
	pan_active.value = !pan_active.value;
}

</script>

<style scoped>
.an-viewport {
	display: flex;
	justify-content: center;
	position: relative;
	height: 100%; width:100%;
	overflow:hidden;
	/* user-zoom: fixed; */
	background: var(--th-bg);
}
.an-panport{
	position:relative;
	overflow: visible;
	transform: translate(var(--pos-x,0px),var(--pos-y,0px));
	width:100%;
	height:100%;
	padding:3rem;
}
button {
	padding:5px;
}


.overlay-menu {
	position:absolute;
	z-index:1;
	right:5px; top:5px;
	padding: 0;
	margin:0;
	border-radius: 10px;
  background: color-mix(in srgb, var(--th-cl0-l) 60%, transparent);
	overflow:hidden;
	transition: background ease-in-out 300ms;
	display:flex;
}

.overlay-menu:hover {	
  background: color-mix(in srgb, var(--th-cl0-l) 85%, transparent);
}

.active {
	color: var(--th-txt-active);
}
</style>
