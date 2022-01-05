import detectEthereumProvider from "@metamask/detect-provider";
import Button from "components/Button";
import { useEffect, useState } from "react";
import Web3 from "web3";
import plantGrower from "../../artifacts/contracts/PlantGrower.sol/PlantGrower.json";

// const cryptoPlantsContractAdress = "0x3E148913c7719Bf8653655c36E89383D72c0cB7c";
// const web3js = new Web3(
//   new Web3.providers.HttpProvider(
//     "https://eth-ropsten.alchemyapi.io/v2/tkteCUDiE40sqIH7WkYq1Gh4fyAhoYbs"
//   )
// );

// const cryptoPlants = new web3js.eth.Contract(
//   cryptoPlantsABI,
//   cryptoPlantsContractAdress
// );

export default function CryptoPlants() {
  const [provider, setProvider] = useState<null | any>(null);
  useEffect(() => {
    async function detectProvider() {
      const responseProvider = await detectEthereumProvider();
      return responseProvider;
    }

    setProvider(async () => {
      const e = await detectProvider();
      return e;
    });
  }, []);

  if (!provider) return <div>Provider undefined</div>;
  // @ts-ignore
  const web3js = new Web3(ethereum);

  console.log(provider);

  const cryptoPlants = new web3js.eth.Contract(
    // @ts-ignore
    plantGrower.abi,
    "0x3E148913c7719Bf8653655c36E89383D72c0cB7c"
  );

  // console.log(cryptoPlants.methods);

  async function createPlant() {
    const action = await cryptoPlants.methods
      .createRandomPlant("Let's see Paul Allen's card")
      .call();
    console.log(action);
  }

  async function getPlant() {
    const plant = await cryptoPlants.methods.plants(0).call();
    console.log(plant);
  }

  return (
    <div>
      <h1>Blockchain Plants</h1>
      <div className="grid gap-4">
        <Button onClick={createPlant}>Create plant</Button>
        <Button onClick={getPlant}>Get plant</Button>
      </div>
    </div>
  );
}
