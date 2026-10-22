// Structural DOM diff of two HTML files: <html>/<body> attributes, the defining <head> tags (title, metas, font links)
// and the whole <body>: tags, attributes and text, including every space that can render.
// Ignores comments, scripts, Next.js' empty hidden streaming slot, whitespace inside non-text SVG elements and
// whitespace at the edges of block containers (the browser drops it at line edges) and whitespace between the
// page-level blocks directly inside <body> and <main> (sections, header, footer: never rendered between blocks).
// Exit 1 when the trees differ. Usage: node scripts/dom-diff.mjs <reference.html> <rendered.html>
import fs from 'node:fs';
import { parse } from 'parse5';

const SVG_NS = 'http://www.w3.org/2000/svg';
const BLOCKISH = new Set(['section', 'div', 'header', 'footer', 'nav', 'main', 'ul', 'ol', 'li', 'article', 'figure', 'p', 'h1', 'h2', 'h3', 'button', 'body']);
const INLINE_CLASSES = /\b(m-br|d-only|d-br|pp-bill|he-br)\b/;
const IGNORED = new Set(['script', 'next-route-announcer', 'template']);

const htmlOf = f => parse(fs.readFileSync(f, 'utf8')).childNodes.find(n => n.nodeName === 'html');
const body = f => htmlOf(f).childNodes.find(n => n.nodeName === 'body');
// style="a: 1px  2px;b:c;" -> "a:1px 2px;b:c" (keeps spaces inside values, which can matter)
const normStyle = v => v.split(';').map(d => d.trim()).filter(Boolean).map(d => { const i = d.indexOf(':'); return `${d.slice(0, i).trim()}:${d.slice(i + 1).trim().replace(/\s+/g, ' ')}`; }).join(';');
const attrList = n => n.attrs.map(a => `${a.prefix ? a.prefix + ':' : ''}${a.name}=${a.name === 'style' ? normStyle(a.value) : a.value}`).sort().join(' ');

// <head>: the tags that define the page (title, metas, font requests), plus <html>/<body> attributes
function headSig(f) {
  const html = htmlOf(f), head = html.childNodes.find(n => n.nodeName === 'head'), bodyEl = html.childNodes.find(n => n.nodeName === 'body');
  const out = [`<html ${attrList(html)}>`, `<body ${attrList(bodyEl)}>`];
  for (const n of head.childNodes) {
    const get = k => (n.attrs?.find(a => a.name === k) || {}).value;
    if (n.nodeName === 'title') out.push(`title ${n.childNodes.map(c => c.value).join('')}`);
    else if (n.nodeName === 'meta' && get('name')) out.push(`meta ${get('name')}=${get('content')}`);
    else if (n.nodeName === 'meta' && get('charset')) out.push(`meta charset=${get('charset').toLowerCase()}`);
    // rel=preload is a fetch hint React 19 adds for stylesheets; it changes timing, not rendering
    else if (n.nodeName === 'link' && get('rel') !== 'preload' && /fonts\.(googleapis|gstatic)\.com/.test(get('href') || '')) out.push(`link ${get('rel')} ${get('href')}`);
  }
  return out.sort();
}
const cls = n => ((n.attrs || []).find(a => a.name === 'class') || {}).value || '';
const isBlock = n => BLOCKISH.has(n.nodeName) && !INLINE_CLASSES.test(cls(n));
const svgNoText = n => n.namespaceURI === SVG_NS && !['text', 'tspan', 'textPath'].includes(n.nodeName);
const skip = c => IGNORED.has(c.nodeName) || (c.nodeName === 'div' && c.attrs.some(a => a.name === 'hidden') && !c.childNodes.some(k => k.nodeName[0] !== '#'));

function flat(node, out = [], depth = 0) {
  const kids = (node.content || node).childNodes.filter(c => c.nodeName !== '#comment' && !(c.tagName && skip(c)));
  // merge adjacent text nodes (React separates them with comments)
  const items = [];
  for (const c of kids) {
    if (c.nodeName === '#text' && items.length && items[items.length - 1].text !== undefined) items[items.length - 1].text += c.value;
    else items.push(c.nodeName === '#text' ? { text: c.value } : { el: c });
  }
  items.forEach((it, i) => {
    if (it.el) {
      const c = it.el;
      const at = attrList(c);
      out.push(`${depth} <${c.nodeName} ${at}>`);
      flat(c, out, depth + 1);
      return;
    }
    let t = it.text.replace(/[ \t\n\r\f]+/g, ' ');
    if (isBlock(node) && i === 0) t = t.trimStart();
    if (isBlock(node) && i === items.length - 1) t = t.trimEnd();
    if (!t || (t === ' ' && (svgNoText(node) || node.nodeName === 'body' || node.nodeName === 'main'))) return;
    out.push(`${depth} #text ${JSON.stringify(t)}`);
  });
  return out;
}

const a = [...headSig(process.argv[2]), ...flat(body(process.argv[2]))];
const b = [...headSig(process.argv[3]), ...flat(body(process.argv[3]))];
// DOM_DIFF_DUMP=<dir> writes both flattened trees (a.txt, b.txt) for a line diff
if (process.env.DOM_DIFF_DUMP) {
  fs.writeFileSync(`${process.env.DOM_DIFF_DUMP}/a.txt`, a.join('\n'));
  fs.writeFileSync(`${process.env.DOM_DIFF_DUMP}/b.txt`, b.join('\n'));
}
console.log('nodes', a.length, b.length);
let diffs = 0;
for (let i = 0; i < Math.max(a.length, b.length); i++) {
  if (a[i] === b[i]) continue;
  console.log(`#${i}\n  A: ${(a[i] || '').slice(0, 220)}\n  B: ${(b[i] || '').slice(0, 220)}`);
  if (++diffs > 8) break;
}
console.log(diffs ? 'DIFFERENT' : 'IDENTICAL');
process.exitCode = diffs ? 1 : 0;
