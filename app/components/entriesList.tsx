import { Entry } from "~/data/entries";
import { EntryCard } from "./entriesListCard";
import { Wrap } from "@chakra-ui/react";
import { useDetectSafari } from "~/utils/useDetectSafari";

interface EntriesListProps {
  entries: Entry[];
}

export const cardColors = [
  "linear(to-b, #240a1c, #330e28)",
  "linear(to-b, #4d153c, #5c1947)",
  "linear(to-b, #330e28, #3d1130)",
  "linear(to-b, #3d1130, #4d153c)",
  "linear(to-b, #330e28, #240a1c)",
  "linear(to-b, #5c1947, #4d153c)",
  "linear(to-b, #4d153c, #3d1130)",
  "linear(to-b, #3d1130, #330e28)",
];

export default function EntriesList({ entries }: EntriesListProps) {
  const isSafariMobile = useDetectSafari();

  return (
    <Wrap
      w="100%"
      h="100%"
      maxW="1600px"
      px={4}
      spacing={6}
      justify="center"
      pt={{ base: "15px", md: "10px" }}
      pb={isSafariMobile ? "130px" : "20px"}
    >
      {entries.map((entry, index) => {
        // Calculate the color index by taking the modulus of the current index with the length of the cardColors array
        const colorIndex = index % cardColors.length;
        // Get the color for this entry
        const cardColor = cardColors[colorIndex];

        return <EntryCard key={index} entry={entry} cardColor={cardColor} />;
      })}
    </Wrap>
  );
}
