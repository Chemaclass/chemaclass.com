+++
title = "Understanding Bitcoin"
description = "A practical introduction to Bitcoin: why it matters as sound money, how it enables financial freedom, and how it works under the hood."
draft = false
[taxonomies]
tags = [ "bitcoin", "cryptography", "philosophy", "tutorial" ]
[extra]
subtitle = "From sound money to cryptographic proof"
static_thumbnail = "/images/blog/2025-12-13/cover.jpg"
+++

![blog-cover](/images/blog/2025-12-13/cover.jpg)

What would you do if your bank account was frozen tomorrow? No warning, no explanation, no access to your own money.

This isn't hypothetical. In 2022, Canada froze bank accounts of people who donated to a protest. In 2015, Greeks could only withdraw €60 per day from ATMs. In Argentina, Turkey, and Lebanon, people watched their savings lose half their value in months.

Bitcoin exists because these things happen. Understanding it requires going back to basics: what is money, why does it matter, and how does Bitcoin fit into that picture.

<!-- more -->

<div class="tldr">

Bitcoin is digital money with a fixed supply of 21 million, secured by cryptography and a global network of computers. The first half of this post explains why Bitcoin matters (sound money, financial freedom). The second half covers how it works technically, linking to deeper dives in my other posts.

</div>

This post is split in two. The first half is for anyone curious about why Bitcoin matters. The second half is for those with a technical background who want to understand what's happening under the hood.

---

## Why Bitcoin Matters

### A Brief History of Money

Money is a social agreement. A piece of paper, a gold coin, or a number on a screen has value because we all agree it does. This agreement is what makes trade possible.

Throughout history, money has evolved:

1. **Direct trade**: Exchanging goods for goods. "I'll give you my fish for your bread."
2. **Things used as money**: Shells, salt, cattle. Valuable because they were useful or hard to find.
3. **Precious metals**: Gold and silver. Hard to find, long-lasting, easy to divide and carry.
4. **Paper money backed by gold**: Receipts representing gold stored in vaults.
5. **Government money**: Paper backed by nothing but a government's promise. Why does it work? Because governments require you to pay [taxes](/blog/taxes/) in their currency. This forces everyone to use it.

> Money is a way to store and transfer value. The better it performs these functions, the better it serves as money.

What makes good money? These properties:

- **Hard to create**: Cannot be easily made or faked
- **Long-lasting**: Doesn't break down over time
- **Divisible**: Can be broken into smaller pieces
- **Easy to move**: Simple to carry and send
- **Easy to verify**: Simple to check if it's real

Gold does well on most of these. Paper money is easy to move and divide but fails on being hard to create. Governments can print as much as they want. Bitcoin, as we'll see, does well on all of them.

### What is Bitcoin?

Bitcoin is digital money that works without banks, governments, or any central authority. It was created in 2009 by someone (or some group) using the fake name Satoshi Nakamoto. No one knows who this person really is. Bitcoin builds on decades of work by cryptographers and privacy activists. If you're curious about the people and ideas that led to Bitcoin, I wrote about [The Cypherpunks](/blog/the-cypherpunks/) and their vision for digital privacy.

At its core, Bitcoin is:

- **A protocol**: A set of rules that computers follow to agree on who owns what
- **A network**: Thousands of computers worldwide running the Bitcoin software
- **A currency**: Units of account called bitcoins (BTC), divisible to 8 decimal places

There's no company behind Bitcoin. No CEO, no headquarters, no customer support. It's open-source software that anyone can run, inspect, or contribute to.

### Sound Money

#### Scarcity

There will only ever be 21 million bitcoins. This is enforced by the protocol's code, verified by every node on the network. No government, no committee, no emergency meeting can change this.

Compare this to government money. Central banks can (and do) create money whenever they want. The U.S. dollar has lost over 95% of its buying power since 1913. The Euro, the Pound, the Yen: all follow the same pattern of slowly losing value.

> In a world of infinite money printing, a mathematically enforced hard cap is revolutionary.

Bitcoin is often called "digital gold" because it shares gold's scarcity while being easier to store, divide, and transfer. You can send a billion dollars worth of Bitcoin anywhere in the world in minutes, for a few dollars in fees. Try doing that with gold bars.

#### Inflation Protection

When governments print money, the value of existing money decreases. This is inflation. Your savings buy less over time, even while sitting untouched in your bank account.

Inflation is often called a "hidden tax" because it transfers wealth from savers to those who receive the new money first (usually governments and banks). I wrote more about this in [Understanding Taxes](/blog/taxes/).

Bitcoin's supply schedule is fixed and predictable. New bitcoins are created through mining at a rate that halves roughly every four years. By around 2140, all 21 million will have been created. No surprises, no government decisions to print more.

### Freedom & Sovereignty

#### Self-custody

With Bitcoin, you can hold your own money. Not a promise from a bank, not a balance on someone else's books. Actual ownership, secured by cryptographic keys that only you control.

> "Not your keys, not your coins."

This phrase captures a fundamental truth. When you deposit money in a bank, you don't own that money anymore. You own a claim against the bank. If the bank freezes your account, goes bankrupt, or decides you violated their terms of service, your access disappears.

With Bitcoin, there's no freeze button. No account to close. No terms of service to violate. You become your own bank.

#### Permissionless & Borderless

Bitcoin doesn't care about borders, banking hours, or your credit score. You can send money to anyone with an internet connection, anywhere in the world, at any time.

Traditional banking:
- Hours: Monday-Friday, 9-5 (maybe)
- International transfers: 3-5 business days
- Fees: Percentage of transfer + fixed fees
- Requirements: ID, proof of address, account in good standing

Bitcoin:
- Hours: 24/7/365
- Global transfers: ~10 minutes to an hour
- Fees: Based on data size, not amount sent
- Requirements: A Bitcoin address (free, instant, no ID)

#### Censorship Resistance

No central authority controls Bitcoin. No single entity can stop a transaction or reverse a payment. Once confirmed, it's final.

This matters for people living under oppressive governments, facing political pressure, or simply wanting financial privacy. It matters for donations to controversial causes, for journalists protecting sources, for anyone who values financial freedom.

> Financial freedom isn't just about being rich. It's about having control over your own money, regardless of who you are or where you live.

#### Real Stories

These aren't edge cases:

- **Venezuela**: When inflation hit 1,000,000%, people who held Bitcoin preserved their savings. Those who didn't lost everything.
- **Ukraine**: In the first weeks of war, the government received $100M+ in crypto donations. Fast, borderless, no intermediaries.
- **Nigeria**: The government banned crypto exchanges in 2021. Peer-to-peer Bitcoin trading exploded. You can't ban math.
- **Remittances**: Migrant workers send $700 billion home annually. Traditional services take ~10% in fees. Bitcoin can do it for cents.

### Common Objections

Common objections, addressed honestly:

**"It's used for crime."** So is cash. The difference: Bitcoin leaves a permanent, traceable record. The blockchain is a forensic tool. Most criminals prefer dollars.

**"It's too volatile."** True in the short term. Zoom out: Bitcoin has been the best-performing asset of the last decade. Volatility decreases as adoption grows. Don't invest money you need next month.

**"It wastes energy."** Bitcoin mining uses electricity to secure a trillion-dollar network. Much of it comes from stranded energy (gas flares, excess hydro) that would otherwise be wasted. The real question: is financial sovereignty worth the energy cost? Air conditioning uses more.

**"It's too late to buy."** People said this at $100, $1,000, $10,000, and $100,000. If Bitcoin achieves even a fraction of gold's market cap, there's still room to grow.

### Bitcoin Today

This isn't just theory anymore:

- **El Salvador** made Bitcoin legal tender in 2021
- **US Bitcoin ETFs** were approved in 2024, bringing billions in institutional money
- **MicroStrategy** holds 650,000+ BTC as corporate treasury
- **Lightning Network** processes millions of transactions monthly
- **Tens of millions** of people worldwide own Bitcoin

You can dismiss it, or you can understand it.

---

## How Bitcoin Works

If you're not interested in the technical details, feel free to stop here. The sections below are for those who want to understand the machinery.

### The Blockchain

Bitcoin uses a blockchain: a shared record book that stores every transaction ever made. Think of it as a public accounting book that anyone can read but no one can change (except by following the rules).

The blockchain is a chain of blocks. Each block contains:
- A list of transactions
- A reference to the previous block
- A proof-of-work (more on this below)

Every node (computer running Bitcoin software) keeps a complete copy of the blockchain. There's no single server to hack, no central database to corrupt. To change history, you'd need to rewrite the blockchain on the majority of nodes worldwide. Practically impossible.

### Transactions & Cryptography

Bitcoin transactions use public-key cryptography. You have two keys:

- **Private key**: A secret number that proves ownership. Keep this safe.
- **Public key**: Derived from the private key. Used to receive funds.

When you send Bitcoin, you create a transaction that says "I'm sending X BTC from this address to that address" and sign it with your private key. This signature proves you own the funds without revealing your private key.

For a deeper dive into how Bitcoin scripts work and the different address types, see [Programmable Money](/blog/programmable-money/). For background on cryptographic signatures, [Pretty Good Privacy](/blog/pretty-good-privacy/) covers the fundamentals.

### Mining & Consensus

How does a decentralized network agree on which transactions are valid? Through proof-of-work mining.

Miners compete to solve computational puzzles. The first to find a valid solution gets to add the next block to the chain and receives newly created bitcoins as a reward. This process:

1. **Secures the network**: Rewriting history requires redoing all the computational work
2. **Issues new coins**: Following the predictable supply schedule
3. **Processes transactions**: Including them in blocks for permanent record

Every 2016 blocks (roughly every two weeks), the network automatically adjusts the puzzle difficulty to maintain ~10 minute block times. More miners join? Puzzles get harder. Miners leave? Puzzles get easier. No central authority needed.

### Addresses & Wallets

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

### Scaling: The Lightning Network

Bitcoin's base layer processes about 7 transactions per second. That's by design: keeping things decentralized requires blocks small enough for anyone to verify. But this limits how many transactions it can handle.

The Lightning Network solves this with a second layer built on top of Bitcoin. It enables:

- **Instant payments**: No waiting for block confirmations
- **Near-zero fees**: Fractions of a cent
- **High capacity**: Millions of transactions per second

Lightning works by opening "payment channels" between parties. Transactions within a channel happen off-chain, instantly. Only the opening and closing of channels require on-chain transactions.

> Bitcoin's base layer provides security and final settlement. Lightning provides speed and scale. Different tools for different jobs.

If you want to run your own Lightning node and take full control of your payments, I wrote a guide on how to [Run your LN node on a Raspberry Pi](/blog/run-your-ln-node/).

---

## Getting Started

Bitcoin is money that no one controls and everyone can verify. It's scarce in a world of infinite money printing. It's permissionless in a world of financial gatekeepers. It's programmable in ways we're only beginning to explore.

Understanding Bitcoin doesn't require believing it will change the world. It requires understanding what money is, how it evolved, and why these properties matter. From there, you can form your own conclusions.

### Want to try?

The best way to understand Bitcoin is to use it:

1. **Start small**: Buy a small amount on a reputable exchange (Kraken, Coinbase, Bitstamp)
2. **Move it to your own wallet**: Download a mobile wallet like BlueWallet or Muun. Transfer your Bitcoin there. Feel what self-custody means.
3. **Send a transaction**: Send some sats to a friend. Watch it confirm in ~10 minutes.
4. **Try Lightning**: Send an instant, near-free payment. This is the future of everyday transactions.

You don't have to go all in. You just have to start.

---

**Related posts**

- [The Cypherpunks](/blog/the-cypherpunks/) <small>Pioneers of privacy in the digital age</small>
- [Understanding Taxes](/blog/taxes/) <small>Where your money goes and how to rethink the system</small>
- [Programmable Money](/blog/programmable-money/) <small>The power of Bitcoin's Script</small>
- [Run your LN node on a Raspberry Pi](/blog/run-your-ln-node/) <small>Take full control of your Lightning payments</small>
- [Pretty Good Privacy](/blog/pretty-good-privacy/) <small>A beginner's guide to encryption</small>

**Related readings**

- [Mastering Bitcoin](/readings/mastering-bitcoin/) <small>by Andreas M. Antonopoulos, David A. Harding</small>
- [The Genesis Book](/readings/the-genesis-book/) <small>by Aaron van Wirdum</small>
- [The Book Of Satoshi](/readings/the-book-of-satoshi/) <small>by Phil Champagne</small>
