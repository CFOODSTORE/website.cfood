import { getFile, listDirectory, putTextFile } from '../../_lib/github.js';
import { json } from '../../_lib/auth.js';

const ROOT = new Set(['index.html','styles.css','seo.css','robots.txt','sitemap.xml']);
function allowed(path) {
  path = String(path || '');
  if (ROOT.has(path)) return true;
  return /^(fr|en)\/[a-z0-9._-]+\.html$/i.test(path);
}

async function listHtml(env, dir) {
  try {
    const items = await listDirectory(env, dir);
    return (Array.isArray(items) ? items : []).filter(x => x.type === 'file' && x.name.endsWith('.html')).map(x => x.path);
  } catch { return []; }
}

export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const path = url.searchParams.get('path');
    if (!path) {
      const [fr, en] = await Promise.all([listHtml(env, 'fr'), listHtml(env, 'en')]);
      return json({ files: [...ROOT, ...fr, ...en] });
    }
    if (!allowed(path)) return json({ error: 'File not allowed.' }, 400);
    const file = await getFile(env, path);
    return json({ path, content: file.text, sha: file.sha });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

export async function onRequestPut({ request, env }) {
  try {
    const body = await request.json();
    const path = String(body.path || '');
    const content = String(body.content ?? '');
    if (!allowed(path)) return json({ error: 'File not allowed.' }, 400);
    if (content.length > 500000) return json({ error: 'File is too large for this editor.' }, 413);
    const file = await getFile(env, path);
    await putTextFile(env, path, content, `Admin: edit ${path}`, file.sha);
    return json({ ok: true });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}
