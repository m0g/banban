import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		let name = data.get('name');

		if (!name) {
			return fail(400, { name, missing: true });
		}

		if (typeof name != 'string') {
			return fail(400, { incorrect: true });
		}

		await prisma.board.create({
			data: {
				name
			}
		});

		throw redirect(303, '/boards');
	}
};

export const load = async () => {
	const response = await prisma.board.findMany();
	return { boards: response };
};
