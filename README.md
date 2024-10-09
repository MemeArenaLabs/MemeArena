# Gladiators.meme


### Gladiators. Meme is a Pokemon-like " meme coins " battle in which users can fight for each other's bags. 


Users can mint NFTs of their Gladiator cards, which represent the memecoins set to battle. These cards allow players to assemble their team of Gladiators to face off against other users in exciting duels.

After building their team, players can stake their memecoins in our single-sided vaults and receive LP tokens. These LP tokens will serve as the in-game currency for betting during the Gladiator battles.

Once the team is ready, players can jump into battle. During the match, their staked tokens are securely held in an escrow account, and once the fight concludes, our master account distributes the winnings to the victor.

Each Gladiator in the game has unique attacks, with stats that fluctuate based on real-time market data. Factors like market activity, market cap, and the 24-hour price movement (% up or down) influence the Gladiator's performance. Currently, this data is fetched via an API, but we plan to upgrade to an oracle system in the future for enhanced reliability and decentralization.

## Repo

The project it's build using a turbo monorepo. 

## Programs
### Configuration
Solana version: solana-cli 1.18.18
RPC URL: https://api.devnet.solana.com 
WebSocket URL: wss://api.devnet.solana.com/
Rust version: rustc 1.81.0
Cargo version: cargo 1.81.0
rustup toolchain list: stable-x86_64-apple-darwin (default)
anchor version: anchor-cli 0.30.1

## Deployments

### Vault Manager / AMM: https://solscan.io/account/7uiv49yQump51zMgNXCs98iPGq2oUHgUmbe33uUMiiv3?cluster=devnet
  - Generated AMM ID: DDTWGUxUysQtJ2PJJdjYFN7Doedt5oLVE8T3hedES8iM
  - AMM created with public key: 7uiv49yQump51zMgNXCs98iPGq2oUHgUmbe33uUMiiv3

### Vauls:
  #### WIF token:
  -     Pool Account: 4rHBKyXD7YzuLMX8edJ8kYZ9Qf5pMqpg1adRNidMQXu8
  -     Pool Token Account: GXJRZAViJJBsCeCW2PayWjT1FooJ99ShK3ihAUiE9fJE
  -     LP Token Mint Account: H9XaYVZ197y2Qxtua6ra3wbwa7jcQD9adqbjGU6QGBS2
  -     LP Token Account: 2PMi5J4TJDAGCJWNWYxcJvNqwigSRyEgQn5N6KV9tp4S
  -     Pool created for token: 4gn22HqJ9ksDULRaekC53A51HzkbAYpGCiLvGB4DhaZY with signature: 4LJNK35LCAMKsybD4KxmBtMBd3LPoXyfwUxoyM1B5CTryTaavw69JapYuW546DH8VMATmcU7UfirgFe1nk13wYgC

  #### BONK token:
  -     Pool Account: 5ceMwfAuuCgChWiyVsAGP7GJYwh6HSWyKU7w7Qv5PTd2
  -     Pool Token Account: Ai1jvEpB4nwjP4DgMRBQQtgAkhMbBUPzuZYEc26fSNBC
  -     LP Token Mint Account: 6NyHVMLTXhgTB9dE1VrKciKGeYML9pXFizDuW7ARQQ4N
  -     LP Token Account: EwWEs1TjB2XmGxmTMoTze1gQKfpm76kT4u6x6ngHzaAa
  -     Pool created for token: B1Yhn1aypY8sDLbdamcrFvZsVRGXPzvo5nDgyeaSmhzU with signature: 2QtJUsAzSWLjuDaGVZSmtozFcAYcEEkjmgPgAkcfbTuZSA4nEhAk8tHq1ZtKrZ8sQdTZou7KCPWhmpvDLCNTZM6J

  #### MOODENG token:
  -     Pool Account: C6tWtChv9rK3wwf5NdwvwvWghiZmaHbsMihFoBjrBksb
  -     Pool Token Account: 7YaeHRrNWEcazXoaSQBq8ZXRD8QHtSZqm3Nr6khtWW2M
  -     LP Token Mint Account: 2rWmMZn5gncaDYjuz8UKtDbL3JdcEUtWjQrzmhQaJmDn
  -     LP Token Account: GBBaVkp4AbFjn5WWcPasYCW7tRPzKx5LdbtZMWW2v8vc
  -     Pool created for token: 7iiZfGagYpn1c2C9KXKeSRFRVHFBBQeQsqAnVHGoJ3s5 with signature: MDkpCvi5JrsoSA7yWPDyFBdz6Gd1X9vJvUwboJQhXMHNacoYvq3P5jWEkZmCpMDbmKv8GoLVVSx47RwD5UuHDfa

  #### POPCAT token:
  -     Pool Account: 8aU216VZhog19iYvWDiShCWy7ykTd2D1RHaQUeSd5RLy
  -     Pool Token Account: GedEBAgKbPnNc4LhgTFpXLWByvd4jzmW57RRtGBihEUk
  -     LP Token Mint Account: 7iW7gA7YaibJVEN4kFd4vC9s2iACCJbhHBhrHzcaFTGo
  -     LP Token Account: 6KVWxa3JJjkDzTgv9VwTQ5ceE7Py1DiqGotGx5Sycyz7
  -     Pool created for token: HzZGhbJQ9T6VZrffMtEVtGt51sNhKSAEHEY4T8xEud9Q with signature: eHFFq5KUjBsoRW9xW19m6AmHZvxCxbDCCDUe22tGxMXaYCbsz1zkNQEZQG9i7BASoPquWwQnX2RmDLJ5YRuKsYi

  #### GIGACHAT token:
  -     Pool Account: 8pzHGfLxa6McF7NaJeEAFUeYvdnz2Cep6n17bGjWEFTF
  -     Pool Token Account: 7HqnjSAD4KCW6VJ7bxsNmJiMTxPFnEPrLhVqaTWNa5mw
  -     LP Token Mint Account: GsTpabYD9X7VizgBng1AVugdmRJifSG6hHC1FvZqE5TZ
  -     LP Token Account: H35HWfCYn1yaaRFJonddN21BmYxu7Ss2h1g2rM8Q3KgB
  -     Pool created for token: 2HHGkN3PEKiDT2ZiE65VuW6BvjdUQsxySmdZ2JF4RAf3 with signature: 5mfgaBYcqhVxYJeA8Ps2wavV2RBfyVkX1tkUCLPHsyZupeqNcRBXb9DHoPHe2LyAh1ypeJvx78dQFVYCDxSrpMo3


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
