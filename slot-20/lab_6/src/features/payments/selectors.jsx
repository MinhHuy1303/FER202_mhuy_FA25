import { createSelector } from "reselect";

export const selectPayments = (state) => state.payments.payments;

export const selectSuccessfulPayments = createSelector(
  [selectPayments],
  (payments) => payments.filter((p) => p.status === "SUCCESS")
);
