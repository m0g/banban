import prisma from '$lib/prisma';
import { json, fail } from '@sveltejs/kit';

export async function DELETE({ params: { id }, locals }) {
  if (!locals.user) {
    return fail(403, 'Unauthorized');
  }

  const checkList = await prisma.checkList.findUnique({ where: { id } });
  await prisma.checkList.delete({
    where: { id }
  });

  await prisma.action.create({
    data: {
      type: 'deleteCheckListFromCard',
      text: `removed <b class="font-bold">${checkList.name}</b> from this card`,
      card: { connect: { id: checkList.cardId } },
      user: { connect: { id: locals.user.id } }
    }
  });

  return json({ success: true });
}

export async function PUT({ params: { id }, request, locals }) {
  if (!locals.user) {
    return fail(403, 'Unauthorized');
  }

  const formData = await request.formData();
  const name = formData.get('name');

  let data = {};

  if (name) {
    data = { ...data, name };
  }

  try {
    await prisma.checkList.update({
      where: { id },
      data
    });
  } catch (e) {
    console.error(e);
  }

  return json({ success: true });
}
