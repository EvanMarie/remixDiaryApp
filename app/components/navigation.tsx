import { HStack } from "@chakra-ui/react";
import CustomButton from "./customButton";
import { BsGearWideConnected, BsJournalPlus } from "react-icons/bs/index.js";
import { IoDocumentsOutline } from "react-icons/io5/index.js";
import { darkGrayGrad, largeShadow } from "~/styles/customTheme";

export default function Navigation() {
  return (
    <HStack
      spacing={4}
      position="fixed"
      h="70px"
      // bg="gray.900"
      bgGradient={darkGrayGrad}
      shadow={largeShadow}
      w="100%"
      justify="center"
      align="center"
    >
      <CustomButton h="100%" to="/entries" leftIcon={<IoDocumentsOutline />}>
        Entries
      </CustomButton>
      <CustomButton h="100%" to="/newentry" leftIcon={<BsJournalPlus />}>
        New
      </CustomButton>
      <CustomButton h="100%" to="/setup" leftIcon={<BsGearWideConnected />}>
        Setup
      </CustomButton>
    </HStack>
  );
}
