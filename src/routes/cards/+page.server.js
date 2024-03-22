import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  // Create a card
  default: async ({ request, locals }) => {
    if (!locals.user) {
      return fail(403, 'Unauthorized');
    }

    const data = await request.formData();
    let name = data.get('name');
    let listId = data.get('listId');
    let boardId = data.get('boardId');
    let pos = parseInt(data.get('pos'));

    if (!name || !listId || !boardId) {
      return fail(400, { name, listId, boardId, missing: true });
    }

    if (typeof name != 'string' || typeof listId != 'string' || typeof boardId != 'string') {
      return fail(400, { incorrect: true });
    }

    const card = await prisma.card.create({
      data: {
        name,
        pos,
        list: { connect: { id: listId } },
        board: { connect: { id: boardId } },
        user: { connect: { id: locals.user.id } }
      }
    });

    await prisma.action.create({
      data: {
        type: 'createCard',
        card: { connect: { id: card.id } },
        user: { connect: { id: locals.user.id } }
      }
    });

    throw redirect(303, `/boards/${boardId}`);
  }
};
