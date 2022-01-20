import Vue from "vue";
import Vuex from "vuex";

// NameSpace Patterns
// there above should be root state

// Modules Patterns
import todos from "./todos";

Vue.use(Vuex);

// eslint-disable-next-line
const debug: any = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    todos,
  },
  strict: debug,
  plugins: [],
});
