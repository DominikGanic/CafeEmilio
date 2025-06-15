import {
  createRouter as createClientRouter,
  createWebHistory,
} from "vue-router";

import GeneratedRoutes from "virtual:generated-pages";

const Router = createClientRouter({
  history: createWebHistory(),
  routes: GeneratedRoutes,
});

// Router AfterEach
Router.afterEach(async () => {
  /*window.scrollTo({
      top: 0,
      behavior: "smooth",
    });*/
});

export default Router;
