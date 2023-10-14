import fs from 'fs/promises';

export type Entry = {
  id: string;
    title: string;
    tags: string[];
    entry: string;
    };

export async function getStoredEntries() {
  const rawFileContent = await fs.readFile('entries.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.entries ?? [];
  return storedNotes;
}

export function storeEntries(entries: Entry[]) {
  return fs.writeFile('entries.json', JSON.stringify({ entries: entries || [] }));
}