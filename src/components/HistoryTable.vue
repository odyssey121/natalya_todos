<template>
  <table class="table-history">
    <thead>
      <tr>
        <td>id</td>
        <td>name</td>
        <td>action</td>
        <td>date</td>
      </tr>
    </thead>
    <tbody>
      <tr class="table_row" v-for="item in tableItems" :key="item.id">
        <th>{{ item.id }}</th>
        <th>{{ item.name }}</th>
        <th>{{ item.action }}</th>
        <th>{{ $helpers.getDateFull(item.date) }}</th>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import type { PropType } from "vue";
import { HistoryEvent } from "@/store/todos/interfaces";

export default Vue.extend({
  name: "HistoryTable",
  props: {
    tableItems: {
      type: Array as PropType<Array<HistoryEvent>>,
      default: () => [],
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table-history {
  width: 100%;
}
</style>
