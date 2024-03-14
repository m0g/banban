import prisma from '$lib/prisma';
import { json, fail } from '@sveltejs/kit';

export async function PUT({ params: { id }, request, locals }) {
	if (!locals.user) {
		return fail(403, 'Unauthorized');
	}

	const formData = await request.formData();
	const pos = Number(formData.get('pos'));
	const listId = formData.get('listId');
	const name = formData.get('name');
	const desc = formData.get('desc');

	let data = {};

	if (pos && listId) {
		data = { ...data, pos, listId };
	}

	if (name) {
		data = { ...data, name };
	}

	if (desc) {
		data = { ...data, desc };
	}

	try {
		await prisma.card.update({
			where: { id },
			data
		});
	} catch (e) {
		console.error(e);
	}

	return json({ success: true });
}
