<template>
	<fieldset ref="thisElement" class="an-menu bordered margin-y-sm">
		<legend ref="legendEl" @click="handleMinimize">
			<span v-show="minimized" class="material-symbols-outlined">expand_more</span>
			<span v-show="!minimized" class="material-symbols-outlined">expand_less</span>
			{{title}} {{items?.length!=0?"":"(-)"}}
		</legend>
		<ul v-show="!minimized">
			<li v-for="item,index of items" :key="index">
				<button>{{item.name}}</button>
			</li>
		</ul>
	</fieldset>
</template>

<script setup lang="ts">
import {computed, ref, unref} from "vue";

const legendEl =ref<HTMLDivElement>();
const props = withDefaults(defineProps<{
	id?: string;
	name?: string,
}>(),{
	id: "no-id",
	name: "tools",
});
const minimized = ref(false);
const title = computed(()=>props.name)

const items = ref([
	{ action:"ADD",type:"BUTTON",name:"+ adicionar"},
	{ action:"REMOVE", type:"BUTTOn",name:"- remover"},
	{ action:"REMOVE", type:"BUTTOn",name:""},
	{ action:"REMOVE", type:"BUTTOn",name:"remover"},
	{ action:"REMOVE", type:"BUTTOn",name:"remover"},
	{ action:"REMOVE", type:"BUTTOn",name:"remover"},
	{ action:"REMOVE", type:"BUTTOn",name:"remover"}
]);

function handleMinimize(){
	//minimize list
	minimized.value = !unref(minimized);
}

</script>

<style>

.menu-list {
	--border-color: white;
	border: 0.1rem solid var(--border-color,white);
	border-radius: 10px;
}

.menu-list legend {
	border: 0.1rem solid var(--border-color,white);
	border-radius: 10px;
	padding-inline: 10px;
}

.menu-list ul {
	display: flex;
	flex-direction: column;
	gap: 5px;
	text-decoration: none;
	list-style: none;
	margin: 0;
	padding: 0;
}

.menu-list li {
	display: flex;
	align-items: center;
	justify-items: center;
	margin: 0; padding: 0;
}

.menu-list button {
	width: 100%;
	text-align: start;
	border: none;
	padding: 10px;
}


</style>
