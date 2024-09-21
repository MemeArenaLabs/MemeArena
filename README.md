# Memecoin Wars

[![Turborepo](https://img.shields.io/badge/built%20with-Turborepo-cc00ff.svg)](https://turbo.build/repo)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

Memecoin Wars is a cutting-edge web3 game featuring PvP battles with memes on the Solana blockchain.

## 🚀 Quick Start

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [pnpm](https://pnpm.io/) (v7 or later)
-   [Docker](https://www.docker.com/) (for local database)

### Installation

1. Clone the repository:

    ```
    git clone https://github.com/your-username/memecoin-wars.git
    cd memecoin-wars
    ```

2. Install dependencies:
    ```
    pnpm install
    ```

### Running the Project

#### Frontend

In the `frontend` folder:

```
pnpm dev
```

#### Backend

In the `backend` folder:

1. Start the local database:

    ```
    pnpm docker compose up
    ```

2. Run the local server:
    ```
    pnpm start
    ```

## 🏗 Project Structure

This project is a monorepo managed with Turborepo, containing:

-   `frontend`: Next.js web application
-   `backend`: Solana-based server application
-   `programs`: Solana smart contracts (Anchor framework)
-   `contracts`: EVM smart contracts

## 🛠 Tech Stack

-   Frontend: Next.js, TypeScript, Tailwind CSS, daisyUI
-   Backend: Node.js, WebSocket API
-   Blockchain: Solana, Anchor
-   Build Tools: Turborepo, pnpm

## 🔐 Remote Caching

This project uses Turborepo's [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) for optimized builds. To enable:

1. [Create a Vercel account](https://vercel.com/signup) if you don't have one
2. In the project root:
    ```
    npx turbo login
    npx turbo link
    ```

## 🎨 Icons Attribution

This project uses icons from [game-icons.net](https://game-icons.net). The icons are provided under the Creative Commons 3.0 BY or CC0 licenses. For full attribution details and license information, please visit the [game-icons license file](https://github.com/game-icons/icons/blob/master/license.txt).

## 📚 Useful Links

-   [Turborepo Documentation](https://turbo.build/repo/docs)
-   [Solana Documentation](https://docs.solana.com/)
-   [Anchor Framework](https://project-serum.github.io/anchor/)

## 📄 License

This project is licensed under the Apache License, Version 2.0 - see the [LICENSE](LICENSE) file for details.
