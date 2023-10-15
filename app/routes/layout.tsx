import { Outlet } from "@remix-run/react";
import { getStoredEntries } from "~/data/entries";

export async function loader() {
  const entries = await getStoredEntries();
  return entries;
}

export default function Layout() {
  return <Outlet />;
}
