+++
title = "How Bitcoin Works"
description = "A technical introduction to Bitcoin: blockchain, cryptography, mining, addresses, and the Lightning Network."
draft = true
[taxonomies]
tags = [ "bitcoin", "cryptography", "tutorial" ]
[extra]
subtitle = "Blockchain, cryptography, and consensus"
static_thumbnail = "/images/blog/2025-12-13/cover.jpg"
+++

![blog-cover](/images/blog/2025-12-13/cover.jpg)

This post explains how Bitcoin works under the hood. If you're looking for why Bitcoin matters, start with [Understanding Bitcoin](/blog/understanding-bitcoin/).

<!-- more -->

<div class="tldr">

Bitcoin is a decentralized network where transactions are verified by cryptography, grouped into blocks by miners, and stored in an immutable chain. No central authority needed.

</div>

*For the technically curious.*

{{ youtube(id="bBC-nXj3Ng4") }}

## The Blockchain

Bitcoin uses a blockchain: a shared record book that stores every transaction ever made. Think of it as a public accounting book that anyone can read but no one can change (except by following the rules).

The blockchain is a chain of blocks. Each block contains:
- A list of transactions
- A reference to the previous block
- A proof-of-work (more on this below)

Before transactions get into a block, they wait in the mempool (memory pool). Miners pick transactions from this pool, prioritizing those with higher fees. You can watch this happen in real-time at [mempool.space](https://mempool.space/), a visual tool that shows pending transactions, recent blocks, and network activity.

Every node (computer running Bitcoin software) keeps a complete copy of the blockchain. There's no single server to hack, no central database to corrupt. To change history, you'd need to rewrite the blockchain on the majority of nodes worldwide. Practically impossible.

## Transactions & Cryptography

Bitcoin transactions use public-key cryptography. You have two keys:

- **Private key**: A secret number that proves ownership. Keep this safe.
- **Public key**: Derived from the private key. Used to receive funds.

When you send Bitcoin, you create a transaction that says "I'm sending X BTC from this address to that address" and sign it with your private key. This signature proves you own the funds without revealing your private key.

For a deeper dive into how Bitcoin scripts work and the different address types, see [Programmable Money](/blog/programmable-money/). For background on cryptographic signatures, [Pretty Good Privacy](/blog/pretty-good-privacy/) covers the fundamentals.

## Mining & Consensus

How does a decentralized network agree on which transactions are valid? Through proof-of-work mining.

Miners compete to solve computational puzzles. The first to find a valid solution gets to add the next block to the chain and receives newly created bitcoins as a reward. This process:

1. **Secures the network**: Rewriting history requires redoing all the hash work
2. **Issues new coins**: Following the predictable supply schedule
3. **Processes transactions**: Including them in blocks for permanent record

Every 2016 blocks (roughly every two weeks), the network automatically adjusts the puzzle difficulty to maintain ~10 minute block times. More miners join? Puzzles get harder. Miners leave? Puzzles get easier. No central authority needed. You can explore mining pools and hashrate distribution at [mempool.space/mining](https://mempool.space/mining).

## Addresses & Wallets

Bitcoin addresses are derived from public keys. Over time, different address formats have been developed to improve efficiency and functionality:

- **P2PKH**: Legacy addresses starting with "1"
- **P2SH**: Script addresses starting with "3"
- **P2WPKH**: Native SegWit addresses starting with "bc1q"
- **P2TR**: Taproot addresses starting with "bc1p"

For technical details on each address type and how the scripting system works, see [Programmable Money](/blog/programmable-money/#common-bitcoin-address-types).

A wallet is software that manages your keys and constructs transactions. The wallet doesn't hold your coins. The coins exist on the blockchain. The wallet holds the keys that prove you can spend them.

Two types of wallets:
- **Hot wallets**: Connected to the internet. Convenient for daily use, but more vulnerable to hacks. Examples: phone apps, browser extensions.
- **Cold wallets**: Offline storage. More secure for long-term savings. Examples: hardware wallets (Ledger, Trezor), paper wallets.

## Scaling: The Lightning Network

Bitcoin's base layer processes about 7 transactions per second. That's by design: keeping things decentralized requires blocks small enough for anyone to verify. But this limits how many transactions it can handle.

The Lightning Network solves this with a second layer built on top of Bitcoin. It enables:

- **Instant payments**: No waiting for block confirmations
- **Near-zero fees**: Fractions of a cent
- **High capacity**: Millions of transactions per second

Lightning works by opening "payment channels" between parties. Transactions within a channel happen off-chain, instantly. Only the opening and closing of channels require on-chain transactions. You can visualize the network topology and statistics at [mempool.space/lightning](https://mempool.space/lightning).

> Bitcoin's base layer provides security and final settlement. Lightning provides speed and scale. Different tools for different jobs.

If you want to run your own Lightning node and take full control of your payments, I wrote a guide on how to [Run your LN node on a Raspberry Pi](/blog/run-your-ln-node/).

---

**Related posts**

- [Understanding Bitcoin](/blog/understanding-bitcoin/) <small>Why Bitcoin matters: sound money and financial sovereignty</small>
- [The Cypherpunks](/blog/the-cypherpunks/) <small>Pioneers of privacy in the digital age</small>
- [Programmable Money](/blog/programmable-money/) <small>The power of Bitcoin's Script</small>
- [Run your LN node on a Raspberry Pi](/blog/run-your-ln-node/) <small>Take full control of your Lightning payments</small>
- [Pretty Good Privacy](/blog/pretty-good-privacy/) <small>A beginner's guide to encryption</small>

**Related readings**

- [Mastering Bitcoin](/readings/mastering-bitcoin/) <small>by Andreas M. Antonopoulos, David A. Harding</small>
- [The Genesis Book](/readings/the-genesis-book/) <small>by Aaron van Wirdum</small>
- [The Book Of Satoshi](/readings/the-book-of-satoshi/) <small>by Phil Champagne</small>
