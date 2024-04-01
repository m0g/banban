import prisma from '$lib/prisma';
import { json, fail } from '@sveltejs/kit';

export async function DELETE({ params: { id }, locals }) {
  if (!locals.user) {
    return fail(403, 'Unauthorized');
  }

  await prisma.comment.delete({
    where: { id },
    include: {
      user: {
        where: { id: locals.user.id }
      }
    }
  });

  return json({ success: true });
}
