import { Box, Card, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Entry } from "~/data/entries";
import FormatDate from "~/utils/formatDate";
import { darkPinkGrad, largeShadow, textShadow } from "~/styles/customTheme";
import TagsWrap from "./tagsWrap";
import { useNavigate } from "@remix-run/react";
import EditDeleteButtons from "./editDeleteButtons";

type EntryCardProps = {
  entry: Entry; // Using the 'Entry' type you defined
};

export function EntryCard({ entry }: EntryCardProps) {
  const cardTags = entry.tags?.length > 0 ? entry.tags.slice(0, 4) : [];
  const navigate = useNavigate();

  return (
    <>
      <Card
        w="380px"
        rounded="lg"
        color="gray.100"
        shadow={largeShadow}
        onClick={() => navigate(`${entry.id}`)}
      >
        <Flex
          bgGradient={darkPinkGrad}
          _hover={{
            cursor: "pointer",
            bgGradient: "linear(to-b, teal.900, teal.800)",
          }}
          transition="all 0.3s ease-in-out"
          w="100%"
          h="100%"
          p={3}
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
                pb={1.5}
                align="end"
              >
                <Text color="gray.300" textShadow={textShadow}>
                  {FormatDate(entry.id)}
                </Text>
                <EditDeleteButtons />
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
      {/* <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <ModalOverlay
          bg="rgba(0, 0, 0, 0.7)"
          backdropFilter="blur(4px) hue-rotate(10deg)"
        />

        <ModalContent
          bgGradient={darkTealGrad}
          color="gray.100"
          shadow={largeShadow}
        >
          <ModalHeader fontSize="lg" position="relative">
            <VStack
              spacing={0}
              w="100%"
              align="start"
              justify="space-between"
              lineHeight="1.7rem"
            >
              <HStack w="100%" justify="space-between">
                <Text color="teal.300"> {FormatDate(entry.id)}</Text>
                <EditDeleteButtons showClose={true} closeClick={onClose} />
              </HStack>
              <Text color="purple.100">{entry.title}</Text>
            </VStack>
          </ModalHeader>
          <ModalBody>
            <VStack w="100%" spacing={4} align="flex-start">
              <TagsWrap tags={modalTags} />
              <Text>{entry.entry}</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <CustomButton onClick={onClose}>Close</CustomButton>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
}
