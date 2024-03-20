import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import prisma from '$lib/prisma';

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    if (typeof email !== 'string') {
      return fail(400, {
        message: 'Invalid email'
      });
    }
    if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
      return fail(400, {
        message: 'Invalid password'
      });
    }

    const hashedPassword = await new Argon2id().hash(password);

    // TODO: check if username is already used
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });

    redirect(302, '/');
  }
};
