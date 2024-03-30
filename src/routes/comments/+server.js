import prisma from '$lib/prisma';
import { json, fail } from '@sveltejs/kit';

export async function POST({ params, request, locals }) {
  if (!locals.user) {
    return fail(403, 'Unauthorized');
  }

  const formData = await request.formData();
  const text = formData.get('text');
  const cardId = formData.get('cardId');

  if (!text || !cardId) {
    return fail(400, { text, cardId, missing: true });
  }

  const comment = await prisma.comment.create({
    data: {
      text,
      card: { connect: { id: cardId } },
      user: { connect: { id: locals.user.id } }
    }
  });

  await prisma.action.create({
    data: {
      type: 'commentCard',
      card: { connect: { id: cardId } },
      user: { connect: { id: locals.user.id } },
      comment: { connect: { id: comment.id } }
    }
  });

  return json({ success: true });
}
