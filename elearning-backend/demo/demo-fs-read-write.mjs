import {readFile, writeFile} from 'node:fs/promises';
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, 'data.txt')

const content = await readFile(dataFile, 'utf-8');
await writeFile(path.join(__dirname, 'copy.txt'), content.toUpperCase());

console.log({
  __filename,
  __dirname,
  dataFile,
  content,
});