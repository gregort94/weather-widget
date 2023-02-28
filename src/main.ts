import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {createPinia} from 'pinia';
import './assets/styles/index.css'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(vuetify)
  .mount('weather-widget')

