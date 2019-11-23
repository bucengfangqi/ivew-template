import Vue from "vue";
import VueRouter from "vue-router";
import List from "../views/List.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/list",
    name: "list",
    component: List
  },
  {
    path: "/list/:id",
    name: "detail",
    component: () => import("../views/detail.vue")
  },
  {
    path: "/",
    redirect: "/list"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
