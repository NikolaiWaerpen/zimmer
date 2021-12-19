import Link from "next/link";

const noNFT = [
  {
    name: "Rude Boys",
    collection: "0xab3e5a900663ea8c573b8f893d540d331fbab9f5",
    url: "https://opensea.io/collection/rude-boys",
  },
  {
    name: "",
    collection: "",
    url: "",
  },
  {
    name: "",
    collection: "",
    url: "",
  },
  {
    name: "",
    collection: "",
    url: "",
  },
];

export default function NFT() {
  return (
    <div>
      <h1>NFT</h1>
      <ul>
        {noNFT.map(({ name, collection, url }) => (
          <li>
            <div>{name}</div>
            <Link href={`nft/${collection}`}>
              <a>{collection}</a>
            </Link>
            <div>{url}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
