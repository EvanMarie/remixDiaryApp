import fs from 'fs/promises';

export type Entry = {
  id: string;
  title: string;
  tags: string[];
  entry: string;
  originalDate: string;
  lastUpdated: string;
};

export async function getStoredEntries() {
  const rawFileContent = await fs.readFile('entries.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedEntries = data.entries ?? [];
  return storedEntries;
}

export function storeEntries(entries: Entry[]) {
  return fs.writeFile('entries.json', JSON.stringify({ entries: entries || [] }));
}


export async function deleteEntryById(id: string) {
  console.log('Deleting entry with ID:', id);
  try {
    // Read the current entries
    const storedEntries = await getStoredEntries();

    // Find the index of the entry with the specified ID
    const entryIndex = storedEntries.findIndex((entry: Entry) => entry.id === id);

    // If the entry wasn't found, throw an error or handle it as needed
    if (entryIndex === -1) {
      throw new Error(`Entry with ID ${id} not found.`);
    }
    // Remove the entry from the array
    storedEntries.splice(entryIndex, 1);
    // Write the updated entries back to the file
    await storeEntries(storedEntries);
  } catch (error) {
    // Handle error (e.g., log it, or rethrow it to be caught by caller)
    console.error('An error occurred during the delete operation:', error);
    throw error; // Rethrow if you want the caller to handle the error
  }
}
