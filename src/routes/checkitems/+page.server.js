import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) {
      return fail(403, 'Unauthorized');
    }

    const data = await request.formData();
    const name = data.get('name');
    const state = data.get('state');
    const checkListId = data.get('checkListId');
    const cardId = data.get('cardId');

    if (!name || !checkListId) {
      return fail(400, { name, checkListId, missing: true });
    }

    if (typeof name != 'string' || typeof checkListId != 'string') {
      return fail(400, { incorrect: true });
    }

    await prisma.checkItem.create({
      data: {
        name,
        state,
        checkList: { connect: { id: checkListId } }
      }
    });

    throw redirect(303, `/cards/${cardId}`);
  }
};
