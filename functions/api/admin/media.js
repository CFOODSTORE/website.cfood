import { getFile, listDirectory, putFile } from '../../_lib/github.js';
import { json } from '../../_lib/auth.js';

const REPLACEABLE = [
  'assets/logo.png','assets/hero-beans.webp','assets/crystal-beans.webp','assets/green-vine.webp',
  'assets/green-hand.webp','assets/green-basket.webp','assets/community.webp','assets/og-image.jpg'
];
const EXTENSIONS = new Set(['png','jpg','jpeg','webp','gif','svg','mp4','webm','mov']);

function cleanName(name) {
  return String(name || '').trim().replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
}
function extension(path) { return (path.split('.').pop() || '').toLowerCase(); }
function normalizeBase64(value) {
  value = String(value || '');
  const comma = value.indexOf(',');
  if (value.startsWith('data:') && comma >= 0) value = value.slice(comma + 1);
  return value.replace(/\s/g, '');
}

export async function onRequestGet({ env }) {
  try {
    const root = await listDirectory(env, 'assets');
    let uploads = [];
    try { uploads = await listDirectory(env, 'assets/uploads'); } catch {}
    const compact = items => (Array.isArray(items) ? items : []).filter(x => x.type === 'file').map(x => ({ name: x.name, path: x.path, size: x.size, sha: x.sha }));
    return json({ replaceable: REPLACEABLE, assets: compact(root), uploads: compact(uploads) });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const mode = body.mode === 'replace' ? 'replace' : 'upload';
    let path;
    if (mode === 'replace') {
      path = String(body.path || '');
      if (!REPLACEABLE.includes(path)) return json({ error: 'This asset cannot be replaced from the panel.' }, 400);
    } else {
      const filename = cleanName(body.filename);
      if (!filename || !EXTENSIONS.has(extension(filename))) return json({ error: 'Unsupported file type.' }, 400);
      path = `assets/uploads/${filename}`;
    }
    if (!EXTENSIONS.has(extension(path))) return json({ error: 'Unsupported file type.' }, 400);
    const content = normalizeBase64(body.content);
    if (!content) return json({ error: 'Missing file content.' }, 400);
    const approxBytes = Math.floor(content.length * 0.75);
    if (approxBytes > 12 * 1024 * 1024) return json({ error: 'File too large. Maximum 12 MB.' }, 413);
    let sha = null;
    try { sha = (await getFile(env, path)).sha; } catch {}
    await putFile(env, path, content, `Admin: ${sha ? 'replace' : 'upload'} ${path}`, sha);
    return json({ ok: true, path, url: `/${path}` });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}
