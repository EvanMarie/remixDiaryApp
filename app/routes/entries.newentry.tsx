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
import {
  Form,
  // useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
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
import { useEscapeBack } from "~/utils/escapeNav";
import { BackButton } from "~/components/editDeleteButtons";
import InputStack from "~/components/inputStack";

interface NewEntryProps {}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const rawEntryData = Object.fromEntries(formData);

  // Create a current timestamp for this new entry
  const currentTimestamp = new Date().toISOString();

  const entryData: Entry = {
    id: currentTimestamp, // the ID is the creation timestamp, which ensures uniqueness and chronological order
    tags: [],
    title: rawEntryData.title as string, // assert that it is a string
    entry: rawEntryData.content as string,
    originalDate: currentTimestamp, // set the originalDate as the current timestamp
    lastUpdated: currentTimestamp, // since this is a new entry, lastUpdated is the same as the originalDate
  };

  if (rawEntryData.tags && typeof rawEntryData.tags === "string") {
    entryData.tags = rawEntryData.tags
      .split(", ")
      .map((tag: string) => tag.trim());
  } else {
    entryData.tags = [];
  }

  // validation based on title length / existence
  if (entryData.title.trim().length < 5) {
    console.log("title too short");
    return { message: "Title must be at least 5 characters long" };
  }

  const existingEntries = await getStoredEntries();
  // const updatedEntries = existingEntries.concat(entryData);
  // Adds the new entry at the beginning of the array
  existingEntries.unshift(entryData);
  await storeEntries(existingEntries);

  await new Promise<void>((resolve, reject) =>
    setTimeout(() => resolve(), 500)
  );
  return redirect("/entries");
}

// interface ActionData {
//   message?: string;
// }

const NewEntry: React.FC<NewEntryProps> = () => {
  const [enteredTags, setEnteredTags] = useState<string[]>([]);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  // to implement validation for title length with Action Data instead of in the component
  // const data = useActionData() as ActionData | undefined;
  const handleTagsChange = (newTags: string[]) => {
    setEnteredTags(newTags);
  };

  const handleClear = () => {
    setEnteredTags([]); // this clears the tags
  };

  useEscapeBack();
  const navigate = useNavigate();
  const labelSizes = { base: "md", sm: "lg" };

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
          onClick={() => navigate(-1)}
          py={{ base: "10px", md: "20px", lg: "30px" }}
        >
          <Card
            w={{ base: "100vw", md: "95%" }}
            h={{ base: "100vh", md: "fit-content" }}
            maxW="800px"
            maxH={{ base: "100vh", md: "90vh" }}
            overflowY="hidden"
            bgGradient={darkPinkGrad}
            shadow={shadow}
            rounded={radius}
            color="gray.100"
            onClick={(e) => e.stopPropagation()}
            pt={{ base: "100px", md: "60px" }}
            pb="20px"
          >
            <Flex w="100%" maxW="800px" alignSelf="center">
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
                <VStack w="90%" spacing={{ base: 3, md: 6 }}>
                  <Box
                    position="absolute"
                    top={{ base: "60px", md: "10px" }}
                    right="10px"
                  >
                    <BackButton backClick={() => navigate(-1)} />
                  </Box>

                  <InputStack
                    label="Title"
                    id="title"
                    name="title"
                    placeholder="Entry Title"
                    required
                    minLength={5}
                  />
                  {/* to implement validation for title length with Action Data instead of in the component
                  {data && data.message ? <p>{data.message}</p> : null} */}

                  <CollapsibleStack>
                    <FormLabel
                      htmlFor="tags"
                      fontSize={labelSizes}
                      alignSelf="start"
                      lineHeight={{ base: "1rem", sm: "auto" }}
                    >
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
                      fontSize={labelSizes}
                      alignSelf="start"
                      lineHeight={{ base: "1rem", sm: "auto" }}
                    >
                      Entry
                    </FormLabel>
                    <Flex w="100%" justify="end">
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Diary Entry"
                        required
                        h={{ base: "300px", sm: "425px" }}
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
                    value={enteredTags.join(", ")}
                  />
                  <HStack spacing={5} w="100%" justify="center">
                    <CustomButton
                      type="submit"
                      disabled={isSubmitting}
                      leftIcon={<AiOutlineCheck />}
                    >
                      {isSubmitting ? "Adding..." : "Add Entry"}
                    </CustomButton>
                    <CustomButton
                      onClick={handleClear}
                      disabled={isSubmitting}
                      leftIcon={<AiOutlineClose />}
                    >
                      Clear
                    </CustomButton>
                    <CustomButton
                      onClick={() => navigate(-1)}
                      disabled={isSubmitting}
                      leftIcon={<AiOutlineClose />}
                    >
                      Cancel
                    </CustomButton>
                  </HStack>
                </VStack>
              </Form>
            </Flex>
          </Card>
        </Flex>
      </FadeIn>
    </Center>
  );
};

export default NewEntry;
