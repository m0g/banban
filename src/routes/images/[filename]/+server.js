import { promises as fs } from 'fs';
import path from 'path';

export async function GET({ params: { filename } }) {
  const filePath = path.join(process.cwd(), 'storage', filename);
  const asset = await fs.readFile(filePath);

  return new Response(asset);
}
