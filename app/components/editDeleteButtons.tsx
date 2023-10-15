import { HStack } from "@chakra-ui/react";
import CustomIconButton from "./customIconButton";
import { BiEdit } from "react-icons/bi/index.js";
import { MdDeleteForever } from "react-icons/md/index.js";
import { RiArrowGoBackLine } from "react-icons/ri/index.js";

export function EditButton({ editClick }: { editClick: () => void }) {
  return (
    <CustomIconButton
      aria-label="Edit entry"
      icon={<BiEdit />}
      h="30px"
      w="30px"
      size="23px"
      onClick={editClick}
    />
  );
}

export function DeleteButton({ deleteClick }: { deleteClick: () => void }) {
  return (
    <CustomIconButton
      aria-label="Delete entry"
      icon={<MdDeleteForever />}
      h="30px"
      w="30px"
      size="23px"
      onClick={deleteClick}
    />
  );
}

export function BackButton({ backClick }: { backClick: () => void }) {
  return (
    <CustomIconButton
      h="30px"
      w="30px"
      size="23px"
      aria-label="close"
      icon={<RiArrowGoBackLine />}
      onClick={backClick}
    />
  );
}

interface EditDeleteButtonsProps {
  showBack?: boolean;
  editClick: () => void;
  deleteClick: () => void;
  backClick?: () => void;
}

export default function EditDeleteButtons({
  showBack = false,
  editClick,
  deleteClick,
  backClick,
}: EditDeleteButtonsProps) {
  return (
    <HStack spacing={3}>
      {editClick && <EditButton editClick={editClick} />}
      {deleteClick && <DeleteButton deleteClick={deleteClick} />}
      {showBack && backClick && <BackButton backClick={backClick} />}
    </HStack>
  );
}
