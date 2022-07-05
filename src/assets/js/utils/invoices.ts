import { Invoice, Item } from "types/invoices";
import { daysToMs } from "utils/date";

export function getTotalPrice({
  quantity,
  price,
}: Pick<Item, "quantity" | "price">) {
  return price * quantity;
}

export function getPaymentDue({
  paymentTerms,
  createdAt,
}: Pick<Invoice, "paymentTerms" | "createdAt">) {
  const dueDate = new Date(createdAt);
  const dueTime = dueDate.getTime() + daysToMs(paymentTerms);
  dueDate.setTime(dueTime);

  return dueDate;
}
