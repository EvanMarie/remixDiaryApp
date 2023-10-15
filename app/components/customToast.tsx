import { useToast } from "@chakra-ui/react";

export default function CustomToast(message: string) {
  const toast = useToast();
  return toast({
    variant: "subtle",
    title: `${message}`,
    isClosable: true,
  });
}
