import { Item } from "types/invoices";

export function getTotalPrice({
  quantity,
  price,
}: Pick<Item, "quantity" | "price">) {
  return price * quantity;
}
