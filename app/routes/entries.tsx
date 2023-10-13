import { Text, VStack } from "@chakra-ui/react";
import CustomButton from "~/components/customButton";
import NewEntry from "~/components/newEntry";

export default function Entries() {
  return (
    <VStack w="100%" spacing={4}>
      <Text fontSize="4xl" fontWeight="bold">
        My Diary Entries
      </Text>
      <CustomButton to="/">Home</CustomButton>
      <NewEntry />
    </VStack>
  );
}
