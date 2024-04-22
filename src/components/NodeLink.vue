<template>
	<div class="path">
		<svg class="curve" ref="element" fill="none" width="1">
			<path :d="shape"/>
		</svg>

		<div class="dot" draggable="true" :style="{'--left':`${positions[0].x}px`,'--top':`${positions[0].y}px`}" @dragstart="(e) => handleStart(e,0)" @dragend="(e)=>handleDrop(e,0)"></div>
		<div class="dot" draggable="true" :style="{'--left':`${positions[1].x}px`,'--top':`${positions[1].y}px`}" @dragstart="(e) => handleStart(e,1)" @dragend="(e)=>handleDrop(e,1)"></div>

		<!-- <div class="dot" draggable="true" @drop=handle></div> -->
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, unref } from 'vue';

const element = ref<HTMLOrSVGElement>();
const positions = ref([{x:0,y:0},{x:0,y:0}]);
const starts = ref([{x:0,y:0},{x:0,y:0}]);

function handleStart(e: DragEvent,index:number) {
	const sts = unref(starts);
	sts[index] = {x:e.screenX,y:e.screenY};
	starts.value = sts;
}

function handleDrop(e: DragEvent,index:number) {
	const pos = unref(positions);

	const p = pos[index];

	p.y += e.screenY - unref(starts)[index].y;
	p.x += e.screenX - unref(starts)[index].x;

	positions.value = pos;
}

const shape = computed(() => {
	const p0 = unref(positions)[0];
	const p1 = unref(positions)[1];
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
	stroke: magenta;
	stroke-width: 3;
	stroke-opacity: 0.8;
	stroke-linecap: round;
}

.dot {
	z-index: 999;
	width:10px;
	height:10px;
	background:var(--color,magenta);
	top:var(--top,0);
	left:var(--left,0);
	position:absolute;
	transform: translate(-50%,-50%);
	border-radius:100px;
}
</style>
