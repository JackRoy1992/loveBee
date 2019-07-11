import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./views/store";
import axios from "axios";
import "./views/tools";
import VueLazyload from "vue-lazyload";

//引入css
import "./assets/css/base.css";
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require("./assets/images/product_default.png"),
  loading: require("./assets/images/product_default.png"),
  attempt: 1
});

router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    router.push("/shop");
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
