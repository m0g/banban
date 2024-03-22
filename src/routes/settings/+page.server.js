import prisma from '$lib/prisma';
import fs from 'fs/promises';
import path from 'path';
import { redirect, fail } from '@sveltejs/kit';
import sharp from 'sharp';

export const actions = {
  name: async ({ request, locals }) => {
    if (!locals.user) {
      return fail(403, 'Unauthorized');
    }

    const data = await request.formData();
    let name = data.get('name');

    if (!name) {
      return fail(400, { name, missing: true });
    }

    if (typeof name != 'string') {
      return fail(400, { incorrect: true });
    }

    await prisma.user.update({
      where: { id: locals.user.id },
      data: { name }
    });
  },

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
      return fail(500, { err: err });
    }
    redirect(303, '/settings');
  }
};
