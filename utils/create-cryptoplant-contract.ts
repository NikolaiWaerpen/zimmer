import { CONTRACT_ABI, CONTRACT_ADDRESS } from "consts";
import { ethers } from "ethers";
import getEthereum from "./get-ethereum";

export default function createCryptoPlantContract() {
  const ethereum = getEthereum();
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const cryptoPlantContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );

  return cryptoPlantContract;
}
