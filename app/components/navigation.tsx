import { Flex, HStack, Text } from "@chakra-ui/react";
import CustomButton from "./customButton";
import { BsJournalPlus } from "react-icons/bs/index.js";
import { IoDocumentsOutline } from "react-icons/io5/index.js";
import { TfiThought } from "react-icons/tfi/index.js";
import { darkGrayGrad, largeShadow } from "~/styles/customTheme";
import { useNavigate } from "@remix-run/react";
import { useWindowWidth } from "~/utils/useWindowWidth";
import CustomIconButton from "./customIconButton";

export default function Navigation() {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth && windowWidth < 768;

  return (
    <Flex
      position="fixed"
      h="50px"
      zIndex="100"
      bgGradient={darkGrayGrad}
      shadow={largeShadow}
      w="100%"
      justify="center"
      align="center"
    >
      <HStack
        w="100%"
        maxW="1300px"
        justify="space-between"
        px={{ base: 2, sm: 3 }}
      >
        <HStack
          spacing={3}
          _hover={{ cursor: "pointer" }}
          onClick={() => navigate("/entries")}
          color="purple.200"
        >
          <TfiThought size="30px" />
          <Text fontSize={{ base: "xl", sm: "2xl" }} fontWeight="bold">
            {" "}
            My Thoughts
          </Text>
        </HStack>
        {isMobile ? (
          <HStack>
            <CustomIconButton
              icon={<IoDocumentsOutline />}
              aria-label="entries"
            />

            <CustomIconButton icon={<BsJournalPlus />} aria-label="new entry" />
          </HStack>
        ) : (
          <HStack>
            <CustomButton to="/entries" leftIcon={<IoDocumentsOutline />}>
              Entries
            </CustomButton>
            <CustomButton to="/entries/newentry" leftIcon={<BsJournalPlus />}>
              New
            </CustomButton>
          </HStack>
        )}
      </HStack>
    </Flex>
  );
}
