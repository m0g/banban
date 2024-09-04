import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params: { id }, locals }) => {
  if (!locals.user) redirect(302, '/signin');

  // Todo: check that the board belongs to the user
  const board = await prisma.board.findUnique({
    where: { id },
    include: {
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

  return { board };
};
