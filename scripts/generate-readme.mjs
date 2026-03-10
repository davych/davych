import fs from 'fs/promises';
import fetch from 'node-fetch';

const OWNER = 'davych';
const KEYWORDS = ['crewai','langgraph','microfront','agent','ai','llm'];

async function listRepos() {
  const url = `https://api.github.com/users/${OWNER}/repos?per_page=100`;
  const res = await fetch(url, {headers: { 'User-Agent': OWNER }});
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json();
}

function matchRepo(repo) {
  const name = repo.name.toLowerCase();
  return KEYWORDS.some(k => name.includes(k)) || repo.stargazers_count >= 5;
}

function repoTemplate(repo) {
  return `- [${repo.name}](${repo.html_url}) — ${repo.description || ''} (⭐ ${repo.stargazers_count})`;
}

async function main() {
  const repos = await listRepos();
  const picks = repos.filter(matchRepo).sort((a,b)=>b.stargazers_count - a.stargazers_count).slice(0,10);

  const list = picks.length ? picks.map(repoTemplate).join('\n') : '_No projects matched the selection yet._';

  let readme = await fs.readFile('README.md', 'utf8');
  const start = '<!-- REPO-LIST:START -->';
  const end = '<!-- REPO-LIST:END -->';
  const before = readme.split(start)[0] + start + '\n';
  const after = '\n' + end + readme.split(end).pop();
  const content = before + list + after;
  await fs.writeFile('README.md', content, 'utf8');
  console.log('README updated with', picks.length, 'repos');
}

main().catch(err => { console.error(err); process.exit(1); });
