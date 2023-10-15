import { Center, Text, VStack } from "@chakra-ui/react";
import { RiArrowGoBackLine } from "react-icons/ri/index.js";
import CustomButton from "~/components/customButton";
import FadeIn from "~/components/fadeIn";
import { darkPinkGrad, largeShadow } from "~/styles/customTheme";

export default function Oops() {
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
          <Text fontSize="2xl">This was most unexpected.</Text>
          <Text fontSize="2xl">Let's try this again.</Text>
          <CustomButton
            to="/entries"
            size="lg"
            leftIcon={<RiArrowGoBackLine />}
          >
            Click for a do-over!
          </CustomButton>
        </VStack>
      </Center>
    </FadeIn>
  );
}
