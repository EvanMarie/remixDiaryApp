import { Box, Center, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useLoaderData, useNavigate, useParams } from "@remix-run/react";
import EditDeleteButtons from "~/components/editDeleteButtons";
import { useEscapeBack } from "~/utils/escapeNav";
import FadeIn from "~/components/fadeIn";
import TagsWrap from "~/components/tagsWrap";
import { Entry, getStoredEntries } from "~/data/entries";
import {
  darkTealGrad,
  largeShadow,
  radius,
  scrollBarStyles,
  textShadow,
} from "~/styles/customTheme";
import FormatDate from "~/utils/formatDate";

export async function loader() {
  const entries = await getStoredEntries();
  return entries;
}

export default function ViewEntry() {
  useEscapeBack();
  const entries = useLoaderData<Entry[]>();
  const entryId = useParams().id;
  const selectedEntry = entries?.find((entry: Entry) => entryId === entry.id);
  const navigate = useNavigate();
  const entryTags =
    selectedEntry && selectedEntry.tags?.length > 0 ? selectedEntry.tags : [];

  return (
    <Center
      w="100vw"
      h="100vh"
      position="absolute"
      top="0"
      right="0"
      bg="rgba(0, 0, 0, 0.5)"
      backdropFilter="blur(4px) hue-rotate(10deg)"
      onClick={() => navigate(-1)}
      zIndex="1"
    >
      {" "}
      <FadeIn>
        <Flex p={4} w="100%" justify="center">
          <VStack
            w={{ base: "100vw", sm: "100%" }}
            h={{ base: "100vh", sm: "auto" }}
            maxW="800px"
            minH="400px"
            // maxH={{ base: "100vh", sm: "600px" }}
            // overflowY="auto"
            overflowY="hidden"
            sx={scrollBarStyles}
            bgGradient={darkTealGrad}
            p={4}
            zIndex="3"
            onClick={(e) => e.stopPropagation()}
            rounded={radius}
            shadow={largeShadow}
          >
            <Flex fontSize="lg" w="100%" position="relative">
              <VStack
                spacing={0}
                w="100%"
                align="start"
                justify="space-between"
                lineHeight="1.7rem"
              >
                <HStack
                  w="100%"
                  justify="space-between"
                  borderBottom="1px solid"
                  pb={2}
                >
                  <Text color="teal.300" textShadow={textShadow}>
                    {" "}
                    {FormatDate(selectedEntry ? selectedEntry.id : "")}
                  </Text>
                  <EditDeleteButtons
                    showBack={true}
                    backClick={() => navigate(-1)}
                    editClick={() => console.log("edit clicked")}
                    deleteClick={() => console.log("delete clicked")}
                  />
                </HStack>
                <Box w="100%" py={2}>
                  <Text
                    color="purple.200"
                    textShadow={textShadow}
                    noOfLines={1}
                    fontSize="lg"
                    fontWeight="bold"
                  >
                    {selectedEntry && selectedEntry.title}
                  </Text>
                </Box>
              </VStack>
            </Flex>
            <Flex w="100%">
              <VStack w="100%" spacing={4} align="flex-start">
                <TagsWrap tags={entryTags} />
                <Box
                  w="100%"
                  px={2}
                  maxH={{ base: "600px", sm: "400px" }}
                  overflowY="auto"
                  sx={scrollBarStyles}
                >
                  <Text whiteSpace="pre-wrap">
                    {selectedEntry && selectedEntry.entry}
                  </Text>
                </Box>
              </VStack>
            </Flex>
          </VStack>
        </Flex>
      </FadeIn>
    </Center>
  );
}
