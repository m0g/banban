import prisma from '$lib/prisma';

export const load = async ({ params: { id } }) => {
	const board = await prisma.board.findUnique({
		where: { id: Number(id) },
		include: {
			lists: {
				orderBy: { pos: 'asc' },
				include: { cards: { orderBy: { pos: 'asc' } } }
			}
		}
	});

	return { board };
};
