function b64url(bytes) {
  let binary = '';
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (const b of arr) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromB64url(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4);
  const binary = atob(base64);
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}

async function hmac(secret, value) {
  if (!secret) throw new Error('SESSION_SECRET is not configured');
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']
  );
  return crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
}

export async function createSession(env, email) {
  const payload = b64url(new TextEncoder().encode(JSON.stringify({
    email: email.toLowerCase(),
    exp: Date.now() + 8 * 60 * 60 * 1000
  })));
  const signature = b64url(await hmac(env.SESSION_SECRET, payload));
  return `${payload}.${signature}`;
}

export async function verifySession(env, token) {
  if (!token || !token.includes('.')) return false;
  try {
    const [payload, signature] = token.split('.');
    const expected = new Uint8Array(await hmac(env.SESSION_SECRET, payload));
    const received = fromB64url(signature);
    if (expected.length !== received.length) return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) diff |= expected[i] ^ received[i];
    if (diff !== 0) return false;
    const data = JSON.parse(new TextDecoder().decode(fromB64url(payload)));
    return data.exp > Date.now() && data.email === String(env.ADMIN_EMAIL || '').toLowerCase();
  } catch {
    return false;
  }
}

export function getCookie(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  for (const part of cookie.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return rest.join('=');
  }
  return '';
}

export function sessionCookie(token) {
  return `cf_admin_session=${token}; Path=/; Max-Age=28800; HttpOnly; Secure; SameSite=Strict`;
}

export function clearSessionCookie() {
  return 'cf_admin_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict';
}

export function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow',
      ...extraHeaders
    }
  });
}
