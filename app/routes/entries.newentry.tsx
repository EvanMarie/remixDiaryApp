// NewEntry.tsx
import React, { useState } from "react";
import {
  Card,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Flex,
  HStack,
  Center,
  Box,
} from "@chakra-ui/react";
import CustomButton from "../components/customButton";
import { Form, useNavigate } from "@remix-run/react";
import {
  InputStyles,
  darkPinkGrad,
  radius,
  scrollBarStyles,
  shadow,
} from "~/styles/customTheme";
import CollapsibleStack from "../components/collapsableStack";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai/index.js";
import TagsInput from "~/components/tagsInput"; // adjust the import path as necessary
import { Entry, getStoredEntries, storeEntries } from "~/data/entries";
import { redirect } from "@remix-run/node";
import FadeIn from "~/components/fadeIn";
import { useEscapeBack } from "~/components/escapeNav";
import { BackButton } from "~/components/editDeleteButtons";

interface NewEntryProps {}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const rawEntryData = Object.fromEntries(formData);

  // Check if title and content are strings and not File objects
  if (
    typeof rawEntryData.title !== "string" ||
    typeof rawEntryData.content !== "string"
  ) {
    throw new Error("Title and content must be strings");
  }

  const entryData: Entry = {
    id: new Date().toISOString(), // set the ID here
    tags: [],
    title: rawEntryData.title, // TypeScript now knows this is a string
    entry: rawEntryData.content, // TypeScript now knows this is a string
  };

  if (rawEntryData.tags && typeof rawEntryData.tags === "string") {
    entryData.tags = rawEntryData.tags
      .split(", ")
      .map((tag: string) => tag.trim());
  } else {
    entryData.tags = [];
  }

  const existingEntries = await getStoredEntries();
  const updatedEntries = existingEntries.concat(entryData);
  await storeEntries(updatedEntries);
  return redirect("/entries");
}

const NewEntry: React.FC<NewEntryProps> = () => {
  const [enteredTags, setEnteredTags] = useState<string[]>([]);

  const handleTagsChange = (newTags: string[]) => {
    setEnteredTags(newTags);
  };

  const handleClear = () => {
    setEnteredTags([]); // this clears the tags
  };

  useEscapeBack();
  const navigate = useNavigate();

  return (
    <Center
      w="100vw"
      h="100vh"
      position="absolute"
      top="0"
      right="0"
      bg="rgba(0, 0, 0, 0.5)"
      backdropFilter="blur(4px) hue-rotate(10deg)"
      zIndex="1"
    >
      <FadeIn onClick={() => navigate(-1)}>
        <Flex
          w="100%"
          justify="center"
          py={{ base: "10px", md: "20px", lg: "30px" }}
          h="92vh"
          overflowY="auto"
          sx={scrollBarStyles}
        >
          <Card
            w="95%"
            maxW="900px"
            h="fit-content"
            bgGradient={darkPinkGrad}
            shadow={shadow}
            rounded={radius}
            color="gray.100"
            onClick={(e) => e.stopPropagation()}
            pt="60px"
            pb="20px"
          >
            <VStack w="100%" spacing={4} maxW="800px" alignSelf="center">
              <Form
                method="post"
                id="note-form"
                // onSubmit={handleSubmit}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <VStack w="90%" spacing={6}>
                  <Box position="absolute" top="10px" right="10px">
                    <BackButton backClick={() => navigate(-1)} />
                  </Box>
                  <CollapsibleStack>
                    <FormLabel htmlFor="title" fontSize="xl" alignSelf="start">
                      Title
                    </FormLabel>
                    <Flex w="100%" justify="end">
                      <Input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Entry Title"
                        required
                        sx={InputStyles}
                      />
                    </Flex>
                  </CollapsibleStack>
                  <CollapsibleStack>
                    <FormLabel htmlFor="tags" fontSize="xl" alignSelf="start">
                      Tags
                    </FormLabel>
                    <TagsInput
                      onTagsChange={handleTagsChange}
                      tags={enteredTags}
                    />
                  </CollapsibleStack>
                  <CollapsibleStack>
                    <FormLabel
                      htmlFor="content"
                      fontSize="xl"
                      alignSelf="start"
                    >
                      Entry
                    </FormLabel>
                    <Flex w="100%" justify="end">
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Diary Entry"
                        required
                        rows={15}
                        resize="none"
                        overflowY="auto"
                        sx={{
                          ...scrollBarStyles,
                          ...InputStyles,
                        }}
                      />
                    </Flex>
                  </CollapsibleStack>
                  <Input
                    type="hidden"
                    name="tags"
                    value={enteredTags.join(", ")} // convert tags array to comma-separated string
                  />
                  <HStack spacing={5} w="100%" justify="center">
                    <CustomButton type="submit" leftIcon={<AiOutlineCheck />}>
                      Add Entry
                    </CustomButton>
                    <CustomButton
                      onClick={handleClear}
                      leftIcon={<AiOutlineClose />}
                    >
                      Clear
                    </CustomButton>
                    <CustomButton
                      onClick={() => navigate(-1)}
                      leftIcon={<AiOutlineClose />}
                    >
                      Cancel
                    </CustomButton>
                  </HStack>
                </VStack>
              </Form>
            </VStack>
          </Card>
        </Flex>
      </FadeIn>
    </Center>
  );
};

export default NewEntry;
