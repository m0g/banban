import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  if (!locals.user) redirect(302, '/signin');

  const user = await prisma.user.findUnique({
    where: { id: locals.user.id },
    include: { boards: true }
  });

  return { boards: user.boards };
};
