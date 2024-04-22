<template>
	<fieldset 
		class="table-win" 
		:style="{'--pos-x':`${positions[0].x}px`,'--pos-y':`${positions[0].y}px`}"
		>
		<legend @dblclick="handleShow" draggable="true" 
			@dragend="(e)=>handleDrop(e,0)"
			@dragstart="(e)=>handleStart(e,0)">
			Test table
		</legend>
		<div v-show="isVisible" class="table-grid" :style="{'--rows':rows,'--cols':cols}" title="Test table">
			
			<span class="col-label"></span>
			<template v-for="col of range(cols)">
				<span class="col-label">{{ col+1 }}</span>
			</template>

			<template v-for="row of range(rows)">
				<span class="row-label">{{ row+1 }}</span>
				<template v-for="col of range(cols)">
					<input type="number" :value="row*col"/>
				</template>
			</template>
		</div>
	</fieldset>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue';

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


const rows = ref(30);
const cols = ref(10);
const isVisible=ref(true);

function handleShow(){
	isVisible.value = !unref(isVisible);
}

function* range(n){
	for(let i=0;i<n;i++){
		yield i;
	}
}

function* table_range(n,m){
	for(let i=0;i<n;i++){
		for(let j=0;j<m;j++){
			yield [i,j];
		}
	}
}

</script>

<style scoped>

.table-win{
	position:absolute;
	top:var(--pos-y,10px);
	left:var(--pos-x,10px);
	width: fit-content;
	height: fit-content;
	border:1px solid var(--th-cl2);
	padding:0.36rem;
	padding-right: 0.76rem;
	border-radius: 5px;
	overflow: hidden;
	background: var(--th-cl0);
}

.table-win > legend {
	background: var(--th-cl1);
	border-radius:5px;
	padding-inline: 0.76rem;
	display: block;
}

.table-win > legend:hover {
	background:var(--th-cl2);
}

.table-grid {
	--rows: 0;
	--cols: 0;
	display: grid;
	grid-template-rows: 1rem repeat(var(--rows,0),1rem);
	grid-template-columns: 4ch repeat(var(--cols,0),8ch);
	margin:0;
	padding:0px;
	width:fit-content;
	height: fit-content;
	max-width: 35rem;
	max-height: 25rem;
	min-width: 12rem;
	min-height: 10ch;
	overflow: scroll;
	scrollbar-width: initial;
	scroll-snap-align: proximity;
	gap:1px;
	scroll-snap-type: both;
	scroll-snap-type: proximity;
	resize: both;
}

.table-grid span.row-label {
	position: sticky;
	left:0;
	background: var(--th-cl0-l);
	font-size: 80%;
	text-align: start;
	color: var(--th-cl2);
	margin:0;
	padding:0;
	padding-inline:0.5ch;
}

.table-grid span.col-label {
	z-index: 9999;
	position: sticky;
	top:0;
	background: var(--th-cl0-l);
	font-size: 80%;
	text-align: start;
	color: var(--th-cl1);
	margin:0;
	padding:0;
	padding-inline:0.5ch;
}

.table-grid > input[type="number"] {
	margin:1px;
	-webkit-appearance: textfield;
	-moz-appearance: textfield;
	appearance: textfield;
	border-radius:0;
	padding:0;
	border: 1px solid var(--th-cl0-l);
	background: inherit;
}

.table-grid > input[type="number"]:nth-child(2n+1) {
	background: var(--th-cl0);
}

.table-grid > input[type="number"]:focus {
	outline: none;
	border: 1px solid red;
	
}

</style>
