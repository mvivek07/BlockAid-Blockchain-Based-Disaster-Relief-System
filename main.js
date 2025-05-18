import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { getEvmChainConfig, WEB3AUTH_NETWORK } from "@web3auth/base";
import { createPublicClient, createWalletClient, custom, parseEther } from "viem";
import { polygon } from "viem/chains";

// Replace this with your Web3Auth Client ID from https://dashboard.web3auth.io
const clientId = "BOUaYmPb1UiA-geIIgpXo8GoaCUw5pk_jsrvZKaZErY19UOgiDCQlPQ_zzl2mwfIyKJ3N1zYmhtcNpE1AoJ9B2w";

const init = async () => {
  const chainConfig = getEvmChainConfig(137); // Polygon Mainnet

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

  const web3auth = new Web3Auth({
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    privateKeyProvider,
  });

  await web3auth.initModal();
  const provider = await web3auth.connect();
  console.log("User logged in!");

  const walletClient = createWalletClient({
    chain: polygon,
    transport: custom(provider),
  });

  const publicClient = createPublicClient({
    chain: polygon,
    transport: custom(provider),
  });

  const addresses = await walletClient.getAddresses();
  console.log("Your address:", addresses[0]);

  const balance = await publicClient.getBalance({ address: addresses[0] });
  console.log("Your balance:", balance.toString());
};

init().catch(console.error);
