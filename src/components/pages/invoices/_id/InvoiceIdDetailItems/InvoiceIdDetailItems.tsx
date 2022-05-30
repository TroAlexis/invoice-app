import Text from "components/ui/Text/Text";
import { Constraints } from "constants/size";
import { ComponentPropsWithoutRef } from "react";
import { Invoice, Item } from "types/invoices";
import { classNames } from "utils/classnames";
import { prettifyPrice } from "utils/string";
import styles from "./InvoiceIdDetailItems.module.scss";

type Items = Pick<Invoice, "items">;
interface Props extends ComponentPropsWithoutRef<"section">, Items {}

export default function InvoiceIdDetailItems({
  items,
  className,
  ...props
}: Props) {
  const classes = classNames([styles.wrapper, className]);
  const headerClasses = classNames([
    styles.header,
    styles.secondary,
    styles.label,
  ]);
  const total = items.reduce((total, { price }) => total + price, 0);

  return (
    <section className={classes} {...props}>
      <table className={styles.body}>
        <thead>
          <tr className={headerClasses}>
            {["Item Name", "QTY.", "Price", "Total"].map((label) => {
              return (
                <th className={styles.column}>
                  <Text className={styles.label} type={Constraints.LOOSE}>
                    {label}
                  </Text>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {items.map(({ name, quantity, total, price }, index) => {
            const key = name + quantity + price + index;
            const totalPrice = total ?? getTotalPrice({ quantity, price });

            return (
              <tr key={key} className={styles.row}>
                <td className={styles.column}>
                  <Text>{name}</Text>
                </td>
                <td className={styles.column}>
                  <Text className={styles.secondary}>{quantity}</Text>
                </td>
                <td className={styles.column}>
                  <Text className={styles.secondary}>
                    £ {prettifyPrice(price)}
                  </Text>
                </td>
                <td className={styles.column}>
                  <Text>{prettifyPrice(totalPrice)}</Text>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.footer}>
        <Text type={Constraints.LOOSE}>Amount Due</Text>

        <p className={styles.total}>£ {prettifyPrice(total)}</p>
      </div>
    </section>
  );
}

function getTotalPrice({ quantity, price }: Pick<Item, "quantity" | "price">) {
  return price * quantity;
}
