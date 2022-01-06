import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import Input from "components/Input";
import Loader from "components/Loader";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import createCryptoPlantContract from "utils/create-cryptoplant-contract";
import formatDate from "utils/format-date";

type PlantType = {
  name: string;
  farmer: string;
  dna: number;
  size: number;
  nextGrowTime: number;
};

async function getPlants(
  setPlants: Dispatch<SetStateAction<null | PlantType[]>>
) {
  const cryptoPlantContract = createCryptoPlantContract();
  console.log(cryptoPlantContract);
  const plants = await cryptoPlantContract.getPlants();

  setPlants(plants);
}

async function createPlant(name: string) {
  const cryptoPlantContract = createCryptoPlantContract();
  await cryptoPlantContract.createRandomPlant(name);
}

async function checkHasPlant(
  publicAddress: string,
  setHasPlant: Dispatch<SetStateAction<boolean>>
) {
  const cryptoPlantContract = createCryptoPlantContract();
  const hasPlant = await cryptoPlantContract.hasPlant(publicAddress);

  console.log(hasPlant);
  setHasPlant(hasPlant);
}

type CryptoPlantsType = {
  publicAddress: string;
};

export default function CryptoPlants({ publicAddress }: CryptoPlantsType) {
  const [nameInput, setNameInput] = useState("");
  const [plants, setPlants] = useState<null | PlantType[]>(null);
  const [hasPlant, setHasPlant] = useState(true);

  useEffect(() => {
    checkHasPlant(publicAddress, setHasPlant);
    getPlants(setPlants);
  }, []);

  if (!plants) return <Loader />;

  return (
    <div className="flex flex-col items-center gap-16">
      <h1 className="text-center text-6xl">Blockchain Plants</h1>
      {hasPlant && (
        <div className="flex gap-2">
          <Input
            label="Plant name"
            value={nameInput}
            onChange={({ target: { value } }) => setNameInput(value)}
          />
          <Button onClick={() => createPlant(nameInput)}>Create plant</Button>
        </div>
      )}
      {plants && (
        <div className="w-full flex gap-16">
          {plants.map((plant) => {
            const { name, dna, size, nextGrowTime, farmer } = plant;

            return (
              <div
                className="flex flex-col items-center gap-2"
                key={nextGrowTime}
              >
                <FontAwesomeIcon
                  icon={faSeedling}
                  size={size < 2 ? "5x" : "10x"}
                />
                <span>{name}</span>
                <span>{size}</span>
                <span>
                  {formatDate({
                    date: new Date(nextGrowTime),
                    format: "DD.MM.YY HH:mm:ss",
                  })}
                </span>
                {/* TODO: MATCH FARMER WITH USER PUBLIC ADDRESS TO DISPLAY INFORMATION ABOUT USER */}
                <span>{farmer}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
