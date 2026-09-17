import { getFile, putTextFile } from '../../_lib/github.js';
import { json } from '../../_lib/auth.js';

const GROUPS = {
  seo: ['meta_title','meta_desc'],
  hero: ['hero_eyebrow','hero_title','hero_text','hero_quote','hero_credentials','fact_bourbon','fact_standard_title','fact_standard_text','fact_special_title','fact_special_text'],
  company: ['company_title','company_p1','company_p2','company_li1','company_li2','company_li3','company_li4','farm_caption'],
  products: ['products_kicker','products_title','products_intro','grade_a','prod_a_title','prod_a_text','prod_a_link','grade_b','prod_b_title','prod_b_text','prod_b_link'],
  special: ['special_kicker','special_title','special_intro','sp_org_title','sp_org_text','sp_ft_title','sp_ft_text','sp_extract_title','sp_extract_text','sp_oleo_title','sp_oleo_text','sp_custom_title','sp_custom_text','sp_request','cert_note_title','cert_note_text'],
  quality: ['quality_kicker','quality_title','quality_intro','gallery_1','gallery_2','gallery_3','gallery_4','q1_title','q1_text','q2_title','q2_text','q3_title','q3_text','q4_title','q4_text','origin_matters','origin_title'],
  credentials: ['cred_kicker','cred_title','cred_p1','rcs_label','cred_p2','package_title','package_li1','package_li2','package_li3','package_li4','package_li5','package_btn'],
  contact: ['request_kicker','request_title','request_intro','tab_quote','tab_info','quote_title','quote_text','info_title','info_text','footer_tagline','location_value','rights']
};
const ALLOWED = new Set(Object.values(GROUPS).flat());

function extractTranslations(source) {
  const marker = 'const translations = ';
  const markerAt = source.indexOf(marker);
  if (markerAt < 0) throw new Error('translations object not found');
  const start = source.indexOf('{', markerAt + marker.length);
  if (start < 0) throw new Error('translations object is invalid');
  let depth = 0, inString = false, escaped = false, end = -1;
  for (let i = start; i < source.length; i++) {
    const c = source[i];
    if (inString) {
      if (escaped) { escaped = false; continue; }
      if (c === '\\') { escaped = true; continue; }
      if (c === '"') inString = false;
      continue;
    }
    if (c === '"') { inString = true; continue; }
    if (c === '{') depth++;
    if (c === '}') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  if (end < 0) throw new Error('translations object is incomplete');
  const objectText = source.slice(start, end);
  return { data: JSON.parse(objectText), start, end };
}

export async function onRequestGet({ env }) {
  try {
    const file = await getFile(env, 'script.js');
    const parsed = extractTranslations(file.text);
    const output = {};
    for (const [lang, values] of Object.entries(parsed.data)) {
      output[lang] = {};
      for (const key of ALLOWED) if (key in values) output[lang][key] = values[key];
    }
    return json({ languages: Object.keys(output), groups: GROUPS, content: output });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

export async function onRequestPut({ request, env }) {
  try {
    const body = await request.json();
    const lang = String(body.lang || '');
    const values = body.values || {};
    const file = await getFile(env, 'script.js');
    const parsed = extractTranslations(file.text);
    if (!parsed.data[lang]) return json({ error: 'Unknown language.' }, 400);
    let changed = 0;
    for (const [key, value] of Object.entries(values)) {
      if (!ALLOWED.has(key)) continue;
      if (typeof value !== 'string' || value.length > 10000) return json({ error: `Invalid value for ${key}.` }, 400);
      if (parsed.data[lang][key] !== value) {
        parsed.data[lang][key] = value;
        changed++;
      }
    }
    if (!changed) return json({ ok: true, changed: 0 });
    const next = file.text.slice(0, parsed.start) + JSON.stringify(parsed.data) + file.text.slice(parsed.end);
    await putTextFile(env, 'script.js', next, `Admin: update ${lang} website content`, file.sha);
    return json({ ok: true, changed });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}
