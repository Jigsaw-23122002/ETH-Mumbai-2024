# 🏗 FairPlayXI

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

## Challenges faced by current platform

1. Dream11, a leading fantasy sports platform, has come under fire for multiple instances of leaked player team data before matches. These breaches have raised significant concerns regarding the platform's handling of user privacy. The repeated occurrence of such incidents highlights the pressing need for stronger data protection measures and transparency protocols within the realm of fantasy sports.

2. Dream11 is embroiled in legal disputes due to the pervasive use of bots, which distort fair competition by artificially inflating betting pools. These automated entities erode the integrity of the platform, necessitating urgent measures to curb their influence and uphold equitable gaming standards for all participants.

3. Dream11's lack of transparency with its scoring system breeds distrust among players, who question the accuracy of leaderboards. Ensuring fairness and clarity is vital for the trust and satisfaction of fantasy sports enthusiasts.
Before you begin, you need to install the following tools:

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
