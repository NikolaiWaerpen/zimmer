import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Loader";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import createCryptoPlantContract from "utils/create-cryptoplant-contract";
import formatDate from "utils/format-date";

type PlantType = {
  name: string;
  dna: number;
  size: number;
  nextGrowTime: number;
};

export async function getPlants(
  setPlants: Dispatch<SetStateAction<null | PlantType[]>>
) {
  const cryptoPlantContract = createCryptoPlantContract();
  const plants = await cryptoPlantContract.getPlants();

  console.log(plants);

  setPlants(plants);
}

export default function CryptoPlants() {
  const [plants, setPlants] = useState<null | PlantType[]>(null);

  useEffect(() => {
    getPlants(setPlants);
  }, []);

  if (!plants) return <Loader />;

  return (
    <div className="flex flex-col items-center gap-16">
      <h1 className="text-center text-6xl">Blockchain Plants</h1>
      {plants && (
        <div>
          {plants.map((plant) => {
            const { name, dna, size, nextGrowTime } = plant;

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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
