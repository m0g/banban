import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
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

		await prisma.card.create({
			data: {
				name,
				pos,
				list: { connect: { id: listId } },
				board: { connect: { id: boardId } }
			}
		});

		throw redirect(303, `/boards/${boardId}`);
	}
};
