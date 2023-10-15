import { Flex, Text, VStack } from "@chakra-ui/react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useParams,
} from "@remix-run/react";
import EntriesList from "~/components/entriesList";
import FadeIn from "~/components/fadeIn";
import { getStoredEntries } from "~/data/entries";
// import { getStoredEntries } from "~/data/entries";
import { scrollBarStyles, textShadow } from "~/styles/customTheme";

export async function loader() {
  const entries = await getStoredEntries();
  return entries;
}

export default function Entries() {
  const entries = useLoaderData();
  const location = useLocation();
  const pathname = location.pathname;
  const entryId = useParams().id;
  return (
    <FadeIn>
      {/* {pathname === "/entries" && ( */}
      <Flex
        w="100%"
        justify="center"
        py={{ base: "10px", md: "20px", lg: "30px" }}
        h="92vh"
        overflowY="auto"
        sx={scrollBarStyles}
      >
        <VStack w="100%" spacing={4}>
          <Text fontSize="4xl" fontWeight="bold" textShadow={textShadow}>
            My Diary Entries
          </Text>
          {entries && <EntriesList entries={entries} />}
        </VStack>
      </Flex>
      {/* )} */}
      {pathname === `/entries/${entryId}` && <Outlet />}
    </FadeIn>
  );
}
