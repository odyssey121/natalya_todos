import Vue from "vue";
import Vuex from "vuex";
import syncStateStorage from "vuex-state-storage-sync";

// NameSpace Patterns
import state from "./states";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

// Modules Patterns
import todos from "./todos";

Vue.use(Vuex);

// eslint-disable-next-line
const debug: any = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    todos,
  },
  strict: debug,
  plugins: [
    syncStateStorage({
      storage: window.sessionStorage,
      key: "count",
      paths: ["count"],
    }),
    syncStateStorage({
      storage: window.sessionStorage,
      key: "users",
      paths: ["users.isLogin", "users.userInfo"],
    }),
  ],
});
