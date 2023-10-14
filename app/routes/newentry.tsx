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
} from "@chakra-ui/react";
import CustomButton from "../components/customButton";
import { Form } from "@remix-run/react";
import {
  InputStyles,
  radius,
  scrollBarStyles,
  shadow,
} from "~/styles/customTheme";
import CollapsibleStack from "../components/collapsableStack";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai/index.js";
import TagsInput from "~/components/tagsInput"; // adjust the import path as necessary
import { Entry, getStoredEntries, storeEntries } from "~/data/entries";
import { redirect } from "@remix-run/node";

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

  console.log(
    "title: ",
    entryData.title,
    " |  tags: ",
    entryData.tags,
    " |  content: ",
    entryData.entry
  );

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

  return (
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
        bg="pink.900"
        shadow={shadow}
        rounded={radius}
        color="gray.100"
        py={6}
      >
        <VStack w="100%" spacing={4} maxW="800px" alignSelf="center">
          <Form
            method="post"
            id="note-form"
            // onSubmit={handleSubmit}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <VStack w="90%" spacing={4}>
              <CollapsibleStack>
                <FormLabel htmlFor="title" fontSize="xl" alignSelf="flex-start">
                  Title
                </FormLabel>
                <Flex w="100%" justify="flex-end">
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
                <FormLabel htmlFor="tags" fontSize="xl" alignSelf="flex-start">
                  Tags
                </FormLabel>
                <TagsInput
                  onTagsChange={handleTagsChange}
                  tags={enteredTags} // Pass the enteredTags state to TagsInput
                />
              </CollapsibleStack>
              <CollapsibleStack>
                <FormLabel
                  htmlFor="content"
                  fontSize="xl"
                  alignSelf="flex-start"
                >
                  Entry
                </FormLabel>
                <Flex w="100%" justify="flex-end">
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Diary Entry"
                    required
                    rows={16}
                    resize="none"
                    sx={InputStyles}
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
              </HStack>
            </VStack>
          </Form>
        </VStack>
      </Card>
    </Flex>
  );
};

export default NewEntry;
