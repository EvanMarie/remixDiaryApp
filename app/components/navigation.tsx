import { HStack } from "@chakra-ui/react";
import CustomButton from "./customButton";
import { BsGearWideConnected, BsJournalPlus } from "react-icons/bs/index.js";
import { RiHomeLine } from "react-icons/ri/index.js";
import { IoDocumentsOutline } from "react-icons/io5/index.js";
import { largeShadow } from "~/styles/customTheme";

export default function Navigation() {
  return (
    <HStack
      spacing={6}
      position="fixed"
      h="60px"
      bg="gray.900"
      shadow={largeShadow}
      w="100%"
      justify="center"
      align="center"
    >
      <CustomButton to="/" leftIcon={<RiHomeLine />}>
        Home
      </CustomButton>
      <CustomButton to="/entries" leftIcon={<IoDocumentsOutline />}>
        Entries
      </CustomButton>
      <CustomButton to="/newentry" leftIcon={<BsJournalPlus />}>
        New
      </CustomButton>
      <CustomButton to="/setup" leftIcon={<BsGearWideConnected />}>
        Setup
      </CustomButton>
    </HStack>
  );
}
