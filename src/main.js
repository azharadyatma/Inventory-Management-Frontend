import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";
import "./assets/styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createPiniaMiddleware } from "./plugins/piniaMiddleware";
import { createPersistedState } from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(createPiniaMiddleware());
pinia.use(createPersistedState);

createApp(App).use(pinia).use(router).mount("#app");
