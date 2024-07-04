# Erebus

## Overview

Erebus is a practice testing framework designed to showcase automated tests for different parts of the Moralis web3 infrastructure. The framework uses Playwright for UI testing and integrates with various blockchain APIs for some end-to-end testing.

## Features

- Capability to automate UI & API with Playwright.
- Easy configuration using environment variables.
- Modular and reusable utility functions.

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- (optional) Docker (latest)

### Steps

1. **Clone the Repository:**

```bash
git clone https://github.com/your-repo/erebus.git
cd erebus
```

2. **Install Dependencies**:

```bash
npm install
```

3. **Set Up Environment Variables**:

```bash
touch .env
```

Content:

```
API_KEY=your-api-key
SEPOLIA_NODE_URL=your-sepolia-node-url
HOLESKY_NODE_URL=your-holesky-node-url
WALLET_ADDRESS=your-valid-wallet-address
MORALIS_USERNAME=your-email@example.com
MORALIS_PASSWORD=your-password
```

### Directory Structure

```
erebus/
├── docs/
├── src/
│   ├── utils/
│   └── config.ts
├── tests/
├── .env
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── package.json
├── playwright.config.ts
├── setup.ts
├── readme.md
└── tsconfig.josn
```

### Usage

#### Locally

##### Running all tests

```bash
npx playwright test
```

#### Running specific test

```bash
npx playwright test <test_filename.spec.ts>
```

Example:

```bash
npx playwright test login.spec.ts
```

#### Docker

Please note that you have to have Docker Desktop installed.

After creation the .env file, run the below command to run all tests:

```bash
docker-compose up --build
```

#### Running with k6

(not supported yet in docker)

First, install k6 on your local machine (depending on OS).

To run a specific test (from project root):

```bash
./run-k6.sh <path_to_test>.js
```

Example:

```bash
./run-k6.sh tests/k6-tests/getWalletNFTs.js
```

Recommended VS Code plugins:

- `Playwright Test for VSCode` by Microsoft;
- `Playwright Test Snippets` by Mark Skelton;
- `Prettier - Code formatter` by Prettier
- `CodeMetrics` by Kiss Tamás
