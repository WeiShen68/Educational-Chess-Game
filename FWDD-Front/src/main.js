/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import commonMixins from '@/mixins/common.js';
import warning from '@/components/vtoast/warning.vue';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueTablerIcons from 'vue-tabler-icons';
import { createNotivue } from 'notivue';
import 'notivue/notifications.css'
import 'notivue/animations.css'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
const notivue = createNotivue({
    position: 'top',
    limit: 4,
    enqueue: true,
    notifications: {
        global: {
            duration: 1000000
        }
    }
})
const app = createApp(App)

registerPlugins(app)
app.mixin(commonMixins);
app.component('warning', warning)
app.use(PerfectScrollbar);
app.use(VueTablerIcons);
app.use(notivue);
app.mount('#app')
