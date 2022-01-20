<template>
  <div class="home">
    <div class="tables_area">
      <table key="table-1">
        <thead>
          <tr>
            <td>
              <div class="search_block">
                <span>Current</span
                ><input v-model="searchStr" type="text" placeholder="search" />
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            class="table_row"
            v-for="todo in currentTodos"
            :key="todo.id + 666"
          >
            <th>
              <button v-on:click="moveToCompleted(todo)">+</button>
              {{ todo.title }}
            </th>
          </tr>
        </tbody>
      </table>
      <table key="table-2">
        <thead>
          <tr>
            <td>Completed</td>
          </tr>
        </thead>
        <tbody>
          <tr
            class="table_row"
            v-for="todo in completedTodos"
            :key="todo.id + 999"
          >
            <th>
              <button v-on:click="moveToCurrent(todo)">-</button>
              {{ todo.title }}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import {
  HISTORY_ACTIONS,
  HistoryAction,
  HistoryEvent,
  TodoItem,
} from "@/store/todos/interfaces";
import {
  MOVE_TO_COMPLETED,
  MOVE_TO_CURRENT,
  SET_HISTORY_EVENT,
} from "@/store/todos/mutations-types";

// interface TProps {
//
// }

interface IData {
  searchStr: string;
  subscribeOnHistoryEvent: () => void;
}

interface IComputed {
  todos: Array<TodoItem>;
  completedTodos: Array<TodoItem>;
  currentTodos: Array<TodoItem>;
}

interface IMethods {
  fetchTodos: () => void;
  matchCount: (s: string) => number;
  moveToCompleted: (t: TodoItem) => void;
  moveToCurrent: (t: TodoItem) => void;
  makeEvent: (t: TodoItem, a: HistoryAction) => HistoryEvent;
  setHistoryEvent: (h: HistoryEvent) => void;
}

export default Vue.extend<IData, IMethods, IComputed>({
  name: "Home",
  mounted(): void {
    this.subscribeOnHistoryEvent = this.$store.subscribe(
      ({ type, payload }) => {
        switch (type) {
          case `todos/${MOVE_TO_COMPLETED}`:
            this.setHistoryEvent(
              this.makeEvent(payload, HISTORY_ACTIONS.MOVE_TO_COMPLETED)
            );
            break;
          case `todos/${MOVE_TO_CURRENT}`:
            this.setHistoryEvent(
              this.makeEvent(payload, HISTORY_ACTIONS.MOVE_TO_CURRENT)
            );
            break;
          default:
            break;
        }
      }
    );
  },
  beforeDestroy() {
    this.subscribeOnHistoryEvent();
  },
  data() {
    return {
      searchStr: "",
      subscribeOnHistoryEvent: () => undefined,
    };
  },
  computed: {
    ...mapGetters("todos", {
      todos: "getTodos",
      completedTodos: "getCompletedTodos",
    }),
    currentTodos() {
      if (this.searchStr) {
        return this.todos
          .filter((item: TodoItem) =>
            this.searchStr
              .toLowerCase()
              .split(" ")
              .every((v: string) => item.title.toLowerCase().includes(v))
          )
          .sort((a, b) => this.matchCount(b.title) - this.matchCount(a.title));
      } else {
        return this.todos;
      }
    },
  },
  components: {},

  methods: {
    ...mapActions("todos", ["fetchTodos"]),
    ...mapMutations("todos", {
      moveToCompleted: MOVE_TO_COMPLETED,
      moveToCurrent: MOVE_TO_CURRENT,
      setHistoryEvent: SET_HISTORY_EVENT,
    }),
    matchCount(str: string) {
      const m = str.match(new RegExp(this.searchStr, "gi"));
      return m != null ? m.length : 0;
    },
    makeEvent(item: TodoItem, action: HistoryAction): HistoryEvent {
      return {
        action,
        name: item.title,
        id: item.id,
        date: new Date(),
      };
    },
  },
});
</script>

<style scoped lang="scss">
.search_block {
  display: flex;
  align-items: center;
}

.search_block > input {
  width: 100%;
  margin-left: 12px;
}

.tables_area {
  column-gap: 34px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

thead > tr {
  text-align: left;
}

table {
  vertical-align: top;
  width: 50%;
  display: inline-block;
}

table > tr > th {
  text-align: left;
}

.table_row {
  vertical-align: top;
  text-align: left;
}

.table_row > th {
  font-weight: normal;
  font-size: 12px;
  padding: 8px 2px;
  border-bottom: 1px solid dimgrey;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
