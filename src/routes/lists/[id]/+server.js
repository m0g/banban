import prisma from '$lib/prisma';
import { json, fail } from '@sveltejs/kit';

export async function PUT({ params: { id }, request, locals }) {
	if (!locals.user) {
		return fail(403, 'Unauthorized');
	}

	const formData = await request.formData();
	const pos = Number(formData.get('pos'));
	const name = formData.get('name');

	let data = {};

	if (pos) {
		data = { ...data, pos };
	}

	if (name) {
		data = { ...data, name };
	}

	await prisma.list.update({
		where: { id },
		data
	});

	return json({ success: true });
}
