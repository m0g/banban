import prisma from '$lib/prisma';

function exclude(user, keys) {
	return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
}

// export async function load({ locals }) {
// 	let userWithoutPass;

// 	if (locals.user) {
// 		const user = await prisma.user.findUnique({
// 			where: { id: locals.user.id }
// 		});
// 		console.log(user);
// 		userWithoutPass = exclude(user, ['password', 'date']);
// 	}

// 	console.log(userWithoutPass);
// 	return {
// 		user: userWithoutPass
// 	};
// }
