import fs from 'fs/promises';
import path from 'path';
import prisma from '$lib/prisma';
import { json, fail } from '@sveltejs/kit';

export async function POST({ locals, request }) {
  if (!locals.user) {
    return fail(403, 'Unauthorized');
  }

  const formData = await request.formData();
  const cardId = formData.get('cardId');
  const file = formData.get('file');
  const fileName = `${crypto.randomUUID()}.${file.name}`;
  const filePath = path.join(process.cwd(), 'storage', fileName);

  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
  await prisma.attachment.create({
    data: {
      filename: file.name,
      type: file.type,
      url: fileName,
      user: { connect: { id: locals.user.id } },
      card: { connect: { id: cardId } }
    }
  });

  return json(file);
}
