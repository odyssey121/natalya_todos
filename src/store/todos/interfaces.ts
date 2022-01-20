export interface TodosState {
  todos: Array<TodoItem>;
  completedTodos: Array<TodoItem>;
  history: Array<HistoryEvent>;
}

export interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export enum HISTORY_ACTIONS {
  MOVE_TO_COMPLETED = "move to completed",
  MOVE_TO_CURRENT = "move to current",
}

export type HistoryAction = HISTORY_ACTIONS[keyof HISTORY_ACTIONS];

export interface HistoryEvent {
  action: HistoryAction;
  name: string;
  id: number;
  date: Date;
}
