import { HistoryEvent, TodoItem, TodosState } from "@/store/todos/interfaces";
import { Commit, Dispatch } from "vuex";
import Vue from "vue";
import { TODOS_URL_LIMIT_100 } from "@/constants/http";
import { AxiosError, AxiosResponse } from "axios";
import {
  MOVE_TO_COMPLETED,
  MOVE_TO_CURRENT,
  SET_HISTORY_EVENT,
  SET_TODOS,
} from "@/store/todos/mutations-types";

/**
 * state
 */
const state: TodosState = {
  todos: [],
  completedTodos: [],
  history: [],
};

/**
 * getters
 */
const getters = {
  getTodos: (state: TodosState): Array<TodoItem> => {
    return state.todos;
  },
  getCompletedTodos: (state: TodosState): Array<TodoItem> => {
    return state.completedTodos;
  },
  getHistory: (state: TodosState): Array<HistoryEvent> => {
    return state.history;
  },
};
/**
 * actions
 */
const actions = {
  fetchTodos(context: { commit: Commit; dispatch: Dispatch }): void {
    Vue.prototype.$http
      .get(TODOS_URL_LIMIT_100)
      .then(({ data }: AxiosResponse) => context.commit(SET_TODOS, data))
      .catch((e: AxiosError) =>
        console.log("getTodos action error ", e.message)
      );
  },
};

/**
 * mutations
 */
const mutations = {
  [SET_TODOS](state: TodosState, payload: Array<TodoItem>): void {
    state.todos = payload;
  },
  [MOVE_TO_COMPLETED](state: TodosState, payload: TodoItem): void {
    const currentTodos = state.todos.filter((t) => t.id !== payload.id);
    state.completedTodos.unshift(payload);
    state.todos = currentTodos;
  },
  [MOVE_TO_CURRENT](state: TodosState, payload: TodoItem): void {
    const completedTodos = state.completedTodos.filter(
      (t) => t.id !== payload.id
    );
    state.todos.unshift(payload);
    state.completedTodos = completedTodos;
  },
  [SET_HISTORY_EVENT](state: TodosState, payload: HistoryEvent): void {
    state.history.push(payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
