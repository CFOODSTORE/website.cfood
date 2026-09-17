import { createSession, sessionCookie, json } from '../../_lib/auth.js';

function constantEqual(a, b) {
  a = String(a || ''); b = String(b || '');
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

export async function onRequestPost({ request, env }) {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD || !env.SESSION_SECRET) {
    return json({ error: 'Admin environment variables are not configured.' }, 503);
  }
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }
  const emailOk = constantEqual(String(body.email || '').trim().toLowerCase(), String(env.ADMIN_EMAIL).trim().toLowerCase());
  const passwordOk = constantEqual(body.password, env.ADMIN_PASSWORD);
  if (!emailOk || !passwordOk) return json({ error: 'Email or password incorrect.' }, 401);
  const token = await createSession(env, String(env.ADMIN_EMAIL).trim().toLowerCase());
  return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(token) });
}

export function onRequestGet() {
  return json({ error: 'Method not allowed.' }, 405);
}
