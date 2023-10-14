import { Text, VStack } from "@chakra-ui/react";

export default function Entries() {
  return (
    <VStack w="100%" spacing={4}>
      <Text fontSize="4xl" fontWeight="bold">
        My Diary Entries
      </Text>
      <Text fontSize="xl">ENTRIES</Text>
    </VStack>
  );
}
