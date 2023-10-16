import { HStack } from "@chakra-ui/react";
import CustomIconButton from "./customIconButton";
import { BiEdit } from "react-icons/bi/index.js";
import { MdDeleteForever } from "react-icons/md/index.js";
import { RiArrowGoBackLine } from "react-icons/ri/index.js";
import { useNavigate, useSubmit } from "@remix-run/react";

export function EditButton({ id }: { id: string }) {
  const navigate = useNavigate();
  return (
    <CustomIconButton
      aria-label="Edit entry"
      icon={<BiEdit />}
      h="30px"
      w="30px"
      size="23px"
      onClick={() => navigate(`/entries/editentry/${id}`)}
    />
  );
}

export function DeleteButton({ id }: { id: string }) {
  const submit = useSubmit();
  return (
    <CustomIconButton
      aria-label="Delete entry"
      icon={<MdDeleteForever />}
      h="30px"
      w="30px"
      size="23px"
      onClick={() => submit({ id }, { action: "/deleteentry", method: "post" })}
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
  id?: string;
  showBack?: boolean;
  backClick?: () => void;
}

export default function EditDeleteButtons({
  id,
  showBack = false,
  backClick,
}: EditDeleteButtonsProps) {
  return (
    <HStack spacing={3}>
      {id && <EditButton id={id} />}
      {id && <DeleteButton id={id} />}
      {showBack && backClick && <BackButton backClick={backClick} />}
    </HStack>
  );
}
