import { Box, Card, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Entry } from "~/data/entries";
import FormatDate from "~/utils/formatDate";
import { darkPinkGrad, largeShadow, textShadow } from "~/styles/customTheme";
import TagsWrap from "./tagsWrap";
import { useNavigate } from "@remix-run/react";
import EditDeleteButtons from "./editDeleteButtons";

type EntryCardProps = {
  entry: Entry;
  cardColor?: string;
};

export function EntryCard({ entry, cardColor }: EntryCardProps) {
  const cardTags = entry.tags?.length > 0 ? entry.tags.slice(0, 4) : [];
  const navigate = useNavigate();

  return (
    <>
      <Card
        w="100%"
        maxW="420px"
        rounded="xl"
        color="gray.100"
        shadow={largeShadow}
        onClick={() => navigate(`${entry.id}`)}
      >
        <Flex
          bgGradient={cardColor ? cardColor : darkPinkGrad}
          _hover={{
            cursor: "pointer",
            bgGradient: "linear(to-b, teal.900, teal.800)",
          }}
          transition="all 0.3s ease-in-out"
          w="100%"
          h="100%"
          p={3}
          pt={2}
          justify="space-between"
          align="start"
          direction="column"
          rounded="lg"
        >
          <VStack w="100%">
            <VStack w="100%" align="start" spacing={0}>
              <HStack
                w="100%"
                justify="space-between"
                borderBottom="1px solid"
                pb={2}
                align="end"
              >
                <Text color="gray.300" textShadow={textShadow}>
                  {FormatDate(entry.id)}
                </Text>
                <EditDeleteButtons
                  editClick={() => console.log("edit clicked")}
                  deleteClick={() => console.log("delete clicked")}
                />
              </HStack>
              <Text
                color="purple.200"
                textShadow={textShadow}
                noOfLines={1}
                fontSize="lg"
                fontWeight="bold"
              >
                {entry.title}
              </Text>
            </VStack>
            <VStack w="100%" spacing={4} align="start">
              <Box minH="43px">
                <Text noOfLines={2} lineHeight="1.3rem">
                  {entry.entry}
                </Text>
              </Box>
              <TagsWrap tags={cardTags} />
            </VStack>
          </VStack>
        </Flex>
      </Card>
    </>
  );
}
