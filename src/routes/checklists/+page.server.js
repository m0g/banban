import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) {
      return fail(403, 'Unauthorized');
    }

    const data = await request.formData();
    let name = data.get('name');
    let cardId = data.get('cardId');

    if (!name || !cardId) {
      return fail(400, { name, cardId, missing: true });
    }

    if (typeof name != 'string' || typeof cardId != 'string') {
      return fail(400, { incorrect: true });
    }

    const checklist = await prisma.checkList.create({
      data: {
        name,
        card: { connect: { id: cardId } }
      }
    });

    // TODO: add action
    if (checklist) {
      const res = await prisma.action.create({
        data: {
          type: 'addCheckListToCard',
          checkList: { connect: { id: checklist.id } },
          card: { connect: { id: cardId } },
          user: { connect: { id: locals.user.id } }
        }
      });
      console.log(res);
    }

    throw redirect(303, `/cards/${cardId}`);
  }
};
