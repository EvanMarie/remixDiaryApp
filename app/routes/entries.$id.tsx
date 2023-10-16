import { Box, Center, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "@remix-run/react";
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
import { useDetectSafari } from "~/utils/useDetectSafari";
import { json } from "@remix-run/node";

export async function loader({ params }: { params: { id: string } }) {
  const entries = await getStoredEntries();
  const entryId = params.id;
  const selectedEntry = entries?.find((entry: Entry) => entryId === entry.id);
  if (!selectedEntry) {
    // throw new Error("No entry found");
    throw json(
      { message: "No entry found" },
      { status: 404, statusText: "No entry found" }
    );
  }
  return selectedEntry;
}

export default function ViewEntry() {
  useEscapeBack();
  const selectedEntry = useLoaderData<Entry>();
  const navigate = useNavigate();
  const entryTags =
    selectedEntry && selectedEntry.tags?.length > 0 ? selectedEntry.tags : [];
  const isSafariMobile = useDetectSafari();

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
        <Flex
          p={{ base: 0, sm: 4 }}
          w="100%"
          justify="center"
          overflowY="hidden"
        >
          <VStack
            w={{ base: "100vw", sm: "100%" }}
            h={{ base: "100vh", sm: "auto" }}
            maxW="800px"
            minH="400px"
            overflowY="hidden"
            bgGradient={darkTealGrad}
            p={{ base: 4, md: 8 }}
            pt={{ base: "85px", sm: "20px" }}
            zIndex="3"
            onClick={(e) => e.stopPropagation()}
            rounded={radius}
            shadow={largeShadow}
            animation="fade-slide-in 0.5s ease-out forwards;"
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
                    id={selectedEntry ? selectedEntry.id : ""}
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
                  maxH={
                    isSafariMobile ? "525px" : { base: "700px", sm: "500px" }
                  }
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
