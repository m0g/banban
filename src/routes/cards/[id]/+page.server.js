import prisma from '$lib/prisma';

export const load = async ({ params: { id } }) => {
	const card = await prisma.card.findUnique({
		where: { id },
		include: { board: true, list: true }
	});

	const board = await prisma.board.findUnique({
		where: { id: card.board.id },
		include: {
			lists: {
				orderBy: { pos: 'asc' },
				include: { cards: { orderBy: { pos: 'asc' } } }
			}
		}
	});

	return { board, card };
};
