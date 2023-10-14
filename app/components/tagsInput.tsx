// TagsInput.tsx
import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import {
  HStack,
  Input,
  Badge,
  IconButton,
  VStack,
  Wrap,
  Text,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai/index.js";
import { InputStyles, radius, shadow } from "~/styles/customTheme";

interface TagsInputProps {
  onTagsChange: (tags: string[]) => void;
  tags: string[]; // new prop for externally controlled tags
}

const TagsInput: React.FC<TagsInputProps> = ({ onTagsChange, tags }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [localTags, setLocalTags] = useState<string[]>(tags); // initialize with external tags

  // Effect to sync external tags with local state
  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Check if the 'Enter' key was pressed
    if (event.key === "Enter") {
      // Prevent the default action to stop the form from being submitted
      event.preventDefault();

      // Only proceed if there's text entered (not just whitespace)
      if (inputValue.trim()) {
        // Check if the tag is not already included
        if (!localTags.includes(inputValue)) {
          const newTags = [...localTags, inputValue];
          setLocalTags(newTags);
          onTagsChange(newTags); // send the new tags back to the parent component
        }
        // Clear the input field
        setInputValue("");
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = localTags.filter((_, idx) => idx !== index);
    setLocalTags(newTags);
    onTagsChange(newTags); // communicate changes up to parent component
  };

  return (
    <VStack
      w="100%"
      align="flex-end"
      p={2}
      rounded={radius}
      bg="gray.700"
      color="gray.50"
      shadow={shadow}
      border="1px solid"
      borderColor="gray.600"
      maxW="600px"
    >
      <Input
        value={inputValue}
        placeholder="Add tag & press enter"
        onKeyDown={handleInputKeyDown}
        onChange={handleInputChange}
        sx={InputStyles}
      />

      <Wrap spacing={4} justify="flex-end">
        {localTags.length === 0 && (
          <Flex w="100%" justify="flex-start">
            <Text color="gray.400" fontSize="1.2rem">
              No tags added yet
            </Text>
          </Flex>
        )}
        {localTags.map((tag, index) => (
          <Badge
            key={index}
            bg="purple.200"
            fontSize="1.2rem"
            fontWeight="600"
            borderRadius="lg"
            px={1}
            pl={2}
            textTransform="lowercase"
          >
            <HStack w="100%" justify="space-between">
              <Text>{tag}</Text>
              <Tooltip label={`Remove tag: "${tag}"`} bg="gray.600">
                <IconButton
                  icon={<AiOutlineClose />}
                  size="xs"
                  display="flex"
                  justifyContent="flex-end"
                  aria-label={`Remove tag ${tag}`}
                  onClick={() => removeTag(index)}
                  variant="unstyled"
                />
              </Tooltip>
            </HStack>
          </Badge>
        ))}
      </Wrap>
    </VStack>
  );
};

export default TagsInput;
