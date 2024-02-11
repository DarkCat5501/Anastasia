<template>
  <header class="an-header">
    <span>Anastasia</span>
    <ToolBar/>
  </header>
  <LeftSideMenu/>
  <Viewport/>
  <RightSideMenu/>
  <StatusBar/>
</template>

<script setup>
import StatusBar from "./components/StatusBar.vue";
import ToolBar from "./components/ToolBar.vue";
import LeftSideMenu from "./components/LeftSideMenu.vue";
import RightSideMenu from "./components/RightSideMenu.vue";
import Viewport from "./components/Viewport.vue";
</script>

<style>
body {
  display: grid;
  grid-template:
    "header header header"
    "leftmenu viewport rightmenu"
    "status status status";
  grid-template-rows: 2rem auto var(--status-size, 2rem);
  grid-template-columns: var(--leftmenu-size, 0ch) auto var(--rightmenu-size, 30ch);
}
</style>
