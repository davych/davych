# AGENTS.md — Agentic Coding Guidelines for davych

## Project Overview

**davych** is a Node.js portfolio/profile repository showcasing AI agent orchestration, micro-frontend patterns, and LLM-driven automation experiments. This guide provides agentic coders (Cursor, Copilot, and other AI agents) with exact commands, style conventions, and operational constraints.

---

## Build & Test Commands

### Available Scripts (from `package.json`)

```bash
npm run test    # Currently a placeholder (returns error)
npm run fake    # Runs: node task.js -r esm
```

### Project Structure

- **Main entry**: `index.js` (if applicable; project is primarily a portfolio README)
- **Scripts**: `./scripts/generate-readme.mjs` — fetches GitHub repos matching keywords (crewai, langgraph, microfront, agent, ai, llm) and updates README
- **Dependencies**: esm, execa, moment, playwright
- **Module type**: ES modules (`"type": "module"` in package.json)

### Running Code

```bash
# Execute scripts with ESM support
node --loader esm task.js

# Run the README generator (updates README with featured projects)
node scripts/generate-readme.mjs
```

---

## Linting & Formatting

### Markdown Linting

**Config**: `.markdownlint.json`

```json
{
  "default": true,
  "MD033": false,          // Allow inline HTML (needed for GitHub rendering)
  "MD041": false,          // No first-line heading required
  "MD013": { "line_length": 240 },  // Long lines allowed (for badge URLs)
  "MD046": false           // Code fence markers OK
}
```

**Lint markdown**:
```bash
npx markdownlint README.md
```

### No TypeScript/ESLint Config

This project has no TypeScript config (tsconfig.json), ESLint config, or Prettier config. Code follows **Node.js ES module conventions**:
- Use modern async/await (no callbacks)
- Prefer const/let over var
- Use meaningful variable names (camelCase for functions, UPPER_SNAKE_CASE for constants)

---

## Code Style Guidelines

### Imports & Module System

- **Module format**: ES modules (import/export, not CommonJS)
- **Import order**: Group external dependencies, then local modules
- **Example**:
  ```javascript
  import fs from 'fs/promises';
  import fetch from 'node-fetch';
  
  import { helper } from './utils.js';
  ```

### Naming Conventions

- **Functions & variables**: camelCase (e.g., `listRepos`, `matchRepo`, `repoTemplate`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `OWNER`, `KEYWORDS`)
- **Classes**: PascalCase (if used; not common in this project)
- **File names**: kebab-case for scripts (e.g., `generate-readme.mjs`), camelCase or lowercase for utilities

### Error Handling

- **Prefer async/await with try-catch**:
  ```javascript
  try {
    const result = await operation();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  ```
- **Exit codes**: Use `process.exit(1)` on fatal errors
- **Validation**: Throw descriptive errors early (see `generate-readme.mjs` line 10 for example)

### Async Patterns

- **Always use async/await** over `.then()` chains
- **Prefer `await` for sequential operations**, use `Promise.all()` for parallel operations
- **Never suppress errors** — catch and handle explicitly

### Type Checking

- No TypeScript in this project; keep types implicit but clear
- Document function parameters and returns in JSDoc if complex

---

## Working with README.md

The README is the **primary portfolio piece**. Follow these rules:

- **No raw HTML that breaks preview**: Use Markdown-compatible HTML only (centered <img>, simple divs)
- **Keep badges as Markdown links**: [![badge](url)](link-url)
- **Markdown linting**: All Markdown must pass `.markdownlint.json` rules
- **Comment markers**: Preserve `<!-- REPO-LIST:START -->` and `<!-- REPO-LIST:END -->` for automated updates
- **Edits**: Manual edits to README should be rare; use `scripts/generate-readme.mjs` for dynamic content

---

## Git & Commits

- **Commit message style**: Lowercase, imperative mood, concise
  - Examples: `docs: fix hero image rendering`, `chore: remove GitHub workflows`, `feat: add new section`
- **No force pushes** to main branch
- **Push directly** when instructed (no unnecessary branches for profile repo)

---

## Constraints & Blockers

### Do NOT

- ❌ Add TypeScript/tsconfig.json without explicit approval
- ❌ Add ESLint/Prettier/Biome configs (keep minimal)
- ❌ Suppress type errors or linting warnings (fix them properly)
- ❌ Commit credentials, API keys, or sensitive data
- ❌ Break existing markdown rendering (test in GitHub preview)
- ❌ Add unnecessary dependencies (use built-in Node.js APIs when possible)

### Do

- ✅ Use ES modules exclusively (import/export)
- ✅ Use async/await for all async operations
- ✅ Test README changes by viewing raw Markdown in preview
- ✅ Keep commit messages descriptive but brief
- ✅ Run `npx markdownlint README.md` before committing README changes
- ✅ Exit with error code 1 on script failures

---

## Dependencies Overview

| Package | Version | Purpose |
|---------|---------|---------|
| esm | ^3.2.25 | ES module loader |
| execa | ^6.0.0 | Process execution utility |
| moment | ^2.29.1 | Date/time handling |
| playwright | ^1.58.2 | Browser automation (for screenshots) |

---

## When to Ask for Clarification

Before modifying this repository, ask if:

1. You're unsure whether a change is cosmetic (README) vs functional (scripts)
2. You're considering adding new dependencies or build tools
3. The change affects markdown rendering or GitHub-specific features
4. You need to run code that requires authentication or external APIs

---

## Quick Reference

```bash
# Verify markdown linting
npx markdownlint README.md

# Update featured projects in README
node scripts/generate-readme.mjs

# Run a script with ESM support
node --loader esm <file.js>

# Check for issues before commit
npm test  # (placeholder; will return error)
```

---

**Last updated**: 2026-03-10
**Maintained by**: Agentic coders (Cursor, Copilot, OpenCode agents)
