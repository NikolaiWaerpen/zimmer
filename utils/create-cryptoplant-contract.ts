import { contractAbi, contractAddress } from "consts";
import { ethers } from "ethers";
import getEthereum from "./get-ethereum";

export default function createCryptoPlantContract() {
  const ethereum = getEthereum();
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const cryptoPlantContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  return cryptoPlantContract;
}
