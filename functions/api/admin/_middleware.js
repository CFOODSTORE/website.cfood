import { getCookie, verifySession, json } from '../../_lib/auth.js';

export async function onRequest(context) {
  const { request, env, next } = context;
  const path = new URL(request.url).pathname;
  if (path.endsWith('/login') || path.endsWith('/logout')) return next();
  const token = getCookie(request, 'cf_admin_session');
  if (!(await verifySession(env, token))) return json({ error: 'Unauthorized' }, 401);
  return next();
}
