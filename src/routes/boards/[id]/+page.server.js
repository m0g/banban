import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params: { id }, locals }) => {
	if (!locals.user) redirect(302, '/signin');

	const board = await prisma.board.findUnique({
		where: { id },
		include: {
			lists: {
				orderBy: { pos: 'asc' },
				include: { cards: { orderBy: { pos: 'asc' } } }
			}
		}
	});

	return { board };
};
