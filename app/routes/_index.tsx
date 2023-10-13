import { Text, VStack } from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/node";
import CustomButton from "~/components/customButton";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <VStack w="100%" spacing={4}>
      <Text fontSize="4xl" fontWeight="bold">
        Diary Project
      </Text>

      <CustomButton to="/entries">My Diary Entries</CustomButton>
    </VStack>
  );
}
