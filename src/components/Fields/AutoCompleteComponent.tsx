import React from "react";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";

function AutoCompleteComponent({
  value,
  items,
  field,
  name,
  completeMethod,
  handleChange,
  classes,
  inputClasses,
  panelClassName,
  placeholder,
}: AutoCompleteComponentProps) {
  return (
    <React.Fragment>
      <AutoComplete
        field={field}
        name={name}
        value={value}
        suggestions={items}
        completeMethod={completeMethod}
        onChange={handleChange}
        className={classes}
        placeholder={placeholder}
        dropdown
        itemTemplate={(item) => itemTemplate(item)}
        inputClassName={inputClasses}
        emptyMessage="No Options Available"
        showEmptyMessage={true}
        loadingIcon={<i className="pi pi-spinner-dotted mt-1"></i>}
        panelClassName={panelClassName}
      />
    </React.Fragment>
  );
}

export default AutoCompleteComponent;

interface AutoCompleteComponentProps {
  value: string;
  items: { label: string; placeId: string }[];
  field: string;
  name: string;
  completeMethod: (e: AutoCompleteCompleteEvent) => void;
  handleChange: (e: AutoCompleteChangeEvent) => void;
  classes?: string;
  inputClasses?: string;
  panelClassName?: string;
  placeholder?: string;
}

export const itemTemplate = (item: any) => {
  return (
    <div className="p-2 w-full flex items-center gap-4">
      <i className="pi pi-map-marker text-black"></i>
      <div className="flex-col">
        <h4 className="font-bold">{item.heading}</h4>
        <h6 className="font-medium">{item.subheading}</h6>
      </div>
    </div>
  );
};
