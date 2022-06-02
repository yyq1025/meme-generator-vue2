import Vue from "vue";
import infiniteScroll from "vue-infinite-scroll";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(infiniteScroll);

new Vue({
  vuetify,
  router,
  render: (h) => h(App)
}).$mount("#app");
