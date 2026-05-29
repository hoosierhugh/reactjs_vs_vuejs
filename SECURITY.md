# Security Policy

## Overview

This is an open-source React application demonstrating state management with Zustand. The project is maintained with security best practices in mind, and I take security concerns seriously.

## Supported Versions

| Version | Status |
|---------|--------|
| Latest  | Actively maintained |

This is an educational/demonstration project. I recommend staying up-to-date with the latest version for the best security practices and bug fixes.

## Reporting Security Vulnerabilities

If you discover a security vulnerability in this project, please **do not** open a public issue. Instead:

1. Email security details to: **computer.science.for.everyone.usa@gmail.com**
2. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if applicable)

3. Allow 48-72 hours for initial response

I will acknowledge receipt and work to address the issue promptly.

## Security Practices

### Dependency Management
- Dependencies are explicitly listed in `package.json` with pinned/caret versions
- Dev dependencies include linting and type checking tools (Biome, TypeScript)
- Regular dependency updates to address known vulnerabilities
- No unnecessary external dependencies

### Code Quality
- TypeScript for type safety and compile-time error detection
- Biome for code linting and formatting
- ESM module format for modern JavaScript standards

### Build & Runtime
- Vite for fast, optimized builds
- React 19+ for latest security features
- No embedded secrets or credentials in the codebase
- No telemetry or tracking

## Dependencies Overview

**Core Dependencies:**
- `react` & `react-dom`: UI framework
- `zustand`: Lightweight state management
- `@headlessui/react`: Unstyled, accessible UI components
- `tailwindcss`: CSS utility framework

**Dev Dependencies:**
- `typescript`: Static type checking
- `@biomejs/biome`: Code linting and formatting
- `vite`: Build tool
- Official type definitions for React

All dependencies are from trusted, widely-used npm packages with active maintenance.

## What to Expect

✅ **Safe to use for:**
- Learning React and state management
- Exploring Zustand patterns
- Educational projects
- Reference implementations

⚠️ **Not suitable for:**
- Production applications without additional hardening
- Sensitive data without encryption
- Compliance-heavy environments without additional review

## Security Scanning

We recommend:
1. Running `npm audit` or `pnpm audit` to check for known vulnerabilities
2. Reviewing the source code before use (it's all publicly available)
3. Using GitHub's dependency scanning features

## Best Practices When Using This Code

1. **Keep dependencies updated** — Run `npm update` or `pnpm update` regularly
2. **Scan for vulnerabilities** — Use `npm audit` before deploying
3. **Review the code** — Understand what you're running
4. **Don't add sensitive data** — Never commit API keys, tokens, or credentials
5. **Fork and maintain** — Create your own fork for production use

## Security Features

- No authentication/authorization (educational project)
- No external API calls to untrusted sources
- No DOM injection or XSS vectors
- Strict TypeScript configuration

## Contact

For security questions or concerns: **computer.science.for.everyone.usa@gmail.com**

---

**Last Updated:** May 2026
