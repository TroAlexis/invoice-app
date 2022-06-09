import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";
import Button from "components/ui/Button/Button";
import Heading from "components/ui/Heading/Heading";
import Icon from "components/ui/Icon/Icon";
import Input from "components/ui/Input/Input";
import Text from "components/ui/Text/Text";
import { Color } from "constants/color";
import { Size } from "constants/size";
import { Immutable } from "immer";
import { ComponentPropsWithoutRef, useCallback } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { Invoice } from "types/invoices";
import { Callback, InputHandler } from "types/shared";
import { animateFadeInUp } from "utils/animations";
import { classNames } from "utils/classnames";
import { isKeyIn } from "utils/common";
import { getTotalPrice } from "utils/invoices";
import { prettifyPrice } from "utils/string";
import styles from "./InvoiceFormItemList.module.scss";

type Items = Invoice["items"];
type Item = Items[number];

interface Props extends Omit<ComponentPropsWithoutRef<"section">, "onChange"> {
  items: Items;
  onChange: (value: Items) => void;
}

type ItemChangeHandler = (
  index: number,
  prop: keyof Item,
  value: Item[typeof prop]
) => void;

type ItemDeleteHandler = (index: number) => void;

export default function InvoiceFormItemList({
  className,
  items,
  onChange,
  ...props
}: Immutable<Props>) {
  const classes = classNames([styles.wrapper, className]);

  const handleItemChange: ItemChangeHandler = (index, prop, value) => {
    const updatedItems = [...items];
    const itemToUpdate = updatedItems[index];
    updatedItems[index] = { ...itemToUpdate, [prop]: value };

    onChange(updatedItems);
  };

  const addNewItem = () => {
    onChange([
      ...items,
      {
        id: uuid(),
        price: 0,
        name: "New Item",
        quantity: 1,
      },
    ]);
  };

  const deleteItem: ItemDeleteHandler = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    onChange(updatedItems);
  };

  return (
    <Flipper
      flipKey={items.length}
      element="section"
      className={classes}
      {...props}
    >
      <Flipped flipId="heading">
        <Heading level="h2" className={styles.heading} size={Size.SMALL}>
          {items.length ? "Item List" : "No items yet"}
        </Heading>
      </Flipped>

      {!!items.length && (
        <table className={styles.table}>
          <LabelsRow />

          <ItemsBody
            items={items}
            onChange={handleItemChange}
            onDelete={deleteItem}
          />
        </table>
      )}

      <Flipped flipId="button">
        <Button color={Color.SECONDARY} onClick={addNewItem}>
          + Add New Item
        </Button>
      </Flipped>
    </Flipper>
  );
}

const LabelsRow = () => (
  <Flipped flipId="head">
    <thead className={styles.head}>
      <tr>
        {["Item Name", "QTY.", "Price", "Total", ""].map((label) => {
          return (
            <th className={styles.column} key={label}>
              <Text>{label}</Text>
            </th>
          );
        })}
      </tr>
    </thead>
  </Flipped>
);

interface ItemRowProps
  extends Omit<ComponentPropsWithoutRef<"tr">, "onChange"> {
  item: Item;
  onChange: (key: keyof Item, value: Item[typeof key]) => void;
  onDelete: Callback;
}

const ItemRow = ({
  onChange,
  onDelete,
  item,
  ...attrs
}: Immutable<ItemRowProps>) => {
  const { name, price, quantity, total } = item;
  const totalPrice = total ?? getTotalPrice({ quantity, price });

  const handleInput = useCallback<InputHandler>(
    (e) => {
      const { name, value } = e.target as HTMLInputElement;

      if (isKeyIn(item, name)) {
        return onChange(name, value);
      }
    },
    [item, onChange]
  );

  const actionClasses = classNames([styles.actions, styles.column]);

  return (
    <tr {...attrs}>
      <td className={styles.column}>
        <Input
          name="name"
          value={name}
          onInput={handleInput}
          size={Size.SMALLER}
        />
      </td>
      <td className={styles.column}>
        <Input
          inputClassName={styles.quantity}
          name="quantity"
          value={quantity}
          onInput={handleInput}
          size={Size.SMALLER}
        />
      </td>
      <td className={styles.column}>
        <Input
          name="price"
          value={price}
          onInput={handleInput}
          size={Size.SMALLER}
        />
      </td>
      <td className={styles.column}>
        <Text className={styles.total}>{prettifyPrice(totalPrice)}</Text>
      </td>
      <td className={actionClasses}>
        <Icon
          name="trash"
          className={styles.delete}
          size={Size.SMALL}
          onClick={onDelete}
        />
      </td>
    </tr>
  );
};

interface ItemBodyProps {
  items: Items;
  onChange: ItemChangeHandler;
  onDelete: ItemDeleteHandler;
}

const listAnimations = {
  onAppear(element: HTMLElement) {
    return animateFadeInUp(
      element,
      {},
      {
        opacity: [0, 1],
        translate: [50, 0],
      }
    );
  },
};

const ItemsBody = ({ items, onChange, onDelete }: Immutable<ItemBodyProps>) => (
  <tbody>
    {items.map((item, index) => {
      const itemKey = `_row-${item.id}`;
      const handleChange: ItemRowProps["onChange"] = (key, value) =>
        onChange(index, key, value);
      const handleDelete = () => onDelete(index);

      return (
        <Flipped flipId={itemKey} key={itemKey} stagger {...listAnimations}>
          <ItemRow
            item={item}
            key={itemKey}
            onChange={handleChange}
            onDelete={handleDelete}
          />
        </Flipped>
      );
    })}
  </tbody>
);
