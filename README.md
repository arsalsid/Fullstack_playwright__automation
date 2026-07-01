# Fullstack Playwright Automation Framework

**Created by:** Muhammad Arsalan

## Overview

This project is a full-stack test automation framework built with [Playwright](https://playwright.dev/). It covers **UI** and **API** testing for web applications, with detailed reporting through Allure and Playwright HTML reports. Tests can run locally across multiple browsers and are integrated with **GitHub Actions** for CI/CD.

## Features

- **Playwright** — Browser automation across Chromium (Chrome, Edge), Firefox, and WebKit (Safari)
- **UI testing** — Login flows on [Practice Test Automation](https://practicetestautomation.com/)
- **API testing** — GET, POST, and DELETE request coverage
- **Page Object Model (POM)** — Reusable page classes for maintainable UI tests
- **Fixtures** — Shared constants, URLs, and JSON request payloads
- **Environment variables** — Sensitive values loaded from `.env` via `dotenv`
- **Allure reporting** — Rich, interactive test execution reports
- **CI/CD** — GitHub Actions workflow for automated runs and Allure report artifacts

## Project Structure

```
Fullstack_playwright__automation/
├── .github/
│   └── workflows/
│       └── playwright.yml      # CI/CD pipeline
├── Fixtures/
│   ├── constants.ts              # Shared test constants
│   ├── url.json                  # Base URL and login path (UI tests)
│   └── urlConstants.ts           # URL constants for UI tests
├── pages/
│   └── loginPage.ts              # Login page object
├── tests/
│   ├── api/
│   │   ├── get-Request.spec.ts   # GET /objects
│   │   ├── post-Request.spec.ts  # POST /objects
│   │   ├── delete-Request.spec.ts# DELETE /objects/{id}
│   │   └── put-Requesr.spec.ts   # PUT (in progress)
│   └── ui/
│       ├── TC-001loginWithValidCredentials.spec.ts
│       ├── TC-002loginWithInValidUsername.spec.ts
│       ├── TC-003loginWithInValidPassword.spec.ts
│       ├── TC_004fetchLoginCredWithEnv.spec.ts
│       ├── TC-005loginWithinValidCredentialsByPOM.spec.ts
│       └── functions.spec.ts
├── auth.setup.ts                 # Auth setup hook (Playwright setup project)
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Dependencies and npm scripts
├── .env                          # Local environment variables (not committed)
├── allure-results/               # Raw Allure results (generated)
├── allure-report/                # Generated Allure report
└── playwright-report/            # Playwright HTML report
```

## Prerequisites

- **Node.js** — LTS version recommended
- **npm** — Comes with Node.js
- **Playwright browsers** — Installed during setup (see below)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Fullstack_playwright__automation
```

2. Install dependencies:

```bash
npm ci
```

3. Install Playwright browsers:

```bash
npx playwright install --with-deps
```

4. Create a local `.env` file in the project root for credentials and API configuration. This file is gitignored and must not be committed.

> **Note:** API tests read configuration from `.env`. UI tests use fixture files under `Fixtures/` depending on the spec.

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run by suite

```bash
# UI tests only
npx playwright test tests/ui

# API tests only
npx playwright test tests/api
```

### Run a specific test file

```bash
npx playwright test tests/api/post-Request.spec.ts
npx playwright test tests/ui/TC-001loginWithValidCredentials.spec.ts
```

### Run on a specific browser project

Configured projects: `setup`, `Chrome`, `Firefox`, `Safari`, `Edge`.

```bash
npx playwright test --project=Chrome
npx playwright test --project=Firefox
```

### Run in headed mode (visible browser)

```bash
npx playwright test --headed
```

### Debug a test

```bash
npx playwright test tests/ui/TC-001loginWithValidCredentials.spec.ts --debug
```

## Reports

### Playwright HTML report

Generated automatically after a test run:

```bash
npx playwright show-report
```

### Allure report

Generate and open the Allure report locally:

```bash
npm run allure:generate
npm run allure:open
```

## CI/CD

The GitHub Actions workflow (`.github/workflows/playwright.yml`) runs on push and pull requests to `main` and `master`:

1. Installs dependencies and Playwright browsers
2. Runs the full test suite
3. Uploads Allure results and generated Allure report as artifacts
4. Deploys the Allure report to GitHub Pages (when configured)

## Test Coverage

| Area | Description |
|------|-------------|
| **UI — Login** | Valid/invalid credentials, env-based credentials, POM-based login |
| **API — GET** | Fetch list of objects |
| **API — POST** | Create a new object |
| **API — DELETE** | Create an object, then delete it by `id` |

## Tech Stack

- [Playwright Test](https://playwright.dev/docs/intro) `^1.59.1`
- [Allure Playwright](https://www.npmjs.com/package/allure-playwright) `^3.10.0`
- [dotenv](https://www.npmjs.com/package/dotenv) `^17.4.2`

## License

ISC
