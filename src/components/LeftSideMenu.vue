<template>
  <aside ref="selfEl" class="an-left-sidemenu" @dblclick="handleMinimize">
  </aside>
</template>

<script setup lang="ts">
import { onMounted, ref, unref } from 'vue';

const selfEl = ref<HTMLDivElement>();
const size = ref(3);
const minimized = ref(true);

function handleMinimize(event) {
  if(unref(minimized)){
    size.value = 30;
  } else {
    size.value = 3;
  }
  minimized.value=!unref(minimized);
  handleResize();
}

function handleResize(){
  const parent = unref(selfEl).parentElement;
  const rect = unref(selfEl).getBoundingClientRect();
  console.log(rect)
  parent.style.setProperty("--leftmenu-size",`${unref(size)}ch`);
}

onMounted(()=>{
  handleResize();
})
</script>
