import prisma from '$lib/prisma';
import { json, fail } from '@sveltejs/kit';

export async function PUT({ params: { id }, request, locals }) {
	console.log('puts');
	if (!locals.user) {
		return fail(403, 'Unauthorized');
	}

	const data = await request.formData();
	const pos = Number(data.get('pos'));
	const listId = data.get('listId');

	if (pos == null || !listId) {
		return fail(400, { pos, listId, missing: true });
	}

	try {
		await prisma.card.update({
			where: { id },
			data: { pos, listId }
		});
	} catch (e) {
		console.log('error, this is an error');
		console.error(e);
	}

	return json({ success: true });
}
