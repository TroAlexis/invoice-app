import { useTypedDispatch } from "@/hooks/useTypedStore";
import { InvoiceActionType } from "@/store/types/invoices";
import InvoiceButton from "components/elements/InvoiceButton/InvoiceButton";
import styles from "components/pages/invoices/index/InvoicesHeaderControls/InvoicesHeaderControls.module.scss";
import Select from "components/ui/Select/Select";
import { ComponentPropsWithoutRef, FC } from "react";
import { GroupBase, MultiValue, StylesConfig } from "react-select";
import { Filter } from "types/invoices";

interface Props extends ComponentPropsWithoutRef<"div"> {
  options: Filter[];
}

const InvoicesHeaderControls: FC<Props> = ({ options }) => {
  const selectStyles: StylesConfig<Filter, true, GroupBase<Filter>> = {
    placeholder: (base, props) => ({
      ...base,
      color: "inherit",
    }),
  };

  const dispatch = useTypedDispatch();
  const handleChange = (value: MultiValue<Filter>) =>
    dispatch({
      type: InvoiceActionType.SET_FILTERS,
      filters: value as Filter[],
    });

  return (
    <div className={styles.controls}>
      <Select
        className={styles.select}
        outline
        isMulti
        isSearchable={false}
        options={options}
        placeholder="Filter by status"
        closeMenuOnSelect={false}
        blurInputOnSelect={false}
        isClearable={false}
        hideSelectedOptions={false}
        controlShouldRenderValue={false}
        styles={selectStyles}
        onChange={handleChange}
      />

      <InvoiceButton />
    </div>
  );
};

export default InvoicesHeaderControls;
