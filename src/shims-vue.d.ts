import store from "@/store";

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "vuex/dist/logger" {
  import Vuex from "vuex";
  export default Vuex.prototype.$log;
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: store;
  }
}
