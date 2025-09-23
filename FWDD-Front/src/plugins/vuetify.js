/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'

// Composables
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components,
  directives,

  theme: {
    themes: {
      light: {
        colors: {
          darkText: '#212121',
        },
      },
    },
  },
  defaults: {
    VBtn: {},
    VCard: {
      rounded: 'md'
    },
  }
})
