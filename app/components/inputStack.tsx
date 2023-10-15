import React, { useState } from "react";
import {
  Flex,
  FormLabel,
  Input,
  Text,
  VStack,
  Textarea,
} from "@chakra-ui/react"; // 1. Import Textarea
import CollapsibleStack from "./collapsableStack";
import { InputStyles, scrollBarStyles } from "~/styles/customTheme";

interface InputStackProps {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  defaultValue?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isTextarea?: boolean;
  textAreaHeight?: string | object;
}

export default function InputStack({
  label,
  id,
  name,
  placeholder,
  minLength,
  required,
  defaultValue,
  onChange,
  isTextarea = false,
  textAreaHeight,
}: InputStackProps) {
  const [inputValue, setInputValue] = useState("");

  // Handler for input change
  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // Adjust the type here
    setInputValue(event.target.value);
  };

  // Determine if the validation message should be shown
  const showValidationMessage =
    minLength !== undefined && inputValue.length < minLength;

  return (
    <CollapsibleStack>
      <FormLabel
        htmlFor={id}
        fontSize={{ base: "md", sm: "lg" }}
        alignSelf="start"
        lineHeight={{ base: "1rem", sm: "auto" }}
      >
        {label}
      </FormLabel>
      <Flex w="100%" justify="end" direction="column">
        <VStack w="100%" spacing={0} align="end">
          {isTextarea ? (
            <Textarea
              id={id}
              name={name}
              placeholder={placeholder ? placeholder : label}
              required={required ? required : false}
              value={defaultValue || inputValue} // 3. Consistency adjustment
              onChange={onChange ? onChange : handleInputChange}
              h={textAreaHeight ? textAreaHeight : "200px"}
              resize="none"
              overflowY="auto"
              sx={{
                ...scrollBarStyles,
                ...InputStyles,
              }}
            />
          ) : (
            <Input
              type="text"
              id={id}
              name={name}
              placeholder={placeholder ? placeholder : label}
              required={required ? required : false}
              value={defaultValue || inputValue} // 3. Consistency adjustment
              sx={InputStyles}
              onChange={onChange ? onChange : handleInputChange}
            />
          )}
          {showValidationMessage && (
            <Flex w="100%" justify="start" maxW="600px">
              <Text color="cyan" fontSize="sm">
                {`Please use at least ${minLength} characters for this field.`}
              </Text>
            </Flex>
          )}
        </VStack>
      </Flex>
    </CollapsibleStack>
  );
}
