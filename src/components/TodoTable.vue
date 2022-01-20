<template>
  <table>
    <thead>
      <tr>
        <td>
          {{ tableTitle }}
          <slot name="search-action" />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr class="table_row" v-for="item in tableItems" :key="item.id">
        <th>
          <slot name="button-action" v-bind:item="item" />
          {{ item.title }}
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import type { PropType } from "vue";
import { TodoItem } from "@/store/todos/interfaces";

export default Vue.extend({
  name: "TodoTable",
  props: {
    tableTitle: {
      type: String,
      required: true,
    },
    tableItems: {
      type: Array as PropType<Array<TodoItem>>,
      default: () => [],
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
</style>
