import {
  Box,
  Center,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { DeleteButton } from "~/components/editDeleteButtons";
import { useEscapeBack } from "~/utils/escapeNav";
import FadeIn from "~/components/fadeIn";
import {
  Entry,
  deleteEntryById,
  getStoredEntries,
  storeEntries,
} from "~/data/entries";
import {
  darkTealGrad,
  largeShadow,
  radius,
  scrollBarStyles,
  textShadow,
} from "~/styles/customTheme";
import FormatDate from "~/utils/formatDate";
import { useDetectSafari } from "~/utils/useDetectSafari";
import { json, redirect } from "@remix-run/node";
import { useState } from "react";
import CustomButton from "~/components/customButton";
import InputStack from "~/components/inputStack";
import { AiOutlineClose } from "react-icons/ai/index.js";
import { BiSave } from "react-icons/bi/index.js";
import TagsInput from "~/components/tagsInput";

export async function loader({ params }: { params: { id: string } }) {
  const entries = await getStoredEntries();
  const entryId = params.id;
  const selectedEntry = entries?.find((entry: Entry) => entryId === entry.id);
  if (!selectedEntry) {
    throw json(
      { message: "No entry found" },
      { status: 404, statusText: "No entry found" }
    );
  }
  return selectedEntry;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const rawEntryData = Object.fromEntries(formData);
  const originalId = rawEntryData.oldEntryId;

  if (
    typeof rawEntryData.title !== "string" ||
    typeof rawEntryData.content !== "string"
  ) {
    throw new Error("Title and content must be strings");
  }

  const entryData: Entry = {
    id: new Date().toISOString(),
    tags: [],
    title: rawEntryData.title as string, // assert that it is a string
    entry: rawEntryData.content as string,
    originalDate: rawEntryData.originalDate as string,
    lastUpdated: rawEntryData.lastUpdated as string,
  };

  if (rawEntryData.tags && typeof rawEntryData.tags === "string") {
    entryData.tags = rawEntryData.tags
      .split(", ")
      .map((tag: string) => tag.trim());
  } else {
    entryData.tags = [];
  }
  if (Array.isArray(rawEntryData.tags)) {
    entryData.tags = rawEntryData.tags; // If it's already an array of strings
  } else if (typeof rawEntryData.tags === "string") {
    entryData.tags = rawEntryData.tags.split(", ").map((tag) => tag.trim()); // Your existing logic
  } else {
    entryData.tags = []; // Fallback if no valid tags are provided
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

  try {
    originalId && (await deleteEntryById(originalId as string));
    return redirect("/entries");
  } catch (error) {
    const message = (error as Error).message;
    return json({ status: "error", message }, { status: 500 });
  }
}

export default function EditEntry() {
  useEscapeBack();
  const selectedEntry = useLoaderData<Entry>();
  const navigate = useNavigate();
  const isSafariMobile = useDetectSafari();

  const [entry, setEntry] = useState<Entry>(selectedEntry);

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEntry({ ...entry, title: event.target.value });
  };

  const handleTagsChange = (newTags: string[]) => {
    setEntry({ ...entry, tags: newTags });
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEntry({ ...entry, entry: event.target.value });
  };

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
            {" "}
            <Form method="POST" style={{ width: "100%" }}>
              <VStack fontSize="lg" w="100%" position="relative">
                <Input type="hidden" name="oldEntryId" value={entry.id} />
                <Input
                  type="hidden"
                  name="tags"
                  value={entry.tags.join(", ")}
                />
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
                    <DeleteButton id={selectedEntry ? selectedEntry.id : ""} />
                  </HStack>

                  <Box w="100%" py={2}>
                    <InputStack
                      label="Title"
                      id="title"
                      name="title"
                      defaultValue={entry.title}
                      onChange={handleTitleChange}
                    />
                  </Box>
                </VStack>

                <Flex w="100%">
                  <VStack w="100%" spacing={4} align="flex-start">
                    <TagsInput
                      tags={entry.tags}
                      onTagsChange={handleTagsChange}
                    />
                    <Box
                      w="100%"
                      px={2}
                      maxH={
                        isSafariMobile
                          ? "525px"
                          : { base: "700px", sm: "500px" }
                      }
                      overflowY="auto"
                      sx={scrollBarStyles}
                    >
                      <InputStack
                        label="Entry"
                        id="content"
                        name="content"
                        defaultValue={entry.entry}
                        onChange={handleContentChange}
                        isTextarea={true}
                        textAreaHeight={{ base: "340px", sm: "425px" }}
                      />
                    </Box>
                    <HStack w="100%" justify="end">
                      <CustomButton type="submit" leftIcon={<BiSave />}>
                        Save Changes
                      </CustomButton>
                      <CustomButton
                        onClick={() => navigate(-1)}
                        leftIcon={<AiOutlineClose />}
                      >
                        Cancel
                      </CustomButton>
                    </HStack>
                  </VStack>
                </Flex>
              </VStack>
            </Form>
          </VStack>
        </Flex>
      </FadeIn>
    </Center>
  );
}
