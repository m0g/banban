import prisma from '$lib/prisma';
import { json, fail } from '@sveltejs/kit';

export async function PUT({ params: { id }, request, locals }) {
  if (!locals.user) {
    return fail(403, 'Unauthorized');
  }

  const formData = await request.formData();
  const userIds = formData.get('user_ids').split(',');
  console.log(userIds);

  let data = {};

  if (userIds) {
    data = {
      ...data,
      users: {
        connect: userIds.map((id) => ({
          id
        }))
      }
    };
  }

  try {
    const board = await prisma.board.update({
      where: { id },
      data
    });
    console.log(board);
  } catch (e) {
    console.error(e);
  }

  return json({ success: true });
}
