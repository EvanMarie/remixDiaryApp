import { Input } from "@chakra-ui/react";
import { useState } from "react";
import CustomIconButton from "./customIconButton";
import { BiSearchAlt } from "react-icons/bi/index.js";

export function SearchEntriesInput() {
  return <Input type="search" placeholder="Search Entries" />;
}

export function SearchEntriesIconButton() {
  return (
    <CustomIconButton icon={<BiSearchAlt />} aria-label="Search Entries" />
  );
}
