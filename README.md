<h1 align="center">
  <a href="https://github.com/Jigsaw-23122002/ETH-Mumbai-2024">
    <img src="https://devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F6e69b8b92a344c8cbd6d9dd6f57f03bf%2Fprojects%2F3f82fc36ee4845d0b4e8d73862bd8a38%2Fe7d627de-eeef-421d-8a77-d5464ebe692f.jpeg&w=1440&q=75" alt="FairPlayXI Logo" width="125" height="125">
  </a>
  <br>
  FairPlayXI 
</h1>
 
<div align="center">
   <strong>FairPlayXI</strong> - A Privacy-Focused, Sybil-Resistant, Decentralized Fantasy Cricket Platform. <br>
  <a href="https://devfolio.co/projects/fairplayxi-b88f">5 Track Prizes @ETHMumbai 2024</a> - Team OffChain Panchayat Samiti <br> <br>
  <a href="https://github.com/Jigsaw-23122002/ETH-Mumbai-2024/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/Jigsaw-23122002/ETH-Mumbai-2024?color=red&style=for-the-badge"></a>
  <a href="https://github.com/Jigsaw-23122002/ETH-Mumbai-2024/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/Jigsaw-23122002/ETH-Mumbai-2024?style=for-the-badge"></a>  
</div>

<hr>

<details>
<summary>Table of Contents</summary>

- [Description](#description)
- [Links](#links)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
- [Contributors](#contributors)

</details>

## 📝Description

<table>
  <tr>
    <td>
FairPlayXI is a decentralized and sybil-resistant protocol tailored for fantasy sports enthusiasts. With a strong emphasis on privacy. FairPlayXI aims to revolutionize the realm of fantasy sports, offering an on-chain platform similar to Dream11, specifically tailored for cricket enthusiasts.
<br><br>
      <strong>Limitations</strong> of existing fantasy cricket platforms like <i>Dream11</i>:
      <ul>
<li> Dream11, a leading fantasy sports platform, has come under fire for multiple instances of leaked player team data before matches. These breaches have raised significant concerns regarding the platform's handling of user privacy. The repeated occurrence of such incidents highlights the pressing need for stronger data protection measures and transparency protocols within the realm of fantasy sports.
<li> Dream11 is embroiled in legal disputes due to the pervasive use of bots, which distort fair competition by artificially inflating betting pools. These automated entities erode the integrity of the platform, necessitating urgent measures to curb their influence and uphold equitable gaming standards for all participants.
<li> Dream11's lack of transparency with its scoring system breeds distrust among players, who question the accuracy of leaderboards. Ensuring fairness and clarity is vital for the trust and satisfaction of fantasy sports enthusiasts.
      </ul>
<strong>FairPlayXI's Approach</strong> to solve these <i>problems</i>:
      <ol>
<li> Our innovative approach involves generating a Merkle Root of each user's meticulously crafted squad of 11 players, arranged in a specific order, before the commencement of the match.
<li> The Merkle Root generated is then combined with the user's address and timestamp, forming a unique squad hash.
<li> To ensure anonymity and resist Sybil attacks, this squad hash is signed using Anon Aadhaar Proof and securely transmitted to our contract for registration. Once registered, any attempt to modify the squad becomes evident, as any alteration would lead to a change in the squad hash. Additionally, the squad remains confidential as the hash assigned to each user is distinct, even if multiple users generate identical squads simultaneously.
<li> Following the match's conclusion, before computing player points, our system employs a Zero-Knowledge (ZK) circuit crafted using the sophisticated Noir ZK DSL on Polygon's zkEVM Cardona Network to validate the squad's integrity.
<li> This stringent verification process ensures fair play and upholds the integrity of our fantasy sports protocol.
<li> The scoring process is facilitated by a Chainlink Any API Oracle, ensuring transparency and reliability, enabling users to send zk-proven query results onchain. This integration further enhances the trust and credibility of our platform by providing real-time, reliable data for accurate score calculations accummulated over decetralised Oracle Network.
      </ol>
<br> Through this seamless combination of cutting-edge technologies, our protocol delivers a secure, fair, and transparent fantasy sports experience, setting a new standard for the industry.
    </td>
  </tr>
  </table>
  
## 🔗Links

### Frontend (Vercel)
- [**FairPlayXI**](https://fairplayxi-sarvagnya.vercel.app/?_vercel_share=7XUHmYBZNDSloyWxg1fHNNumRZ4w0JVq) 🚀

### Assets
- [GitHub Repo](https://github.com/Jigsaw-23122002/ETH-Mumbai-2024)
- [Devfolio Submission](https://devfolio.co/projects/fairplayxi-b88f)
- [Demo Video](https://youtu.be/7khPnTrDhCY)

### The Graph Subgraph
- [Hosted Subgraph Studio](https://api.studio.thegraph.com/query/41844/fairplay/0.0.1)

### Deployed Protocol Contract
- [Fantom Testnet](https://testnet.ftmscan.com/address/0x428d0a6e0eb291cba9952b5d83f0e4d59072e251)

### Deployed ZK Circuit Verifier Contract
- [Polygon Cardona zkEVM Testnet](https://cardona-zkevm.polygonscan.com/address/0x272b0f6c42932bdb6df920d2eb97910cd63b31d5)
- [OP Avail Sepolia Testnet](https://op-avail-sepolia-explorer.alt.technology/address/0x272b0f6C42932bdb6DF920d2eB97910cD63B31d5)
- [xLumio Testnet](https://explorer.testnet.lumio.io/address/0x364B32f84E5388f2299641AaAD6aBEc8a65c4D74)

### Oracle Server
- [Score Calculation Oracle Server](https://puce-smoggy-clam.cyclic.app)

## 🤖Tech-Stack

- NextJS + Hardhat from Scaffold-Eth-2 Template for Project Setup
- The Graph for Event Indexing
- Noir ZK DSL (Rust-Based)
- Solidity for Smart Contracts
- Chainlink Any API for Oracle Score Calculation Integration with Smart Contract

## 🛠Project Setup

To get FairPlayXI run locally, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/Jigsaw-23122002/ETH-Mumbai-2024.git
cd ETH-Mumbai-2024
yarn
```

2. Start your NextJS app:

```
yarn start
```

## 👩‍💻Contributors

Team Members

- [Sarvagnya Purohit](https://github.com/saRvaGnyA) 
- [Ananya Bangera](https://github.com/ananya-bangera) 
- [Harsh Nag](https://github.com/Jigsaw-23122002) 
