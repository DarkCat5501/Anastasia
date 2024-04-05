import { createApp, provide } from 'vue'
import './style.css'
import App from './App.vue'

import { provideProps } from "./composables/component";

const app = createApp(App);
app.mount('#app')

