import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import {
  DarkGrayFlex,
  DarkPinkFlex,
  DarkPurpleFlex,
  DarkTealFlex,
  LightPurpleFlex,
  LightTealFlex,
} from "~/components/basicContainers";
import CustomButton from "~/components/customButton";
import CustomIconButton from "~/components/customIconButton";
import { scrollBarStyles } from "~/styles/customTheme";
import { FaReact } from "react-icons/fa/index.js";

export default function Setup() {
  return (
    <Flex
      w="100%"
      h="100vh"
      overflowY="auto"
      sx={scrollBarStyles}
      justify="center"
    >
      <VStack spacing={6} w="100%">
        <Box fontSize="4xl" fontWeight="bold">
          Diary Project
        </Box>
        <HStack spacing={5}>
          <CustomButton to="/">Home</CustomButton>
          <CustomButton to="/entries">My Diary Entries</CustomButton>
        </HStack>
        <HStack w="90%" align="flex-start">
          <VStack w="25%" spacing={3}>
            <Text fontSize="2xl" borderBottom="1px solid">
              Font Sizes
            </Text>
            <VStack spacing={0}>
              <Text fontSize="xxs">xxs</Text>
              <Text fontSize="xs">xs</Text>
              <Text fontSize="sm">sm</Text>
              <Text fontSize="md">md</Text>
              <Text fontSize="lg">lg</Text>
              <Text fontSize="xl">xl</Text>
              <Text fontSize="2xl">2xl</Text>
              <Text fontSize="3xl">3xl</Text>
              <Text fontSize="4xl">4xl</Text>
              <Text fontSize="5xl">5xl</Text>
              <Text fontSize="6xl">6xl</Text>
              <Text fontSize="7xl">7xl</Text>
              <Text fontSize="8xl">8xl</Text>
              <Text fontSize="9xl">9xl</Text>
            </VStack>
          </VStack>
          <VStack w="25%" spacing={3}>
            <Text fontSize="2xl" borderBottom="1px solid">
              Color Scheme
            </Text>{" "}
            <VStack spacing={0}>
              <Text fontSize="xl">DARKS</Text>
              <Text>(current background is gray.900)</Text>
              <Text color="gray.700">gray.700</Text>
              <Text color="teal.800">teal.800</Text>
              <Text color="pink.900">pink.900</Text>
              <Text color="purple.900">purple.900</Text>
              <Text fontSize="xl">MEDIUMS</Text>
              <Text color="teal.600">teal.700</Text>
              <Text color="pink.600">pink.700</Text>
              <Text color="purple.700">purple.700</Text>
              <Text fontSize="xl">LIGHTS</Text>
              <Text color="gray.400">gray.400</Text>
              <Text color="purple.200">purple.200</Text>
              <Text color="teal.300">teal.300</Text>
              <Text color="teal.100">teal.100</Text>
            </VStack>
          </VStack>
          <VStack w="25%" spacing={3}>
            <Text fontSize="2xl" borderBottom="1px solid">
              Containers
            </Text>
            <VStack spacing={1} w="100%">
              <DarkGrayFlex p={4}>DarkGrayFlex</DarkGrayFlex>
              <DarkPurpleFlex p={4}>DarkPurpleFlex</DarkPurpleFlex>
              <DarkPinkFlex p={4}>DarkPinkFlex</DarkPinkFlex>
              <DarkTealFlex p={4}>DarkTealFlex</DarkTealFlex>
              <LightTealFlex p={4}>LightTealFlex</LightTealFlex>
              <LightPurpleFlex p={4}>LightPurpleFlex</LightPurpleFlex>
              <Text>(Boxes for each of these also exist)</Text>
            </VStack>
          </VStack>
          <VStack w="25%" spacing={3}>
            <Text fontSize="2xl" borderBottom="1px solid">
              Components
            </Text>
            <VStack spacing={1} w="100%">
              <CustomButton>CustomButton</CustomButton>
              <CustomIconButton aria-label="exmple button" icon={<FaReact />} />
              <Text>(CustomIconButton)</Text>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </Flex>
  );
}
