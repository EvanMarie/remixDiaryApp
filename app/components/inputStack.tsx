import React, { useState } from "react";
import { Flex, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import CollapsibleStack from "./collapsableStack";
import { InputStyles } from "~/styles/customTheme";

interface InputStackProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  required: boolean;
  minLength?: number; // Optional prop for minimum length
}

export default function InputStack({
  label,
  id,
  name,
  placeholder,
  required,
  minLength,
}: InputStackProps) {
  const [inputValue, setInputValue] = useState("");

  // Handler for input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          <Input
            type="text"
            id={id}
            name={name}
            placeholder={placeholder}
            required={required}
            value={inputValue}
            onChange={handleInputChange}
            sx={InputStyles}
          />
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
