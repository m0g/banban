import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { adapter } from '$lib/prisma';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	}
});
