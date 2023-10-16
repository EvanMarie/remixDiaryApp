import { ActionFunction, json, redirect } from "@remix-run/node";

export let action: ActionFunction = async ({ request }) => {
  // Extract the entry ID from the request (e.g., from the URL or body)
  const formData = await request.formData();
  const id = formData.get("id");

  try {
    id && (await deleteEntryById(id as string));
    return redirect("/entries");
  } catch (error) {
    const message = (error as Error).message;
    return json({ status: "error", message }, { status: 500 });
  }
};
