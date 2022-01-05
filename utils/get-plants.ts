import createCryptoPlantContract from "./create-cryptoplant-contract";

export async function getPlants() {
  const cryptoPlantContract = createCryptoPlantContract();
  const plants = await cryptoPlantContract.getPlants();

  console.log(plants);
}
