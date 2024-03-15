import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params: { id }, locals }) => {
	if (!locals.user) redirect(302, '/signin');

	const user = await prisma.user.findUnique({ where: { id } });

	return { user };
};
