+++
title = "Mastering Bitcoin"
description = "This book covers everything from the basics to the most profound technical aspects of how Bitcoin works. It is an excellent guide through the complex world of Bitcoin, providing the knowledge you need to participate in the Internet of Money."
draft = false
[taxonomies]
tags = [ "software", "bitcoin" ]
[extra]
subtitle = "Programming the Open Blockchain"
pages = "400"
author = "Andreas M. Antonopoulos, David A. Harding"
static_thumbnail = "https://m.media-amazon.com/images/I/71JEv9rs7xL.jpg"
expand_preview = true
+++

<img border="0" src="https://m.media-amazon.com/images/I/71JEv9rs7xL.jpg" >

This book covers everything from the basics to the most profound technical aspects of Bitcoin. It is an excellent guide through this complex world, providing the knowledge you need to participate in the Internet of money.

<!-- more -->

The first edition of this book was published in December 2014. Ten years later, a third edition with up-to-date knowledge just came out. It is highly recommended to all people interested in this outstanding topic and the tech behind it.

- A broad introduction to Bitcoin and its underlying blockchain--ideal for nontechnical users, investors, and business executives.
- An explanation of Bitcoin's technical foundation and cryptographic currency for developers, engineers, and software and systems architects.
- Details of the Bitcoin decentralized network, peer-to-peer architecture, transaction lifecycle, and security principles.
- New developments such as Taproot, Tapscript, Schnorr signatures, and the Lightning Network.
- A deep dive into Bitcoin applications, including how to combine the building blocks this platform offers into powerful new tools.
- User stories, analogies, examples, and code snippets illustrating key technical concepts.

---

## Contents

1. Introduction
2. How Bitcoin Works
3. Bitcoin Core: The Reference Implementation
4. Keys and Addresses
5. Wallet recovery
6. Transactions
7. Authorization and Authentication
8. Digital Signatures
9. Transaction Fees
10. The Bitcoin Network
11. The Blockchain
12. Mining and Consensus
13. Bitcoin Security
14. Second-Layer Applications

![blog-footer](/images/readings/2024-07-05/footer.jpg)

> Full book also on [GitHub](https://github.com/bitcoinbook/bitcoinbook).

### Key takeaways

1. Your wallet doesn't store any bitcoins, only the keys to access them. The coins are stored in the blockchain.
1. Understanding **UTXOs** is crucial to understanding how transactions work.
   - These are outputs from previous transactions that have not yet been spent
1. A transaction needs:
   - **inputs**: UTXOs and an unlocking script (scriptSig) which proves ownership.
   - **outputs**: the recipient's address and the amount to send.
1. The unlocking script is written in a custom language called [**Script**](https://en.bitcoin.it/wiki/Script).
   - Transaction validation is achieved through the execution of a script.
   - This allows for a nearly infinite variety of conditions to be expressed.
   - Script is a stack-based lang, processed from left to right. 
1. Bitcoin is often referred to as "**programmable money**" because it allows: Multisignature, timelocking and conditional spending. 
   - Extends Bitcoin's functionality beyond simple value transfers.
1. Common Bitcoin **address types**:
   - P2PKH: Begins with `1`. Standard transactions using public key hashes.
   - P2SH: Begins with `3`. Encapsulates complex scripts like multisig.
   - P2WPKH: Begins with `bc1`. Native SegWit, more efficient transactions.
   - P2WSH: Begins with `bc1`. SegWit for complex scripts.
   - P2TR: Begins with `bc1p`. Taproot, enhanced privacy and efficiency.
   - Bech32: Starts with `bc1`. Human-readable, designed for SegWit and Taproot.
1. Digital signatures serve three purposes in Bitcoin transactions: 
   - First, it proves that the controller of a private key has **authorized** the spending of those funds. 
   - Secondly, the proof of authorization is **undeniable**. 
   - Thirdly, the authorized transaction **cannot be changed** by unauthenticated third parties.
1. [Schnorr's signatures](https://en.wikipedia.org/wiki/Schnorr_signature) aren't specific to the [elliptic curve cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) (ECC) that Bitcoin uses, although it is most associated with ECC today. They have a number of nice properties:
   - **Provable security**: strong security guarantees based on the hardness of the discrete logarithm problem, with formal proofs ensuring their robustness against attacks.
   - **Linearity**: allows for efficient aggregation of multiple signatures into a single compact signature, simplifying verification processes.
   - **Batch verification**: enabling multiple signatures to be verified simultaneously in a more computationally efficient manner.
1. The best known secure secret sharing algorithm is [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir's_secret_sharing).
1. Running a **full node** gives you the pure Bitcoin experience: independent verification of all transactions without trusting any other system.
1. **Merkle tres** are used to summarize all transactions in a block, producing an overall commitment to the entire set of transactions and permitting a very efficient process to verify whether a transaction is included in a block.
1. Mining is one of the inventions that make Bitcoin special, a **decentralized consensus** mechanism that is the basis for P2P digital cash.
   - It secures the Bitcoin system and enables the emergence of network-wide consensus without a central authority.
1. A **soft-fork** is a forward-compatible change to the consensus rules that allows unupgraded clients to continue to operate in consensus with the new rules.

---

### Related posts

- [Programmable Money](/blog/programmable-money) <small>The power of Bitcoin's Script</small>

### Related readings

- [The Genesis Book](/readings/the-genesis-book/) <small>by Aaron van Wirdum</small>
- [The Blocksize War](/readings/the-blocksize-war/) <small>by Jonathan Bier</small>
- [The Bitcoin Standard](/readings/the-bitcoin-standard/) <small>by Saifedean Ammous</small>
- [The Book Of Satoshi](/readings/the-book-of-satoshi/) <small>by Phil Champagne</small>
