import { promises as fs } from 'fs';
import path from 'path';
import prisma from '$lib/prisma';
import { json, fail } from '@sveltejs/kit';

export async function GET({ params: { filename }, locals }) {
  if (!locals.user) {
    return fail(403, 'Unauthorized');
  }

  const attachment = await prisma.attachment.findFirst({
    where: { url: filename }
  });

  if (attachment) {
    const filePath = path.join(process.cwd(), 'storage', filename);
    const asset = await fs.readFile(filePath);

    return new Response(asset);
  }
}

export async function DELETE({ params: { filename }, locals }) {
  if (!locals.user) {
    return fail(403, 'Unauthorized');
  }

  const attachment = await prisma.attachment.delete({
    where: { id: filename },
    include: {
      user: {
        where: { id: locals.user.id }
      }
    }
  });

  if (attachment) {
    const filePath = path.join(process.cwd(), 'storage', attachment.url);
    await fs.unlink(filePath);
  }

  return json({ success: true });
}
