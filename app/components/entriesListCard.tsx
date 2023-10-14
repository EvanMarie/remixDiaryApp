import { Card, HStack, Text, VStack, Wrap } from "@chakra-ui/react";
import CustomIconButton from "./customIconButton";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai/index.js";
import { Entry } from "~/data/entries";
import FormatDate from "~/utils/formatDate";
import { DarkPinkFlex } from "./basicContainers";
import TagBadge from "./tagBadge";

type EntryCardProps = {
  entry: Entry; // Using the 'Entry' type you defined
};

export function EntryCard({ entry }: EntryCardProps) {
  return (
    <Card w="380px" rounded="lg" color="gray.100">
      <DarkPinkFlex
        w="100%"
        h="100%"
        p={3}
        justify="space-between"
        align="flex-start"
        direction="column"
        rounded="lg"
      >
        <VStack w="100%" align="flex-start" spacing={0}>
          <Text color="gray.300">{FormatDate(entry.id)}</Text>
          <Text color="teal.200" fontSize="lg" fontWeight="bold">
            {entry.title}
          </Text>
        </VStack>
        <Text noOfLines={2}>{entry.entry}</Text>
        <VStack justify="space-between" align="center" w="100%">
          <Wrap justify="flex-start" w="100%">
            {entry.tags &&
              entry.tags.length > 0 &&
              entry.tags.map((tag) => (
                <TagBadge key={tag} fontSize="sm">
                  {tag}
                </TagBadge>
              ))}
          </Wrap>
          <HStack w="100%" justify="flex-end">
            <CustomIconButton
              aria-label="Edit entry"
              icon={<AiOutlineEdit />}
              //   onClick={() => handleEdit(entry.id)}
              mr={2}
            />
            <CustomIconButton
              aria-label="Delete entry"
              icon={<AiOutlineDelete />}
              //   onClick={() => handleDelete(entry.id)}
            />
          </HStack>
        </VStack>
      </DarkPinkFlex>
    </Card>
  );
}
