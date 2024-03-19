import prisma from '$lib/prisma';
import fs from 'fs/promises';
import path from 'path';
import { redirect, fail } from '@sveltejs/kit';
import sharp from 'sharp';

export const actions = {
  avatar: async ({ request, locals }) => {
    if (!locals.user) {
      return fail(403, 'Unauthorized');
    }

    try {
      const data = Object.fromEntries(await request.formData());
      const fileName = `${crypto.randomUUID()}.webp`;
      const filePath = path.join(process.cwd(), 'storage', fileName);
      const output = sharp(Buffer.from(await data.file.arrayBuffer())).webp();
      await fs.writeFile(filePath, output);

      await prisma.user.update({
        where: { id: locals.user.id },
        data: { avatar: fileName }
      });
      // TODO: store the file path in database for further references.
    } catch (err) {
      console.log('err', err);
      return fail(500, { err: err });
    }
    redirect(303, '/settings');
  }
};
