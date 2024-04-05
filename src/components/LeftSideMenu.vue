<template>
  <aside ref="selfEl" class="an-left-sidemenu" @dblclick="handleMinimize">
  </aside>
</template>

<script setup lang="ts">
import { onMounted, ref, unref } from 'vue';

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

onMounted(()=>{
  handleResize();
})
</script>
