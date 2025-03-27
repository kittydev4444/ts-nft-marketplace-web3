# NFT Marketplace 

The final project for the Cyfrin Web3 Full Stack crash course, where we introduce:

1. Indexing (rindexer)
2. Fleek CLI
4. Compliance Engine
5. USDC payment
6. Gashawk

# NFT Marketplace

A full-stack NFT marketplace with listing, buying, and compliance features built with Next.js, TypeScript, and Wagmi.

- [NFT Marketplace](#nft-marketplace)
- [NFT Marketplace](#nft-marketplace-1)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
    - [Environment Variables](#environment-variables)
  - [Setup](#setup)
    - [Add Anvil to your metamask](#add-anvil-to-your-metamask)
  - [Running the Application](#running-the-application)
- [Database Reset](#database-reset)
- [Features](#features)
- [Addresses for testing](#addresses-for-testing)

# Getting Started

## Requirements

- [node](https://nodejs.org/en/download)
    - You'll know you've installed it right if you can run `node --version` and get a response like `v18.0.0`
- [pnpm](https://pnpm.io/)
    - You'll know you've installed it right if you can run `pnpm --version` and get a response like `8.0.0`
- [git](https://git-scm.com/downloads)
    - You'll know you've installed it right if you can run `git --version` and get a response like `git version 2.33.0`
- [foundry](https://book.getfoundry.sh/)
    - For running a local Ethereum blockchain with `anvil`
- [docker](https://www.docker.com/get-started/)
    - For running the indexer database
- [rindexer](https://github.com/joshstevens19/rindexer)
    - For indexing blockchain events into a queryable database

### Environment Variables

Create a `.env.local` file with the following environment variables:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
GRAPHQL_API_URL=http://localhost:3001/graphql
CIRCLE_API_KEY=TEST_API_KEY
```

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Get this from [WalletConnect Cloud](https://cloud.walletconnect.com/)
- `GRAPHQL_API_URL`: Points to your local indexer GraphQL endpoint
- `CIRCLE_API_KEY`: Get this from [Circle Developer Portal](https://developers.circle.com/w3s/smart-contract-platform)

## Setup

```bash
git clone https://github.com/cyfrin/ts-nft-marketplace-cu
cd nft-marketplace
pnpm install
```

When you run `anvil`, you'll get some private keys. 


### Add Anvil to your metamask

Add the following network to your metamask:
- Name: Anvil
- RPC URL: http://127.0.0.1:8545
- Chain ID: 31337
- Currency Symbol: ETH

Add then, anvil account 0 and anvil account 9 to your metamask, and you'll see you already have some NFTs!

## Running the Application

The application requires three components running in parallel:

- Local Ethereum blockchain (anvil)
- Blockchain indexer
- Next.js application

```bash
pnpm anvil
pnpm indexer
pnpm run dev
```

Make sure you have a wallet (like MetaMask) connected to your anvil instance with the address that has some mock tokens.

# Database Reset
If you need to reset the indexer database:

```bash
pnpm run reset-indexer
```

This will stop the indexer, remove the volume, and restart it.

# Features

- NFT Minting: Create new NFTs with the CakeNFT contract
- NFT Listing: List your NFTs for sale on the marketplace
- NFT Buying: Purchase NFTs that others have listed
- Recently Listed NFTs: View the most recent NFTs available for purchase
- Address Compliance: Integrated with Circle's compliance API to screen addresses
- Wallet Integration: Connect with MetaMask, Rainbow, and other wallets via WalletConnect

# Addresses for testing

- usdc: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
- nftMarketplace: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
- cakeNft: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
- moodNft: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"