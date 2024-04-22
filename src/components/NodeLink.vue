<template>
	<div class="path">
		<svg class="curve" ref="element" fill="none" width="1">
			<path :d="shape"/>
		</svg>

		<div v-draggable0 class="dot" :style="{'--left':`${pos0.x}px`,'--top':`${pos0.y}px`}"></div>
		<div v-draggable1 class="dot" :style="{'--left':`${pos1.x}px`,'--top':`${pos1.y}px`}"></div>

		<!-- <div class="dot" draggable="true" @drop=handle></div> -->
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, unref } from 'vue';
import { useDraggable} from "../composables/draggable";

const element = ref<HTMLOrSVGElement>();
const pos0 = ref({x:100,y:Math.random()*100+100});
const pos1 = ref({x:Math.random()*400+200,y:Math.random()*500+100});

const vDraggable0=useDraggable(pos0);
const vDraggable1=useDraggable(pos1);


const shape = computed(() => {
	const p0 = unref(pos0);
	const p1 = unref(pos1);
	const pm = {x: (p0.x+p1.x)/2, y:(p0.y+p1.y)/2};
	const p2 = {x: (p0.x+p1.x)/2,y:p0.y};

	return `M${p0.x},${p0.y} Q${p2.x},${p2.y} ${pm.x},${pm.y} T${p1.x},${p1.y}`
})

onMounted(() => {
	console.log(unref(element));
})

</script>

<style scoped>
.path {
	position:absolute;
	top:0;
	left:0;
}
.curve {
	position:relative;
	width:100%;
	height:100%;
	overflow: visible;
	stroke: var(--th-cl2);
	stroke-width: 3;
	stroke-opacity: 0.8;
	stroke-linecap: round;
}

.dot {
	width:10px;
	height:10px;
	background:var(--th-cl2,magenta);
	top:var(--top,0);
	left:var(--left,0);
	position:absolute;
	transform: translate(-50%,-50%);
	border-radius:100px;
}
</style>
