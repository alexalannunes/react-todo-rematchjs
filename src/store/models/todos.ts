import { createModel } from "@rematch/core";
import { RootModel } from "..";

export interface ITodo {
  id: number;
  text: string;
  checked: boolean;
}

export interface ITodosState {
  data: ITodo[];
  status: "idle" | "loading";
}

export const todosModel = createModel<RootModel>()({
  name: "todos",
  state: {
    data: [
      {
        id: 1,
        text: "viviane",
        checked: true,
      },
      {
        id: 2,
        text: "alex",
        checked: false,
      },
      {
        id: 3,
        text: "kevina",
        checked: true,
      },
    ],
    status: "idle",
  } as ITodosState,
  reducers: {
    addTodo: (state, payload) => {
      return {
        ...state,
        status: "idle",
        data: [...state.data, payload],
      };
    },
    removeTodo: (state, payload: number) => {
      return {
        ...state,
        data: state.data.filter((i) => i.id !== payload),
      };
    },
    toggle: (state, payload: number) => {
      return {
        ...state,
        data: state.data.map((i) =>
          i.id === payload ? { ...i, checked: !i.checked } : i
        ),
      };
    },
  },
});
