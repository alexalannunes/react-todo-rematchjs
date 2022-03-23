import { createModel } from "@rematch/core";
import { RootModel } from "..";

export type Filter = "ALL" | "COMPLETED" | "UNCOMPLETED";

export const filterModel = createModel<RootModel>()({
  name: "filter",
  state: "ALL" as Filter,
  reducers: {
    setFilter: (state, payload: Filter) => {
      return payload;
    },
  },
});
