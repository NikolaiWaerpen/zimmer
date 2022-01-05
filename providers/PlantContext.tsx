import { createContext, ReactNode, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "consts";

type PlantContextType = {
  connectWallet: any;
  currentAccount: any;
  isLoading: any;
};

export const PlantContext = createContext({} as PlantContextType);

let ethereum: any;
if (typeof window !== "undefined") ethereum = window.ethereum;

const createEthereumContract = () => {
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  console.log(contractAbi, contractAddress, signer);
  const cryptoPlantContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  return cryptoPlantContract;
};

export const PlantProvider = ({ children }: { children: ReactNode }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getPlants = async () => {
    try {
      if (ethereum) {
        const cryptoPlantContract = createEthereumContract();
        // console.log(cryptoPlantContract);
        const plants = await cryptoPlantContract.getPlants();

        console.log("plants", plants);

        // const plant = await cryptoPlantContract.plant(0);
        // console.log(plant)

        // console.log(structuredTransactions);

        // setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      // @ts-ignore
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const checkIfWalletIsConnected = async () => {
    console.log("check if wallet is connected");
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      // @ts-ignore
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getPlants();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    // checkIfTransactionsExists();
  }, []);

  return (
    <PlantContext.Provider
      value={{
        connectWallet,
        currentAccount,
        isLoading,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};
