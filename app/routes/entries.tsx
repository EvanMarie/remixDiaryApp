import { Text, VStack } from "@chakra-ui/react";
import EntriesList from "~/components/entriesList";

const TestEntry = {
  id: "2023-10-14T14:03:35.268Z",
  title: "Test Entry",
  entry:
    "This is a test entry blah blah blah. What a great day. Yay, I love it!",
  tags: ["test", "entry"],
};

export default function Entries() {
  return (
    <VStack w="100%" spacing={4}>
      <Text fontSize="4xl" fontWeight="bold">
        My Diary Entries
      </Text>
      {/* <EntryCard entry={TestEntry} /> */}
      <EntriesList entries={[TestEntry]} />
    </VStack>
  );
}
