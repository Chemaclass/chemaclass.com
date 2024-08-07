+++
title = "Pretty Good Privacy"
description = "PGP is an encryption program that ensures privacy and authentication for data communication. It is used for signing, encrypting, and decrypting texts, emails, files, directories, and whole disk partitions, enhancing the security of email communications."
draft = true
#aliases = [ "/pgp", "/gpg", "/blog/pgp" ]
[taxonomies]
tags = [ "software", "security" ]
[extra]
subtitle = "How PGP secures your digital communication"
static_thumbnail = "/images/blog/2024-07-13/cover.jpg"
+++

![cover](/images/blog/2024-07-13/cover.jpg)

PGP (_Pretty Good Privacy_) is an encryption program that ensures privacy and authentication for data communication. It is used for signing, encrypting, and decrypting texts, emails, files, directories, and whole disk partitions, enhancing the security of email communications.

<!-- more -->

### History

PGP was developed by [Phil Zimmermann](https://en.wikipedia.org/wiki/Phil_Zimmermann) out of concern for the lack of privacy in digital communications. He aimed to provide individuals with strong encryption tools. In 1991, PGP was released to the public for free, marking the beginning of a new era in digital security.

#### Legal Challenges

- **U.S. Export Regulations**: In the early 1990s, strong encryption software like PGP was classified as a _munition under U.S. export regulations_. This meant that distributing PGP internationally was considered an illegal export of weapons. Zimmermann faced a criminal investigation by the U.S. government for allegedly violating these regulations.

- **Zimmermann's Defense**: Zimmermann defended himself by publishing the source code of PGP in a book, which was then distributed internationally. This clever move leveraged free speech protections and ultimately led to the case being dropped in 1996.

---

{{ youtube(id="1-MPcUHhXoc") }}

### Key Features

- Encrypts and decrypts data to ensure secure communication.
- Provides authentication to verify the identity of senders and receivers.
- Generates public and private keys for secure key exchange.
- Supports various encryption algorithms and hash functions.

### How it works

PGP uses a combination of [public-key](https://en.wikipedia.org/wiki/Public-key_cryptography) and [symmetric-key](https://en.wikipedia.org/wiki/Symmetric-key_algorithm) to ensure secure data transmission. It generates a keypair consisting of a public key and a private key. The public key is shared with others, while the private key is kept secret. When data is encrypted, it is encrypted with the public key, and only the corresponding private key can decrypt it.

- **Symmetric Key Encryption**: PGP generates a unique, one-time-use session key to encrypt the message. This method is fast and efficient but requires the sender and recipient to share the same key securely.

- **Asymmetric Key Encryption**: PGP solves the key exchange problem with asymmetric encryption. Each user has a public key and a private key. The session key is encrypted with the recipient’s public key and can only be decrypted by the recipient’s private key.

- **Digital Signatures**: PGP provides authentication through digital signatures. The sender signs the message with their private key, allowing the recipient to verify the sender’s identity using the sender’s public key, ensuring the message has not been tampered with.

{{ youtube(id="Lq-yKJFHJpk") }}

---

## My public key

### Fingerprint

```
56D5 D60B 0934 0999 199C  3750 E51B 5BF4 5F85 D160
```

### Import directly

```bash 
curl https://chemaclass.com/pgp.asc | gpg --import
```

### Download the .asc file

<a href="/pgp.asc" id="download-link">Download public PGP key</a>
