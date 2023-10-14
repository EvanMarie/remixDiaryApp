import { Entry } from "~/data/entries";
import { EntryCard } from "./entriesListCard";
import { Wrap } from "@chakra-ui/react";

interface EntriesListProps {
  entries: Entry[];
}

export default function EntriesList({ entries }: EntriesListProps) {
  return (
    <Wrap
      w="100%"
      maxW="1600px"
      px={4}
      justify={{ base: "center", md: "flex-start" }}
    >
      {entries.map((entry, index) => (
        <EntryCard key={index} entry={entry} />
      ))}
    </Wrap>
  );
}
