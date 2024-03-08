import prisma from '$lib/prisma';
import { fail, json, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		let name = data.get('name');
		let boardId = parseInt(data.get('boardId'));

		if (!name || !boardId) {
			return fail(400, { name, boardId, missing: true });
		}

		if (typeof name != 'string' || typeof boardId != 'number') {
			return fail(400, { incorrect: true });
		}

		await prisma.list.create({
			data: {
				name,
				board: { connect: { id: boardId } }
			}
		});

		throw redirect(303, `/boards/${boardId}`);
	}
};
