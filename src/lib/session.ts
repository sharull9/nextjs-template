import { COOKIE_NAME } from '@/constants';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { cache } from 'react';
import 'server-only';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export const cookieOptions: any = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
};

export async function encrypt<T = JWTPayload | undefined>(payload: T) {
    return new SignJWT(payload ?? {})
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.warn('Failed to verify session');
    }
}

export async function createSession<T>(user: T) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ ...user, expiresAt });
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, session, {
        ...cookieOptions,
        expires: expiresAt,
    });
}

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get(COOKIE_NAME)?.value;
    const session = await decrypt(cookie);
    if (!session) return null;
    const { expiresAt, ...rest } = session;
    const user = rest;
    return { isAuth: true, user };
});

export async function updateSession() {
    const session = (await cookies()).get(COOKIE_NAME)?.value;
    const payload = await decrypt(session);

    if (!session || !payload) return null;
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, session, {
        ...cookieOptions,
        expires: expires,
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}
