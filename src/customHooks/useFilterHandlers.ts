import { useEffect, useState } from "react";
import useToggleDropDown from "./useToggleDropDown";
import { useTableParamsContext } from "../context/TableParamsContext";

const useFilterHandlers = () => {
  const [statusToggle, setStatusToggle] = useState(false);
  const { selectColumn } = useToggleDropDown("filter");
  const { searchParams, setSearchParams, statusParams, setStatusParams } =
    useTableParamsContext();

  const handleSelectSex = (sex: string) => {
    searchParams.set("value", sex); // Set sex to params
    setSearchParams(searchParams);
  };

  const handleStatusToggle = () => setStatusToggle((prev) => !prev); // Toggle dropdown status

  const handleStatusSelect = (status: string) => {
    setStatusToggle(false); // Close status dropdown when an option is clicked
    statusParams.set("status", decodeURIComponent(status.toLowerCase())); // Set status param
    setStatusParams(statusParams);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp("[^a-z0-9][/S]", "gi"); // Allow only letters and numbers in input
    const inputValue = e.target.value.replace(regex, "");

    if (!statusParams.has("status")) return; // Prevent setting input value when status is not defined

    if (selectColumn) {
      searchParams.set("value", inputValue); // Set input value to search params
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    if (!selectColumn) {
      searchParams.delete("value"); // Remove value param if no column is selected
      setSearchParams(searchParams);
    }
  }, [selectColumn]);

  return {
    statusToggle,
    handleSelectSex,
    handleStatusToggle,
    handleStatusSelect,
    handleOnChange,
  };
};

export default useFilterHandlers;
