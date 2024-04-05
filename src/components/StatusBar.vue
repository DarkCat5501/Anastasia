<template>
	<footer class="an-statusbar">
		<button>Test button</button>
	</footer>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue';
import { injectProps } from '../composables/component';

const props = injectProps({},"statusbar");

</script>
