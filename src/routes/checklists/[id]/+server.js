import prisma from '$lib/prisma';
import { json, fail } from '@sveltejs/kit';

export async function DELETE({ params: { id }, locals }) {
  if (!locals.user) {
    return fail(403, 'Unauthorized');
  }

  await prisma.checkList.delete({
    where: { id }
    // include: {
    //   board: {
    //     include: {
    //       users: {
    //         where: { id: locals.user.id }
    //       }
    //     }
    //   }
    // }
  });

  return json({ success: true });
}
