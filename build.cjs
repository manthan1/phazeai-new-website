const fs = require('node:fs');
const path = require('node:path');
const files = ['index.html', 'premium.css', 'assets/phaze-logo.webp', 'assets/experience-poster.png'];
for (const file of files) {
  const source = path.join(__dirname, file);
  const destination = path.join(__dirname, 'dist', file);
  if (!fs.statSync(source).size) throw new Error(`Empty asset: ${file}`);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.has(target)) throw new Error(`Missing navigation target: ${target}`);
}
if ((html.match(/<h1>/g) || []).length !== 1) throw new Error('Expected one primary heading');
console.log('Site built. Navigation targets and required assets verified.');
