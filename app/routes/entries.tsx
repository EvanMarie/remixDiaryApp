import { Flex } from "@chakra-ui/react";
import { Outlet, useLoaderData } from "@remix-run/react";

import EntriesList from "~/components/entriesList";
import ErrorBox from "~/components/errorBox";
import FadeIn from "~/components/fadeIn";
import { Entry, getStoredEntries } from "~/data/entries";
// import { getStoredEntries } from "~/data/entries";
import { scrollBarStyles } from "~/styles/customTheme";

export async function loader() {
  const entries = await getStoredEntries();
  return entries;
}

export default function Entries() {
  const entries = useLoaderData<Entry[]>();
  return (
    <FadeIn>
      <Flex
        w="100%"
        justify="center"
        pt="12px"
        pb={{ base: "10px", md: "30px" }}
        h="100vh"
        overflowY="auto"
        sx={scrollBarStyles}
      >
        <Flex justify="center" w="100%" h="100%" pt="40px">
          {entries && entries.length > 0 ? (
            <EntriesList entries={entries} />
          ) : (
            <ErrorBox
              redirectLink="/entries/newentry"
              buttonMessage="Start Writing!"
            />
          )}
        </Flex>
      </Flex>
      <Outlet />
    </FadeIn>
  );
}
