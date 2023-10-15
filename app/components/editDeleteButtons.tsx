import { HStack } from "@chakra-ui/react";
import CustomIconButton from "./customIconButton";
import { BiEdit } from "react-icons/bi/index.js";
import { MdDeleteForever } from "react-icons/md/index.js";
import { RiArrowGoBackLine } from "react-icons/ri/index.js";

interface EditDeleteButtonsProps {
  showBack?: boolean;
  editClick?: () => void;
  deleteClick?: () => void;
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
      <CustomIconButton
        aria-label="Edit entry"
        icon={<BiEdit />}
        h="30px"
        w="30px"
        size="23px"
        onClick={editClick}
      />
      <CustomIconButton
        aria-label="Delete entry"
        icon={<MdDeleteForever />}
        h="30px"
        w="30px"
        size="23px"
        onClick={deleteClick}
      />
      {showBack && (
        <CustomIconButton
          h="30px"
          w="30px"
          size="23px"
          aria-label="close"
          icon={<RiArrowGoBackLine />}
          onClick={backClick}
        />
      )}
    </HStack>
  );
}
