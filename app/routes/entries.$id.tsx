import { Center, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";
import EditDeleteButtons from "~/components/editDeleteButtons";
import { useEscapeBack } from "~/components/escapeNav";
import FadeIn from "~/components/fadeIn";
import TagsWrap from "~/components/tagsWrap";
import { Entry, getStoredEntries } from "~/data/entries";
import { darkTealGrad } from "~/styles/customTheme";
import FormatDate from "~/utils/formatDate";

export async function loader() {
  const entries = await getStoredEntries();
  return entries;
}

export default function ViewEntry() {
  const escapeBack = useEscapeBack();
  const entries = useLoaderData<Entry[]>();
  const entryId = useParams().id;
  const selectedEntry = entries?.find((entry: Entry) => entryId === entry.id);
  const navigate = useNavigate();
  const entryTags =
    selectedEntry && selectedEntry.tags?.length > 0 ? selectedEntry.tags : [];
  escapeBack();
  return (
    <Center
      w="100vw"
      h="100vh"
      position="absolute"
      top="0"
      right="0"
      bg="rgba(0, 0, 0, 0.7)"
      backdropFilter="blur(4px) hue-rotate(10deg)"
      onClick={() => navigate(-1)}
      zIndex="1"
    >
      {" "}
      <FadeIn>
        <VStack
          w="100%"
          maxW="800px"
          minH="400px"
          maxH="600px"
          bgGradient={darkTealGrad}
          p={4}
          zIndex="3"
          onClick={(e) => e.stopPropagation()}
        >
          <Flex fontSize="lg" w="100%" position="relative">
            <VStack
              spacing={0}
              w="100%"
              align="start"
              justify="space-between"
              lineHeight="1.7rem"
            >
              <HStack w="100%" justify="space-between">
                <Text color="teal.300">
                  {" "}
                  {FormatDate(selectedEntry ? selectedEntry.id : "")}
                </Text>
                <EditDeleteButtons
                  showBack={true}
                  backClick={() => navigate(-1)}
                />
              </HStack>
              <Text color="purple.100">
                {selectedEntry && selectedEntry.title}
              </Text>
            </VStack>
          </Flex>
          <Flex>
            <VStack w="100%" spacing={4} align="flex-start">
              <TagsWrap tags={entryTags} />
              <Text>{selectedEntry && selectedEntry.entry}</Text>
            </VStack>
          </Flex>
        </VStack>{" "}
      </FadeIn>
    </Center>
  );
}
