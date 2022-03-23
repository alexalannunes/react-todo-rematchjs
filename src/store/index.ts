import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";
import { filterModel } from "./models/filter";
import { orderModel } from "./models/order";
import { todosModel } from "./models/todos";

export interface RootModel extends Models<RootModel> {
  todos: typeof todosModel;
  order: typeof orderModel;
  filter: typeof filterModel;
}

export const store = init({
  models: {
    todos: todosModel,
    order: orderModel,
    filter: filterModel,
  },
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
