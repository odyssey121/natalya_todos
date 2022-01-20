<template>
  <div class="history">
    <history-table :table-items="historyList" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import {
  HISTORY_ACTIONS,
  HistoryAction,
  HistoryEvent,
} from "@/store/todos/interfaces";
import HistoryTable from "@/components/HistoryTable.vue";

interface IData {
  historyList: HistoryEvent[];
}

interface IComputed {
  getHistory: HistoryEvent[];
}

interface IMethods {
  dateFormat?: (d: Date) => string;
}

export default Vue.extend<IData, IMethods, IComputed>({
  name: "History",
  components: { HistoryTable },
  data() {
    return {
      historyList: [],
    };
  },
  computed: {
    ...mapGetters("todos", ["getHistory"]),
  },
  methods: {},
  watch: {
    "$route.query.sub": {
      handler: function (sub) {
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
      immediate: true,
    },
  },
});
</script>

<style scoped lang="scss"></style>
