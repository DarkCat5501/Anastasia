<template>
	<main v-setup ref="viewport" class="an-viewport">
	</main>
</template>
<script setup>
const vSetup = {
	created: (el) => {
		const iframe = document.createElement("iframe");
		iframe.frameBorder = "0";
		iframe.width="50%";
		iframe.height="100%";
		iframe.classList.add("an-frame");
		iframe.src = "about:blank";
		iframe.allowFullscreen = true;
		iframe.onload = () => {
			console.log(iframe)
			const text = document.createElement("h1");
			text.innerText ="This page is being worked on"
			iframe.contentDocument.body.appendChild(text);
		}
		el.iframe = el.appendChild(iframe);
	},
	beforeMount: (el) => {},
	mounted: (el) => {},
	beforeUpdate: (el) => {},
	updated: (el) => {},
	beforeUnmount:(el)=>{},
	unmounted:(el) => {}
}
</script>

<style>
.an-viewport {
	display: flex;
	justify-content: center;
}

.an-frame {
	background-color: none;
	border:none;
	user-select: none;
	user-zoom: fixed;
}
</style>
