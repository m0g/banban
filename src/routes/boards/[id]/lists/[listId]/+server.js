import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export async function DELETE({ params: { id, listId } }) {
	console.log(id, listId);
	await prisma.list.delete({
		where: { id: Number(listId) }
	});

	throw redirect(303, `/boards/${id}`);
}
