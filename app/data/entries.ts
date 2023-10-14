import fs from 'fs/promises';

export type Entry = {
    title: string;
    tags: string[];
    entry: string;
    };

export async function getStoredEntries() {
  const rawFileContent = await fs.readFile('notes.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

export function storeEntries(entries: Entry) {
  return fs.writeFile('notes.json', JSON.stringify({ entries: entries || [] }));
}