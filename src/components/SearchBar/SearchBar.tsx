"use client";
import React, { useContext } from "react";
import { Button } from "primereact/button";
import AutoCompleteComponent from "../Fields/AutoCompleteComponent";
import { useDispatch, useSelector } from "react-redux";
import { InputIcon } from "primereact/inputicon";
import { GoogleMapContext } from "@/contexts/GoogleMapContext";

function SearchBar() {
  const {
    completeMethod,
    handleChangeAutoComplete,
    handleBullseyeClick,
    clearDropDown,
  } = useContext(GoogleMapContext);

  const formStore = useSelector((state: any) => state.CreateSlice);

  const { dropdownValue, locations } = formStore;

  return (
    <div className="relative flex w-[60rem] md:w-[60rem] flex-col md:flex-row bg-black p-3 gap-2 rounded-lg">
      <div className="relative w-full">
        <AutoCompleteComponent
          value={dropdownValue?.value || dropdownValue}
          items={locations}
          field="search"
          completeMethod={completeMethod}
          handleChange={handleChangeAutoComplete}
          classes="w-[40rem] p-3 bg-white rounded-lg shadow-lg"
          placeholder="Enter Your Full Address"
          inputClasses="w-[30rem] pr-[6rem] pl-[1rem] focus:border-green-500 focus:ring-0"
          panelClassName="w-[39rem]"
        />

        <InputIcon
          className="pi pi-bullseye absolute right-[9.5rem] top-1/2 transform -translate-y-1/2 text-lime-400 cursor-pointer hover:text-lime-600"
          style={{ fontSize: "1.2rem" }}
          onClick={handleBullseyeClick}
        ></InputIcon>
        {dropdownValue !== "" ? (
          <InputIcon
            className="pi pi-times absolute right-[7.5rem] top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            style={{ fontSize: "1rem" }}
            onClick={clearDropDown}
          ></InputIcon>
        ) : null}
      </div>

      <Button
        className="w-80 p-2 text-white bg-green-500 hover:bg-green-600"
        label="Find Restaurants"
        severity="success"
        raised
      />
    </div>
  );
}

export default SearchBar;
