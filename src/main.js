import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'; // Importa i CSS di Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Crea Vuetify
const vuetify = createVuetify({
    components,
    directives,
});
createApp(App).use(vuetify).mount('#app')
