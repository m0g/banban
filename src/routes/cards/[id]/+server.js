import prisma from '$lib/prisma';
import { json, fail } from '@sveltejs/kit';

export async function PUT({ params: { id }, request }) {
	const data = await request.formData();
	const pos = Number(data.get('pos'));
	const listId = data.get('listId');

	if (!pos || !listId) {
		return fail(400, { pos, missing: true });
	}

	await prisma.card.update({
		where: { id },
		data: { pos, listId }
	});

	return json({ success: true });
}
