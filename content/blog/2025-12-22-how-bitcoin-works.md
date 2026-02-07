+++
title = "How Bitcoin works"
description = "How Bitcoin solves digital money: Transactions are signed with cryptographic keys, grouped into blocks through proof-of-work mining, and chained together via hashes. The network of nodes enforces rules without any central authority. This post covers the blockchain, UTXO model, mining mechanics, wallet security, network architecture, confirmation depth, incentive alignment, and Lightning Network."
[taxonomies]
tags = [ "bitcoin", "cryptography", "tutorial" ]
[extra]
subtitle = "Blockchain, cryptography, and consensus"
static_thumbnail = "/images/blog/2025-12-21/cover.jpg"
series = "bitcoin"
series_order = 6
related_posts = [
  "blog/2024-07-06-programmable-money.md",
  "blog/2024-07-13-pretty-good-privacy.md",
  "blog/2024-12-11-the-cypherpunks.md",
  "blog/2025-02-17-run-your-ln-node.md",
  "blog/2025-11-21-bitcoin-fundamentals.md",
]
related_readings = [
  "readings/2023-07-10-the-book-of-satoshi.md",
  "readings/2024-06-21-the-genesis-book.md",
  "readings/2024-07-05-mastering-bitcoin.md",
]
+++

![blog-cover](/images/blog/2025-12-21/cover.jpg)

This post explains how Bitcoin works under the hood. If you're looking for why Bitcoin matters, start with [Bitcoin Fundamentals](/blog/bitcoin-fundamentals/).

<!-- more -->

*For the technically curious.*

{{ youtube(id="bBC-nXj3Ng4") }}

## The Blockchain

### The Double-Spend Problem

Digital money has a fundamental problem: how do you prevent someone from copying their coins and spending them twice? Traditional systems solve this with a central authority (banks, PayPal) that tracks who owns what. Bitcoin's breakthrough was solving this without any central party.

The solution: a shared ledger that everyone can verify but no one controls.

### How It Works

Bitcoin uses a blockchain: a chain of blocks where each block contains transactions and links to the previous block through cryptographic hashes.

A **hash function** takes any input and produces a fixed-size fingerprint. Change one bit of input, and the output changes completely. This makes tampering obvious. Bitcoin uses SHA-256, which produces a 256-bit output.

Each block contains:
- A list of transactions
- A hash of the previous block header
- A proof-of-work solution (more below)

Before transactions get into a block, they wait in the mempool. Miners pick transactions from this pool, prioritizing those with higher fees. Watch this in real-time at [mempool.space](https://mempool.space/).

Every node keeps a complete copy of the blockchain. No single server to hack, no central database to corrupt. To change history, you'd need to rewrite blocks on the majority of nodes worldwide.

{% deep_dive(title="Block Structure") %}

A block has two parts: the **header** (80 bytes) and the **body** (transactions).

The header contains:
- **Version**: Protocol version
- **Previous block hash**: Links to the chain
- **Merkle root**: Hash of all transactions in the block
- **Timestamp**: When the block was created
- **Difficulty target**: How hard the puzzle was
- **Nonce**: The solution miners found

**Merkle trees** organize transactions efficiently. Each transaction is hashed, then pairs of hashes are combined and hashed again, building up to a single root hash. This allows proving a transaction exists in a block without downloading all transactions. Useful for lightweight wallets.

Block weight is measured in virtual bytes (vB). The limit is 4 million weight units, roughly 1-1.5 MB of data per block.

{% end %}

## Transactions & Cryptography

### The UTXO Model

Bitcoin doesn't use accounts with balances. Instead, it tracks **Unspent Transaction Outputs (UTXOs)**. Think of them as digital coins of varying sizes.

When you receive bitcoin, you get a UTXO. When you spend, you consume entire UTXOs as inputs and create new ones as outputs. If you have a 1 BTC UTXO and want to send 0.3 BTC, you spend the whole UTXO and create two outputs: 0.3 BTC to the recipient and ~0.7 BTC back to yourself (minus fees).

Your "balance" is the sum of all UTXOs you can spend.

### Public-Key Cryptography

Bitcoin transactions use public-key cryptography:

- **Private key**: A secret 256-bit number. This proves ownership.
- **Public key**: Derived mathematically from the private key. Shared publicly.

When you send bitcoin, you sign the transaction with your private key. This signature proves you own the UTXOs being spent without revealing the private key. Anyone can verify the signature using your public key.

### Programmable Money

Bitcoin isn't just digital cash. It has its own programming language called **Script**. Every transaction includes a small program that defines the conditions for spending.

Most transactions use simple scripts: "whoever can prove they own this public key can spend these coins." But Script enables much more: multi-signature wallets requiring multiple keys, time-locked transactions that can't be spent until a certain date, and complex conditions combining multiple requirements.

This makes Bitcoin programmable money. For a deeper dive into Script and address types, see [Programmable Money](/blog/programmable-money/).

{% deep_dive(title="Elliptic Curve Cryptography") %}

Bitcoin uses **ECDSA** (Elliptic Curve Digital Signature Algorithm) with the **secp256k1** curve. This curve was chosen for efficiency and because it wasn't designed by any government agency (unlike NIST curves), reducing backdoor concerns.

A private key is a random 256-bit integer. The public key is derived by multiplying this number by a generator point on the curve. Easy to compute forward, practically impossible to reverse.

**Transaction signing** involves:
1. Hashing the transaction data
2. Creating a signature using the private key
3. Including the signature and public key in the transaction

**SIGHASH flags** control what parts of a transaction the signature covers:
- `SIGHASH_ALL`: Signs all inputs and outputs (most common)
- `SIGHASH_NONE`: Signs inputs only
- `SIGHASH_SINGLE`: Signs one specific output
- These can be combined with `ANYONECANPAY` for advanced use cases

{% end %}

## Mining & Consensus

How does a decentralized network agree on which transactions are valid? Through proof-of-work mining.

### The Puzzle

Miners race to find a number (the **nonce**) that, when combined with the block header and hashed, produces a result below a target value. It's like rolling dice until you get a number under 100, except with 2^256 possible outcomes.

The work is:
- **Hard to find**: Requires trillions of guesses
- **Easy to verify**: One hash check proves the solution

This asymmetry is key. Anyone can verify a block instantly, but creating one requires real computational work.

### Why It Matters

Mining serves three purposes:

1. **Secures the network**: Rewriting history means redoing all hash work
2. **Issues new coins**: Following a predictable schedule (halving every 210,000 blocks)
3. **Processes transactions**: Including them in the permanent record

Every 2016 blocks (~2 weeks), the network adjusts difficulty to maintain ~10 minute block times. More hashpower joins? Puzzles get harder. Hashpower leaves? Puzzles get easier.

Explore mining pools and hashrate at [mempool.space/mining](https://mempool.space/mining).

{% deep_dive(title="Difficulty and Game Theory") %}

**Difficulty calculation**: The target is a 256-bit number. A valid block hash must be below this target. Lower target = harder puzzle. The network adjusts every 2016 blocks based on how long those blocks actually took vs. the expected 20,160 minutes.

{{ youtube(id="S9JGmA5_unY") }}

**Hashrate and security**: Bitcoin's security comes from the cost to rewrite history. With ~500 EH/s (exahashes per second) of hashrate, attacking the network would require controlling majority hashpower. That means billions in hardware and electricity, plus the attack would crash the asset's value.

**Economic incentives**: Miners spend real resources (electricity, hardware). They only profit if they play by the rules. A miner who creates invalid blocks wastes their work because nodes reject invalid blocks. This aligns individual profit motive with network security.

**51% attacks**: If an attacker controlled majority hashrate, they could theoretically double-spend by mining an alternative chain. But the economics make this irrational for large values: the attack destroys the value of what you're stealing.

{% end %}

## Addresses & Wallets

Bitcoin addresses are derived from public keys. Different formats have evolved:

- **P2PKH**: Legacy addresses starting with "1"
- **P2SH**: Script addresses starting with "3"
- **P2WPKH**: Native SegWit addresses starting with "bc1q"
- **P2TR**: Taproot addresses starting with "bc1p"

For technical details on each type, see [Programmable Money](/blog/programmable-money/#common-bitcoin-address-types).

### Wallets

A wallet manages your keys and constructs transactions. It doesn't hold your coins. Coins exist on the blockchain. The wallet holds keys that prove you can spend them.

**Hot wallets** connect to the internet. Convenient for daily use, more vulnerable. Examples: phone apps, browser extensions.

**Cold wallets** stay offline. More secure for savings. Examples: hardware wallets (Ledger, Trezor), paper wallets.

### HD Wallets and Seed Phrases

Modern wallets are **Hierarchical Deterministic (HD)**. One master seed generates unlimited keys in a tree structure. Back up the seed once, recover everything.

**BIP-39** defines the 12 or 24-word seed phrase most wallets use. These words encode entropy that derives all your keys. Lose the phrase, lose access. Anyone with the phrase controls the funds.

> Never store seed phrases digitally. Write them down. Store securely offline.

## The Network

Bitcoin is a peer-to-peer network. No central servers. Nodes connect to each other, share transactions and blocks, and enforce rules independently.

### Node Types

**Full nodes** download and validate every block and transaction. They enforce all consensus rules and don't trust anyone. Running a full node means you verify everything yourself.

**SPV (light) clients** only download block headers. They trust that miners validated the transactions. Less security, but works on phones and low-power devices.

**Mining nodes** are full nodes that also compete to create new blocks.

### How Transactions Propagate

When you broadcast a transaction:
1. Your wallet sends it to connected nodes
2. Each node validates and forwards to its peers
3. Within seconds, the transaction reaches most of the network
4. Miners include it in their candidate blocks

Blocks propagate similarly. When a miner finds a valid block, it spreads across the network in seconds.

{% deep_dive(title="Network Architecture") %}

**Peer discovery**: Nodes find each other through DNS seeds (hardcoded addresses that return active node IPs) and by sharing peer addresses with connected nodes.

**Gossip protocol**: Information spreads through "inv" (inventory) messages. A node announces it has something new, peers request it if interested. This prevents bandwidth waste from duplicate data.

**Compact blocks** (BIP-152) speed up block propagation. Since nodes already have most transactions in their mempool, blocks can be transmitted as just the header plus short transaction IDs.

{% end %}

## Security & Confirmations

### Why Confirmations Matter

When a transaction is included in a block, it has 1 confirmation. Each subsequent block adds another confirmation.

More confirmations = harder to reverse. To undo a confirmed transaction, an attacker would need to mine an alternative chain faster than the honest network. Each block makes this exponentially harder.

**General guidelines:**
- 0 confirmations: Transaction broadcast but not yet in a block. Can be double-spent.
- 1 confirmation: In a block. Reversal requires significant hashpower.
- 6 confirmations: Standard for large amounts. Reversal practically impossible.

{% deep_dive(title="Confirmation Security") %}

Satoshi's whitepaper includes the probability calculation. With an attacker controlling fraction `q` of hashpower:

- If `q < 0.5`: Probability of catching up decreases exponentially with each confirmation
- At 6 confirmations with `q = 0.1` (10% hashpower): Success probability < 0.1%

The "6 confirmations" rule assumes a well-funded attacker with substantial but minority hashpower. For smaller transactions, fewer confirmations are often acceptable.

**Finality in Bitcoin** is probabilistic, not absolute. But after enough confirmations, the probability of reversal approaches zero for any realistic attacker.

{% end %}

## Incentive Alignment

Bitcoin isn't just a clever technology. It's a system where every participant's self-interest reinforces the network.

- **Miners** invest in hardware and electricity. They only profit by producing valid blocks. Cheating wastes their investment because nodes reject invalid blocks instantly.

- **Nodes** enforce the rules to protect their own holdings. A node operator who accepts invalid transactions devalues their own bitcoin. Self-interest makes them honest validators.

- **Users** pay fees to get transactions processed. Higher fees mean faster confirmation. This creates demand for block space and funds network security.

- **Developers** contribute to software they themselves use. Bugs hurt their own holdings. Improvements benefit everyone, including them.

- **Holders** benefit from network security and adoption. The more secure and useful Bitcoin becomes, the more valuable their holdings. They're incentivized to support the ecosystem.

No central coordinator. No trust required. Everyone acts in their own interest, and the system benefits everyone.

> "Don't trust, verify." Anyone can run a node and verify every transaction, every block, every rule. You don't need to trust banks, governments, or even other Bitcoin users. The math proves itself.

## Scaling: The Lightning Network

Bitcoin's base layer processes about 7 transactions per second. That's by design: keeping things decentralized requires blocks small enough for anyone to verify. But this limits how many transactions it can handle.

The Lightning Network solves this with a second layer built on top of Bitcoin. It enables:

- **Instant payments**: No waiting for block confirmations
- **Near-zero fees**: Fractions of a cent
- **High capacity**: Millions of transactions per second

Lightning works by opening "payment channels" between parties. Transactions within a channel happen off-chain, instantly. Only the opening and closing of channels require on-chain transactions. You can visualize the network topology and statistics at [mempool.space/lightning](https://mempool.space/lightning).

> Bitcoin's base layer provides security and final settlement. Lightning provides speed and scale. Different tools for different jobs.

If you want to run your own Lightning node and take full control of your payments, I wrote a guide on how to [Run your LN node on a Raspberry Pi](/blog/run-your-ln-node/).

{% deep_dive(title="How Lightning Works") %}

Payment channels use **2-of-2 multisig** addresses. Both parties must sign to move funds. This creates a shared account that neither can steal from.

**HTLCs (Hash Time-Locked Contracts)** enable multi-hop payments. The mechanism:
1. Alice wants to pay Carol through Bob
2. Carol generates a secret and gives Alice the hash
3. Alice creates an HTLC: "Bob gets paid if he reveals the secret within 24 hours"
4. Bob creates a similar HTLC with Carol
5. Carol reveals the secret to Bob, claiming payment
6. Bob uses the same secret to claim from Alice

If anyone fails to cooperate, the timelock expires and funds return. The secret travels backward, payments travel forward.

**Watchtowers** monitor the blockchain for cheating attempts. If your counterparty tries to broadcast an old channel state, the watchtower can penalize them, even while you're offline.

{% end %}

## The Bigger Picture

What makes Bitcoin remarkable isn't any single component. It's how they fit together into a self-reinforcing system.

Cryptography proves ownership without trusted authorities. Proof-of-work makes history expensive to rewrite. Economic incentives turn individual greed into collective security. Decentralization removes single points of failure. And the fixed supply creates digital scarcity for the first time in history.

Every piece supports every other piece. Remove one, and the system weakens. Together, they create something that has never existed before: money that can't be inflated, transactions that can't be censored, and property that can't be confiscated.

> No banks. No governments. No trusted third parties. Just math, code, and a global network of nodes all enforcing the same rules.

Whether that matters to you depends on where you live and how much you trust your institutions. But the option exists now. And no one can take it away.

{% deep_dive(title="Rabbit Holes") %}

Bitcoin's technical depth goes far beyond what fits in one post. Here are topics worth exploring if you want to go deeper:

**[SegWit](https://bitcoinops.org/en/topics/segregated-witness/)** (Segregated Witness) was Bitcoin's 2017 upgrade that moved signature data outside the main transaction structure. This fixed transaction malleability (a bug that prevented Lightning), introduced block weight for more efficient space usage, and did it all while staying backwards-compatible with old nodes.

**[Taproot & Schnorr](https://bitcoinops.org/en/topics/taproot/)** landed in 2021, upgrading Bitcoin's cryptography. Schnorr signatures are smaller and enable aggregation (multiple signatures become one). Taproot makes complex spending conditions look identical to simple payments on-chain, improving both privacy and efficiency.

**[Soft forks vs hard forks](https://bitcoin.stackexchange.com/questions/30817/what-is-a-soft-fork)**: How does Bitcoin upgrade without a central authority? Soft forks add new rules that old nodes still accept. Hard forks change rules in ways old nodes reject. Understanding this distinction explains why Bitcoin evolves slowly and why contentious changes are rare.

**[Fee mechanics](https://mempool.space/docs/faq#what-is-rbf)**: The fee market is more nuanced than "pay more, confirm faster." Replace-By-Fee (RBF) lets you bump a stuck transaction's fee. Child-Pays-For-Parent (CPFP) lets recipients accelerate incoming payments by spending them with high fees.

**[Timelocks](https://bitcoinops.org/en/topics/timelocks/)**: Bitcoin can lock funds until conditions are met. `CLTV` (CheckLockTimeVerify) locks until a specific block height or timestamp. `CSV` (CheckSequenceVerify) locks for a relative time after confirmation. These primitives enable Lightning channels, inheritance schemes, and atomic swaps.

**[Coinbase transactions](https://learnmeabitcoin.com/technical/mining/coinbase-transaction/)**: The only way new bitcoin enters circulation. Every block begins with a special transaction that pays the miner the block reward plus all fees. These newly minted coins can't be spent for 100 blocks, a rule that protects against chain reorganizations.

The deeper you go, the more you find.

{% end %}
