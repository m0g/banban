import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

export async function PUT({ params: { id }, request }) {
	const data = await request.formData();
	const pos = Number(data.get('pos'));

	if (!pos) {
		return fail(400, { pos, missing: true });
	}

	await prisma.list.update({
		where: { id: Number(id) },
		data: { pos }
	});

	return json({ success: true });
}
