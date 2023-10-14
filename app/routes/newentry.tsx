// NewEntry.tsx
import React, { useState, FormEvent } from "react";
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
import { InputStyles, radius, shadow } from "~/styles/customTheme";
import CollapsibleStack from "../components/collapsableStack";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai/index.js";
import TagsInput from "~/components/tagsInput"; // adjust the import path as necessary

interface NewEntryProps {
  // define any props here if needed, e.g., a prop for handling form submission
}

const NewEntry: React.FC<NewEntryProps> = () => {
  const [enteredTags, setEnteredTags] = useState<string[]>([]);

  const handleTagsChange = (newTags: string[]) => {
    setEnteredTags(newTags);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Convert tags array to string
    const tagsString = enteredTags.join(", ");
    // Here, you would typically handle your form submission,
    // for example, making an API call.
    console.log("Submitted tags:", tagsString);
    // ... rest of your submission logic ...
  };

  const handleClear = () => {
    setEnteredTags([]); // this clears the tags
  };

  return (
    <Flex w="100%" justify="center" pt="20px">
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
        <VStack w="100%" spacing={4}>
          <Form
            method="post"
            id="note-form"
            onSubmit={handleSubmit} // Make sure to handle the submit event
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <VStack w="90%" spacing={4}>
              <CollapsibleStack>
                <FormLabel htmlFor="title" fontSize="xl">
                  Title
                </FormLabel>
                <Flex w="100%" justify="flex-end">
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    required
                    sx={InputStyles}
                  />
                </Flex>
              </CollapsibleStack>
              <CollapsibleStack>
                <FormLabel htmlFor="tags" fontSize="xl">
                  Tags
                </FormLabel>
                <TagsInput
                  onTagsChange={handleTagsChange}
                  tags={enteredTags} // Pass the enteredTags state to TagsInput
                />
              </CollapsibleStack>
              <CollapsibleStack>
                <FormLabel htmlFor="content" fontSize="xl">
                  Entry
                </FormLabel>
                <Flex w="100%" justify="flex-end">
                  <Textarea
                    id="content"
                    name="content"
                    required
                    rows={16}
                    resize="none"
                    sx={InputStyles}
                  />
                </Flex>
              </CollapsibleStack>
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
