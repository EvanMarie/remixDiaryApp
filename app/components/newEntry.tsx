import { Card, FormLabel, Input, Textarea, VStack } from "@chakra-ui/react";
import CustomButton from "./customButton";
import { Form } from "@remix-run/react";
import { InputStyles, radius, shadow } from "~/styles/customTheme";
import CollapsibleStack from "./collapsableStack";

export default function NewEntry() {
  return (
    <Card
      w="98%"
      maxW="900px"
      bg="pink.900"
      shadow={shadow}
      rounded={radius}
      color="gray.100"
      py={6}
    >
      <VStack w="100%" spacing={4}>
        <Form method="post" id="note-form">
          <VStack w="100%" spacing={4}>
            <CollapsibleStack>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                type="text"
                id="title"
                name="title"
                required
                {...InputStyles}
              />
            </CollapsibleStack>
            <CollapsibleStack>
              <FormLabel htmlFor="content">Content</FormLabel>
              <Textarea
                id="content"
                name="content"
                required
                rows={12}
                resize="none"
                {...InputStyles}
              />
            </CollapsibleStack>
            <CustomButton>Add Entry</CustomButton>
          </VStack>
        </Form>
      </VStack>
    </Card>
  );
}
