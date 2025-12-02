+++
title = "Run your LN node on a Raspberry Pi"
aliases = [ "/blog/run-your-ln-node" ]
description = "In this guide, I'll show you how to set up a fully custodial Lightning Network (LN) node using Alby Hub on a Raspberry Pi, giving you complete control over your node. Alby Hub offers a DIY free version for a self-custodial Lightning wallet, ensuring full ownership of your funds while being 100% open-source."
draft = false
[taxonomies]
tags = [ "bitcoin", "open-source", "privacy", "tutorial" ]
[extra]
subtitle = "Take full control of your Lightning payments with Alby Hub"
static_thumbnail = "/images/blog/2025-02-17/cover.jpg"
+++

![blog-cover](/images/blog/2025-02-17/cover.jpg)

In this guide, I'll show you how to set up a fully custodial Lightning Network (LN) node using Alby Hub on a Raspberry Pi, giving you complete control over your node. Alby Hub offers a DIY free version for a self-custodial Lightning wallet, ensuring full ownership of your funds while being 100% open-source. 

<!-- more -->

<div class="tldr">

Set up a self-custodial Lightning node on a Raspberry Pi using Alby Hub. Full control of your funds, 100% open-source, and easy to manage with the Alby Go mobile app.

</div>

It supports both Lightning and Nostr addresses, enabling seamless connectivity across ecosystems, and integrates effortlessly with dozens of Bitcoin applications. With built-in Lightning Service Provider (LSP) services and the Alby Go mobile app, managing your node on the go has never been easier.

---

> Important: This is NOT a Bitcoin miner or a full node. It's simply a Raspberry Pi running on an SD card power-efficient and low-cost.

⚠️ **Disclaimer** ⚠️
- I assume you **understand [Bitcoin](https://bitcoin.org/)**'s fundamental concepts.
- I assume you know **how the [Lightning Network](https://lightning.network/) (LN) works**.

Anyway, I've included a brief recap of the Lightning Network basics below.

## What is the Lightning Network?

The LN is a second-layer solution built on top of Bitcoin to enable fast, cheap, and scalable transactions.

- **Why?** Bitcoin's base layer is secure but slow and expensive for small payments due to block size limits and fees.
- **How?** LN uses off-chain payment channels that allow users to transact instantly without waiting for blockchain confirmations.

### Key Concepts

- **Payment Channels**: Users open a channel by making an on-chain transaction, then send unlimited instant payments within that channel.
- **Routing**: You don't need a direct channel with everyone —payments can be routed through multiple connected nodes.
- **Low Fees**: Only opening/closing channels require on-chain fees; most transactions cost fractions of a cent.

### Goal

LN makes Bitcoin usable for everyday transactions, like buying coffee, without waiting 10+ minutes for confirmations.

> In short: Lightning Network = Instant + Cheap Bitcoin payments, secured by Bitcoin's blockchain.

---

## Setting up Alby Hub

[Alby Hub](https://albyhub.com/) is a free, open-source ([ideally private](https://guides.getalby.com/user-guide/alby-account-and-browser-extension/alby-hub/faq-alby-hub/should-i-open-a-private-or-public-channel)) Lightning Network node.

### Requirements

Before we begin, you are going to need the following things:

- A windows or mac or linux computer
- **Raspberry Pi 4** or **5** (For [**Zero 2W** see this tutorial!](https://guides.getalby.com/user-guide/alby-account-and-browser-extension/hidden-archives/raspberry-pi-zero))
  - _In this tutorial, I am using a raspi-4b (~60€)_
- The charger for your raspi _(~10€)_
- SD memory card (32/64gb) _(~10€)_
- Adapter SD card to USB (to flash the OS into the raspi) _(~10€)_

![tutorial](/images/blog/2025-02-17/requirements.jpg)

### Installation Steps

#### 1. Flash a Linux kernel into the SD card

> Suggestion: You can use [RPI imager](https://www.raspberrypi.com/software/) on your computer.
Use it to flash the recommended raspi OS for you

![tutorial](/images/blog/2025-02-17/tuto-1.jpg)

On the Storage you will see your SD card after inserting it into your laptop.

![tutorial](/images/blog/2025-02-17/tuto-2.jpg)

Once you click "Next", you will see different settings. Click to **Edit Settings**

![tutorial](/images/blog/2025-02-17/tuto-3.jpg)

On `Settings > General`: set your hostname, the username and password for your admin user.
Make sure you enable your WIFI, otherwise you will have to plug it to the router with an RJ-45.
<span id="hostname-setup"></span>
> For this tutorial, I am using `testhub` as hostname, you can use `albyhub` or whatever you prefer.

![tutorial](/images/blog/2025-02-17/tuto-4.jpg)

<span id="pi-enable-ssh"></span>
On `Settings > Services`: make sure the access via SSH is enabled. We are going to need it to install Alby Hub.

![tutorial](/images/blog/2025-02-17/tuto-5.jpg)

Click "Save" and click "Yes" to start the installation.

![tutorial](/images/blog/2025-02-17/tuto-6.jpg)

You will see a confirmation. Click "Yes". It will take ~10 mins...

![tutorial](/images/blog/2025-02-17/tuto-7.jpg)

Now we got the SD with a fresh linux kernel ready to use!

![tutorial](/images/blog/2025-02-17/tuto-8.jpg)

#### 2. Insert the SD into the raspi

Extract the SD from the laptop and insert it in the raspi first.

![tutorial](/images/blog/2025-02-17/tuto-9.jpg)

Once the SD is inserted, then plug in the power cable. It will turn on automatically as soon as you plug it in.

![tutorial](/images/blog/2025-02-17/tuto-10.jpg)

#### 3. Alby Hub installation

It will take ~5mins since you turned it on to be able to access to it. How can you make sure it's alive? Open the terminal and ping the hostname you defined while flashing the SD on [Settings > General](/blog/run-your-ln-node/#hostname-setup), remember it ended up with `.local`:
```bash
ping testhub.local
```

It's normal if you don't get any answer at the beginning... until you do get this. 

![tutorial](/images/blog/2025-02-17/tuto-11.jpg)

<span id="pi-install-alby-hub"></span>
Now you can **install Alby Hub** in your raspi **using the SSH connection** that you [enabled earlier](/blog/run-your-ln-node/#pi-enable-ssh):

```bash
# Source code: https://github.com/getAlby/hub/tree/master/scripts/pi-aarch64
ssh testhub@testhub.local '/bin/bash -c "$(curl -fsSL https://getalby.com/install/hub/pi-aarch64-install.sh)"'
```

You will be asked to type the word "yes"; type it. 

![tutorial](/images/blog/2025-02-17/tuto-12.jpg)

Then, you will be asked to enter your password. Enter the password you chose in [Settings > General](/blog/run-your-ln-node/#hostname-setup) for the username.

![tutorial](/images/blog/2025-02-17/tuto-13.jpg)

#### 4. Alby Hub Setup

Wait another 2-3 mins and visit your host: [http://testhub.local/](http://testhub.local/) 

![tutorial](/images/blog/2025-02-17/tuto-14.jpg)

Your Alby hub is now running. Let's connect it to your GetAlby account!

---

## Creating a GetAlby Account
🔗 [getalby.com/users/new](https://getalby.com/auth/users/new)

![tutorial](/images/blog/2025-02-17/tuto-15.jpg)

---

## Connecting GetAlby with Alby Hub
I created an account named testhub. 

**Left**: the GetAlby account. **Right**: the node in the raspi.

![tutorial](/images/blog/2025-02-17/tuto-16.jpg)

Click "**Connect Now**".

![tutorial](/images/blog/2025-02-17/tuto-17.jpg)

Click "**Request Authorization Code**".

![tutorial](/images/blog/2025-02-17/tuto-18.jpg)

You get the auth code (**left**) that you need to insert it into your setup (**right**).

![tutorial](/images/blog/2025-02-17/tuto-19.jpg)

<span id="alby-hub-password"></span>
Create a **Password** for your Alby Hub installed in your raspi. It can be different from the password that you set up for your root user in the rapi itself.

![tutorial](/images/blog/2025-02-17/tuto-20.jpg)

![tutorial](/images/blog/2025-02-17/tuto-21.jpg)

![tutorial](/images/blog/2025-02-17/tuto-22.jpg)

Now it's time to **Link your Alby Account**

![tutorial](/images/blog/2025-02-17/tuto-23.jpg)

Unless you specify otherwise, set the default "Budget renewal: _Monthly 1M sats_".

![tutorial](/images/blog/2025-02-17/tuto-24.jpg)
![tutorial](/images/blog/2025-02-17/tuto-25.jpg)

---

## Opening Lightning Channels
I recommend following the **Initial Steps** to set up your Alby Hub.

![tutorial](/images/blog/2025-02-17/tuto-27.jpg)

Let's open the first channel.

![tutorial](/images/blog/2025-02-17/tuto-28.jpg)

You need to pay ~$20 in sats to open a 1M sats _**incoming liquidity channel**_.

![tutorial](/images/blog/2025-02-17/tuto-29.jpg)

After the payment, then you will see the channel open. It might take a couple of mins until the **_funding transaction_** is mined in the next block.

![tutorial](/images/blog/2025-02-17/tuto-30.jpg)

---

## Receiving Sats
You can receive sats using your LN Address.

**Left**: Public page linked to your [node](https://getalby.com/p/chemaclass).
**Right**: Private page from your Alby Hub.

![tutorial](/images/blog/2025-02-17/tuto-33.jpg)

> Optional: You can add ln funds to your wallet using GetAlby's third-party services: [getalby.com/topup](https://getalby.com/topup) - mind the KYC...

---

## Using Your Sats
After that, you will be able to use it via the [Alby Extension](https://getalby.com/products/browser-extension) or the [AlbyGo](https://albygo.com/).

![tutorial](/images/blog/2025-02-17/tuto-31.jpg)

Your node is the ultimate source of truth. Connecting these apps to it will allow you to use your sats seamlessly across different platforms.

![tutorial](/images/blog/2025-02-17/tuto-32.jpg)

> **Disclaimer**: the testhub LN address was created only for testing and tutorial purposes. My real address is [chemaclass](https://getalby.com/p/chemaclass) ;)

## Maintenance and Troubleshooting

### Updating Your Node

Similar to the installation process, there's a script available to update your node. You can find it in the source repository: [GitHub - Alby Hub Update Script](https://github.com/getAlby/hub/tree/master/scripts/pi-aarch64)

```bash
ssh testhub@testhub.local '/bin/bash -c "$(curl -fsSL https://getalby.com/install/hub/pi-aarch64-update.sh)"'
```

### Handling Power Outages

If the power goes out, the Raspberry Pi will turn off. Once power is restored, it will automatically restart, but Alby Hub will prompt you to enter the password you set earlier. 

---

## Related
### Related links

- [GetAlby - User Guide](https://guides.getalby.com/)
- [Installing Alby Hub in a Raspberry Zero](https://guides.getalby.com/user-guide/alby-account-and-browser-extension/hidden-archives/raspberry-pi-zero)

### Related posts

- [Programmable Money](/blog/programmable-money/) <small>The power of Bitcoin's Script</small>
