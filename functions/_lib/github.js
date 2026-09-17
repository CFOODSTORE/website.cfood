const API = 'https://api.github.com';

function cfg(env) {
  return {
    owner: env.GITHUB_OWNER || 'CFOODSTORE',
    repo: env.GITHUB_REPO || 'website.cfood',
    branch: env.GITHUB_BRANCH || 'main',
    token: env.GITHUB_TOKEN
  };
}

function headers(env) {
  const { token } = cfg(env);
  if (!token) throw new Error('GITHUB_TOKEN is not configured');
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'cfood-admin'
  };
}

export function decodeBase64Utf8(value) {
  const clean = (value || '').replace(/\n/g, '');
  const binary = atob(clean);
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeBase64Utf8(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  const step = 0x8000;
  for (let i = 0; i < bytes.length; i += step) {
    binary += String.fromCharCode(...bytes.subarray(i, i + step));
  }
  return btoa(binary);
}

export async function getFile(env, path) {
  const { owner, repo, branch } = cfg(env);
  const url = `${API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, '/')}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, { headers: headers(env) });
  if (!res.ok) throw new Error(`GitHub read failed (${res.status})`);
  const data = await res.json();
  return { ...data, text: data.content ? decodeBase64Utf8(data.content) : '' };
}

export async function listDirectory(env, path) {
  const { owner, repo, branch } = cfg(env);
  const url = `${API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, '/')}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, { headers: headers(env) });
  if (!res.ok) throw new Error(`GitHub list failed (${res.status})`);
  return res.json();
}

export async function putFile(env, path, contentBase64, message, sha = null) {
  const { owner, repo, branch } = cfg(env);
  const url = `${API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, '/')}`;
  const body = { message, content: contentBase64, branch };
  if (sha) body.sha = sha;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { ...headers(env), 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub write failed (${res.status}): ${detail.slice(0, 240)}`);
  }
  return res.json();
}

export async function putTextFile(env, path, text, message, sha = null) {
  return putFile(env, path, encodeBase64Utf8(text), message, sha);
}
