import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    let name = data.get('name');
    let cardId = data.get('cardId');

    if (!name || !cardId) {
      return fail(400, { name, cardId, missing: true });
    }

    if (typeof name != 'string' || typeof cardId != 'string') {
      return fail(400, { incorrect: true });
    }

    await prisma.checkList.create({
      data: {
        name,
        card: { connect: { id: cardId } }
      }
    });

    throw redirect(303, `/cards/${cardId}`);
  }
};
