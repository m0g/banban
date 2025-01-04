import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params: { id }, locals, url }) => {
  const scrollLeft = parseInt(url.searchParams.get('scrollLeft'));

  if (!locals.user) redirect(302, '/signin');

  // Todo: check that the board belongs to the user
  const board = await prisma.board.findUnique({
    where: { id },
    include: {
      users: true,
      lists: {
        orderBy: { pos: 'asc' },
        include: {
          cards: {
            orderBy: { pos: 'asc' },
            include: {
              attachments: true,
              comments: true,
              checklists: {
                include: { checkItems: true }
              }
            }
          }
        }
      }
    }
  });

  const users = await prisma.user.findMany();

  return {
    board,
    scrollLeft,
    users: users.map(({ id, email, name, avatar }) => ({ id, email, name, avatar }))
  };
};
