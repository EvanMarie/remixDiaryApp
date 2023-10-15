import { Center, Text, VStack } from "@chakra-ui/react";
import FadeIn from "./fadeIn";
import { darkPinkGrad, largeShadow } from "~/styles/customTheme";
import CustomButton from "./customButton";
import { RiArrowGoBackLine } from "react-icons/ri/index.js";

interface ErrorBoxProps {
  buttonMessage?: string;
  children?: React.ReactNode;
  redirectLink?: string;
}
export default function ErrorBox({
  buttonMessage,
  redirectLink,
  children,
}: ErrorBoxProps) {
  return (
    <FadeIn>
      <Center w="100%" h="100%">
        <VStack
          p={6}
          bgGradient={darkPinkGrad}
          rounded="xl"
          shadow={largeShadow}
        >
          <Text fontSize="9xl">👀</Text>
          <Text fontSize="2xl">An error has occurred.</Text>
          {children}
          <Text fontSize="2xl">Let's try this again.</Text>
          <CustomButton
            to={redirectLink ? redirectLink : "/entries"}
            size="lg"
            leftIcon={<RiArrowGoBackLine />}
          >
            {buttonMessage ? buttonMessage : "Do-over!"}
          </CustomButton>
        </VStack>
      </Center>
    </FadeIn>
  );
}
