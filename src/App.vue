<template>
  <header class="an-header">
    <ToolBar/>
  </header>
  <main class="center-area">
    <LeftSideMenu/>
    <Viewport/>
    <RightSideMenu/>
  </main>
  <StatusBar/>
</template>

<script setup lang="ts">
import StatusBar from "./components/StatusBar.vue";
import ToolBar from "./components/ToolBar.vue";
import LeftSideMenu from "./components/LeftSideMenu.vue";
import RightSideMenu from "./components/RightSideMenu.vue";
import Viewport from "./components/Viewport.vue";
import { provideProp } from "./composables/component";
import { onMounted } from "vue";


provideProp("components",["test"],"leftsidemenu");

onMounted(()=>{

});

</script>

<style scoped>
.center-area {
  overflow: hidden;
  display: grid;
  grid-template:"leftmenu viewport rightmenu";
  height:100%;
  grid-template-columns: var(--leftmenu-size, 3ch) auto var(--rightmenu-size, 30ch);
}
</style>
