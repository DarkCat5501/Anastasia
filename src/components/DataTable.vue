<template>
	<fieldset class="table-win">
		<legend>Test table</legend>
		<div class="table-grid" :style="{'--rows':rows,'--cols':cols}" title="Test table">
			
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
import { ref } from 'vue';


const rows = ref(30);
const cols = ref(10);

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
	width: fit-content;
	height: fit-content;
	border:1px solid var(--th-cl2);
	padding:5px;
	overflow: hidden;
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
	min-width: 10rem;
	min-height: 4ch;
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
