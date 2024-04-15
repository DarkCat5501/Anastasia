<template>
  <aside ref="selfEl" class="an-left-sidemenu" @dblclick="handleMinimize">
    <!-- <template v-for="(comp,index) of components" :key="index"> -->
    <!-- </template> -->
  </aside>
</template>

<script setup lang="ts">
import { onMounted, ref, unref } from 'vue';
import { injectProps } from '../composables/component';

const selfEl = ref<HTMLDivElement>();
const size = ref(3);
const minimized = ref(true);

//Handles the minimization of the sizebar
function handleMinimize() {
  size.value = unref(minimized)?30:3;
  minimized.value=!unref(minimized);
  handleResize();
}

//resizes the sidebar
function handleResize(){
  const parent = unref(selfEl).parentElement;
  parent.style.setProperty("--leftmenu-size",`${unref(size)}ch`);
}

const { components } = injectProps({components:[]},"leftsidemenu");

onMounted(()=>{
  handleResize();
})
</script>
