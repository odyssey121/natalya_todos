<template>
  <div class="history">
    <table class="table_history">
      <thead>
      <tr>
        <td>id</td>
        <td>name</td>
        <td>action</td>
        <td>date</td>
      </tr>
      </thead>
      <tbody>
      <tr class="table_row" v-for="item in historyList" :key="item.id">
        <th>{{ item.id }}</th>
        <th>{{ item.name }}</th>
        <th>{{ item.action }}</th>
        <th>{{ dateFormat(item.date) }}</th>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import moment from "moment";
import {
  HISTORY_ACTIONS,
  HistoryAction,
  HistoryEvent
} from "@/store/todos/interfaces";

interface IData {
  historyList: Array<HistoryEvent>;
}

interface IComputed {
  getHistory: HistoryEvent[];
}

interface IMethods {
  dateFormat: (d: Date) => string;
}

export default Vue.extend<IData, IMethods, IComputed>({
  name: "History",
  data() {
    return {
      historyList: []
    };
  },
  computed: {
    ...mapGetters("todos", ["getHistory"])
  },
  methods: {
    dateFormat(date: Date) {
      return moment(date).toISOString();
    }
  },
  watch: {
    "$route.query.sub": {
      handler: function(sub) {
        console.log("sub", sub);
        switch (sub?.toLowerCase()) {
          case "completed":
            this.historyList = this.getHistory.filter(
              (item: HistoryEvent) =>
                item.action.toString() === HISTORY_ACTIONS.MOVE_TO_COMPLETED
            );
            break;
          case "deleted":
            this.historyList = this.getHistory.filter(
              (item: HistoryEvent) =>
                item.action ===
                (HISTORY_ACTIONS.MOVE_TO_CURRENT as HistoryAction)
            );
            break;
          default:
            this.historyList = this.getHistory;
            break;
        }
      },
      deep: true,
      immediate: true
    }
  }
});
</script>

<style scoped lang="scss">
.table_history {
  width: 100%;
}
</style>
