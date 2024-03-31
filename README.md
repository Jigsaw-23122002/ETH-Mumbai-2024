# FairPlayXI

<h4 align="center">
  <a href="https://fairplayxi-sarvagnya.vercel.app?_vercel_share=7XUHmYBZNDSloyWxg1fHNNumRZ4w0JVq">Deployed App</a>
</h4>

🧪 FairPlayXI is a decentralized and sybil-resistant protocol tailored for fantasy sports enthusiasts. With a strong emphasis on privacy. FairPlayXI aims to revolutionize the realm of fantasy sports, offering an on-chain platform similar to Dream11, specifically tailored for cricket enthusiasts.

#⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Limitations

1. Dream11, a leading fantasy sports platform, has come under fire for multiple instances of leaked player team data before matches. These breaches have raised significant concerns regarding the platform's handling of user privacy. The repeated occurrence of such incidents highlights the pressing need for stronger data protection measures and transparency protocols within the realm of fantasy sports.

2. Dream11 is embroiled in legal disputes due to the pervasive use of bots, which distort fair competition by artificially inflating betting pools. These automated entities erode the integrity of the platform, necessitating urgent measures to curb their influence and uphold equitable gaming standards for all participants.

3. Dream11's lack of transparency with its scoring system breeds distrust among players, who question the accuracy of leaderboards. Ensuring fairness and clarity is vital for the trust and satisfaction of fantasy sports enthusiasts.

## Our approach

1. Our innovative approach involves generating a Merkle Root of each user's meticulously crafted squad of 11 players, arranged in a specific order, before the commencement of the match.
2. The Merkle Root generated is then combined with the user's address and timestamp, forming a unique squad hash.
3. To ensure anonymity and resist Sybil attacks, this squad hash is encrypted using Anon Aadhaar Proof and securely transmitted to our contract for registration. Once registered, any attempt to modify the squad becomes evident, as any alteration would lead to a change in the squad hash. Additionally, the squad remains confidential as the hash assigned to each user is distinct, even if multiple users generate identical squads simultaneously.
4. Following the match's conclusion, before computing player points, our system employs a Zero-Knowledge (ZK) circuit crafted using the sophisticated Noir ZK DSL on Polygon's zkEVM Cardona Network to validate the squad's integrity.
5. This stringent verification process ensures fair play and upholds the integrity of our fantasy sports protocol.
6. The scoring process is facilitated by a Chainlink Any API Oracle, ensuring transparency and enabling users to verify the proof-of-execution for all participants. This integration further enhances the trust and credibility of our platform by providing real-time, reliable data for accurate score calculations. T

Through this seamless combination of cutting-edge technologies, our protocol delivers a secure, fair, and transparent fantasy sports experience, setting a new standard for the industry.

## Deployed Contracts

1. ZK Circuit Verifier contract
  - Cardona test network
     - address - 0x272b0f6C42932bdb6DF920d2eB97910cD63B31d5
     - explorer - https://cardona-zkevm.polygonscan.com/address/0x272b0f6c42932bdb6df920d2eb97910cd63b31d5
  - OP Avail sepolia test network
     - address - 0x272b0f6C42932bdb6DF920d2eB97910cD63B31d5
     - explorer - https://op-avail-sepolia-explorer.alt.technology/address/0x272b0f6C42932bdb6DF920d2eB97910cD63B31d5
  - xLumio test network
     - address - 0x364B32f84E5388f2299641AaAD6aBEc8a65c4D74
     - explorer - https://explorer.testnet.lumio.io/address/0x364B32f84E5388f2299641AaAD6aBEc8a65c4D74
2. FairPlayXI Protocol contract
  - Fantom test network
     - address - 0x428D0A6e0eB291cba9952b5D83f0E4d59072e251
     - explorer - https://testnet.ftmscan.com/address/0x428d0a6e0eb291cba9952b5d83f0e4d59072e251

## Local Setup

To get FairPlayXI run locally, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/Jigsaw-23122002/ETH-Mumbai-2024.git
cd ETH-Mumbai-2024
yarn
```

2. Start your nextJS app:

```
yarn start
```

## Technologies Used

- We've employed Scaffold-ETH-2 as our development toolkit, enabling seamless creation of our dApp. Our protocol contract is deployed on the fantom and also on OP Avail Sepolia testnet, while the circuit contract resides on Polygon's cardona test network for efficient zero-knowledge proof computations.
-  Complementing our infrastructure, a subgraph provides comprehensive analytics and comparison dashboards, empowering users with real-time insights for informed decision-making.
-   We've harnessed the power of the Noir language to craft our zero-knowledge proof (ZKP) circuits, ensuring robust and efficient verification processes within our protocol.
