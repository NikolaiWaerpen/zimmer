import { gql, useQuery } from "@apollo/client";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import CustomError from "components/CustomError";
import Input from "components/Input";
import Loader from "components/Loader";
import { CONTRACT_ADDRESS } from "consts";
import { BigNumber } from "ethers";
import { UserType } from "pages/nft";
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

  setHasPlant(hasPlant);
}

type CryptoPlantsType = {
  publicAddress: string;
};

const USERS_QUERY = gql`
  query Users {
    users {
      id
      name
      email
      image
      publicAddress
    }
  }
`;

type UsersDataType = {
  users: UserType[];
};

async function growPlant() {
  const cryptoPlantContract = createCryptoPlantContract();
  const farmersPlantId: BigNumber = await cryptoPlantContract.getPlant();
  await cryptoPlantContract.waterPlant(farmersPlantId);
}

export default function CryptoPlants({ publicAddress }: CryptoPlantsType) {
  const [nameInput, setNameInput] = useState("");
  const [plants, setPlants] = useState<null | PlantType[]>(null);
  const [hasPlant, setHasPlant] = useState(true);
  const { loading, error, data } = useQuery<UsersDataType>(USERS_QUERY);

  useEffect(() => {
    checkHasPlant(publicAddress, setHasPlant);
    getPlants(setPlants);
  }, []);

  if (loading ?? !plants) return <Loader />;
  if (error ?? !data) return <CustomError error={error} />;

  const { users } = data;

  return (
    <div className="flex flex-col items-center gap-16">
      <div className="flex flex-col items-center">
        <h1 className="text-center text-6xl">Blockchain Plants</h1>
        <a
          href={`https://ropsten.etherscan.io/address/${CONTRACT_ADDRESS}`}
          className="text-themecolor5"
          target="_blank"
        >
          (View smart contract)
        </a>
      </div>

      {!hasPlant && (
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
        <div className="grid grid-cols-4 gap-8">
          {plants.map((plant) => {
            const { name, dna, size, nextGrowTime, farmer } = plant;
            const user = users.find(
              ({ publicAddress }) =>
                publicAddress?.toLowerCase() === farmer.toLowerCase()
            );

            const currentUserIsFarmer =
              publicAddress.toLowerCase() === farmer.toLowerCase();

            return (
              <div
                className="flex flex-col gap-4 shadow-2xl rounded p-4 h-full w-[256px] items-between justify-between"
                key={nextGrowTime}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-center w-full">
                    <FontAwesomeIcon
                      icon={faSeedling}
                      size={size < 2 ? "7x" : "10x"}
                      className="text-green-700"
                    />
                  </div>

                  <div className="flex justify-between gap-8">
                    <span>Name: </span>
                    <span className="truncate w-32 font-medium text-right">
                      {name}
                    </span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Size: </span>
                    <span className="font-medium">{size}</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>DNA: </span>
                    <span className="font-medium">{dna}</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Next water time: </span>
                    <span className="font-medium text-right">
                      {formatDate({
                        date: new Date(nextGrowTime),
                        format: "DD.MM.YY",
                      })}
                    </span>
                  </div>
                </div>
                {currentUserIsFarmer && (
                  <Button onClick={() => growPlant()}>Water</Button>
                )}
                {/* TODO: MATCH FARMER WITH USER PUBLIC ADDRESS TO DISPLAY INFORMATION ABOUT USER */}
                {user && (
                  <div className=" flex justify-between mt-2 ">
                    <img
                      className="inline-block h-10 w-10 rounded-full"
                      src={user.image}
                      alt={name}
                    />
                    <div className="flex flex-col items-end">
                      <span>{user.name}</span>
                      <span className="truncate w-28 text-gray-500">
                        {farmer}
                      </span>
                    </div>
                    {/* TODO: Add functioning tooltip */}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
