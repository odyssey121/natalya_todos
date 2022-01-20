<template>
  <div class="home">
    <div class="tables_area">
      <todo-table
        v-for="(d, i) in tablesData"
        :table-title="d.tableTitle"
        :table-items="d.tableItems"
        :key="i"
      >
        <template #search-action v-if="d.tableTitle === 'Current'">
          <input
            v-model="searchStr"
            type="text"
            placeholder="search"
            id="search-input"
          />
        </template>
        <template #button-action="{ item }">
          <button @click="d.actionCallback(item)">{{ d.btnTxt }}</button>
        </template>
      </todo-table>
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
import TodoTable from "@/components/TodoTable.vue";

interface IData {
  searchStr: string;
  subscribeOnHistoryEvent: () => void;
}

interface TablesData {
  tableTitle: string;
  tableItems: Array<TodoItem>;
  actionCallback: (d: TodoItem) => void;
  btnTxt: string;
}

interface IComputed {
  todos: Array<TodoItem>;
  completedTodos: Array<TodoItem>;
  currentTodos: Array<TodoItem>;
  tablesData: TablesData[];
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
      slotName: "button-action",
      subscribeOnHistoryEvent: () => undefined,
    };
  },
  computed: {
    ...mapGetters("todos", {
      todos: "getTodos",
      completedTodos: "getCompletedTodos",
    }),
    tablesData() {
      return [
        {
          tableTitle: "Current",
          tableItems: this.currentTodos,
          actionCallback: this.moveToCompleted,
          btnTxt: "+",
        },
        {
          tableTitle: "Completed",
          tableItems: this.completedTodos,
          actionCallback: this.moveToCurrent,
          btnTxt: "-",
        },
      ];
    },
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
  components: { TodoTable },

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
.tables_area {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.search_block {
  display: flex;
  align-items: center;
}

#search-input {
  margin-left: 12px;
}
</style>
