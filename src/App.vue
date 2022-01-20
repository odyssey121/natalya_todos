<template>
  <div id="app">
    <div id="nav">
      <router-link to="/history?sub=completed">история добавлений</router-link>
      <router-link to="/history">история</router-link>
      <router-link to="/history?sub=deleted">история удалений</router-link>
      <router-link v-show="this.$route.name === 'History'" to="/"
        >Главная
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "App",
  mounted() {
    this.fetchTodos();
  },
  methods: {
    ...mapActions("todos", ["fetchTodos"]),
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  width: 90%;
  display: flex;
  justify-content: space-evenly;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
