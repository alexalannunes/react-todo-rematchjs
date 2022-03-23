import { createModel } from "@rematch/core";
import { RootModel } from "..";

export type OrderBy = "ASC" | "DESC";

export const orderModel = createModel<RootModel>()({
  name: "order",
  state: "ASC" as OrderBy,
  reducers: {
    orderBy: (state, payload: OrderBy) => {
      return payload;
    },
  },
});
