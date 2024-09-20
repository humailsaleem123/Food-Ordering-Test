"use client";
import React, { useContext } from "react";
import { Button } from "primereact/button";
import AutoCompleteComponent from "../Fields/AutoCompleteComponent";
import { useDispatch, useSelector } from "react-redux";
import { InputIcon } from "primereact/inputicon";
import { GoogleMapContext } from "@/contexts/GoogleMapContext";
import Loader from "../Loader/Loader";
import { IconField } from "primereact/iconfield";
import { Tooltip } from "primereact/tooltip";

function SearchBar() {
  const {
    completeMethod,
    handleChangeAutoComplete,
    handleBullseyeClick,
    clearDropDown,
    loadingState,
    findRestaurantsNearBy,
  } = useContext(GoogleMapContext);

  const formStore = useSelector((state: any) => state.CreateSlice);

  const { dropdownValue, locations } = formStore;

  return (
    <div className="relative left-0 xl:left-[7rem] flex w-full xl:w-[60rem] flex-col md:flex-row bg-black p-3 gap-2 gap-y-4 rounded-lg items-center">
      <div className="relative w-full">
        <IconField>
          <AutoCompleteComponent
            value={dropdownValue?.value || dropdownValue}
            items={locations}
            field="search"
            completeMethod={completeMethod}
            handleChange={handleChangeAutoComplete}
            classes="w-full xl:w-[40rem] p-3 bg-white rounded-lg shadow-lg"
            placeholder="Enter Your Full Address"
            inputClasses="w-full xl:w-[30rem] pr-[6rem] pl-[1rem] focus:border-green-500 focus:ring-0"
            panelClassName="w-full md:w-[39rem]"
          />
          <InputIcon
            className="pi pi-thumbtack text-lime-500 cursor-pointer hover:text-lime-700 right-[7rem] xl:right-[10rem]"
            onClick={handleBullseyeClick}
          >
            <Tooltip
              position="top"
              target=".pi-thumbtack"
              content="Share Location"
            />
          </InputIcon>
          {dropdownValue != "" ? (
            <InputIcon
              className="pi pi-times text-zinc-400 hover:text-zinc-600 cursor-pointer right-[5rem] xl:right-[8rem]"
              onClick={clearDropDown}
            ></InputIcon>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </IconField>

        <Loader
          classes="absolute flex items-center justify-center top-1/2 transform -translate-y-1/2 right-[3rem] xl:right-[6rem] z-10"
          isShow={loadingState.isLoading}
          instanceId={loadingState.instanceId}
          loaderId="1"
        />
      </div>

      <Button
        className="w-80 p-2 text-white bg-green-500 hover:bg-green-600"
        label="Find Restaurants"
        severity="success"
        raised
        onClick={findRestaurantsNearBy}
      />
    </div>
  );
}

export default SearchBar;
