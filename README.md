# Gladiators.meme


### Gladiators. Meme is a Pokemon-like " meme coins " battle in which users can fight for each other's bags. 


Users can mint NFTs of their Gladiator cards, which represent the memecoins set to battle. These cards allow players to assemble their team of Gladiators to face off against other users in exciting duels.

After building their team, players can stake their memecoins in our single-sided vaults and receive LP tokens. These LP tokens will serve as the in-game currency for betting during the Gladiator battles.

Once the team is ready, players can jump into battle. During the match, their staked tokens are securely held in an escrow account, and once the fight concludes, our master account distributes the winnings to the victor.

Each Gladiator in the game has unique attacks, with stats that fluctuate based on real-time market data. Factors like market activity, market cap, and the 24-hour price movement (% up or down) influence the Gladiator's performance. Currently, this data is fetched via an API, but we plan to upgrade to an oracle system in the future for enhanced reliability and decentralization.

## Repo

The project it's build using a turbo monorepo. 

### Programs
#### Configuration
Solana version: solana-cli 1.18.18
RPC URL: https://api.devnet.solana.com 
WebSocket URL: wss://api.devnet.solana.com/
Rust version: rustc 1.81.0
Cargo version: cargo 1.81.0
rustup toolchain list: stable-x86_64-apple-darwin (default)
anchor version: anchor-cli 0.30.1

#### Deployments

- Vault Manager / AMM: https://solscan.io/account/7uiv49yQump51zMgNXCs98iPGq2oUHgUmbe33uUMiiv3?cluster=devnet
-     Generated AMM ID: DDTWGUxUysQtJ2PJJdjYFN7Doedt5oLVE8T3hedES8iM
-     AMM created with public key: 7uiv49yQump51zMgNXCs98iPGq2oUHgUmbe33uUMiiv3


### Backend
### Frontend







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
