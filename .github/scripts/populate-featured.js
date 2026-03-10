const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('GITHUB_TOKEN not set; exiting.');
    process.exit(0);
  }

  const octokit = new Octokit({ auth: token });
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');

  const res = await octokit.repos.listForAuthenticatedUser({ per_page: 100 });
  const repos = res.data
    .filter(r => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map(r => `- [${r.name}](${r.html_url}) - ${r.description || ''}`);

  const readmePath = path.join(process.cwd(), 'README.md');
  let readme = fs.readFileSync(readmePath, 'utf8');

  const start = '<!-- REPO-LIST:START -->';
  const end = '<!-- REPO-LIST:END -->';
  const startIdx = readme.indexOf(start);
  const endIdx = readme.indexOf(end);
  if (startIdx === -1 || endIdx === -1) {
    console.error('Markers not found; exiting.');
    process.exit(0);
  }

  const before = readme.slice(0, startIdx + start.length);
  const after = readme.slice(endIdx);
  const body = '\n' + (repos.length ? repos.join('\n') : '_No projects found yet — run workflow to populate._') + '\n';

  const updated = before + body + after;
  fs.writeFileSync(readmePath, updated, 'utf8');
  console.log('Updated README with featured projects.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
