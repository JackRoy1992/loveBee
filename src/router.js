import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/home.vue";
import Shop from "./views/shop/shop.vue";
import Cart from "./views/cart/cart.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/shop",
          component: Shop
        },
        {
          path: "/cart",
          component: Cart
        }
        // {
        //   path: '/cart',
        //   component: Cart
        // }
      ]
    }
  ]
});
