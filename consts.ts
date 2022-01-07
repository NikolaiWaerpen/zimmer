import plantGrower from "./artifacts/contracts/PlantGrower.sol/PlantGrower.json";

export const URL =
  process.env.NODE_ENV === "production"
    ? "https://keller-fffdb.ondigitalocean.app"
    : "http://localhost:4000";

export const MAX_GREETING_TITLE_LENGTH = 30,
  MAX_GREETING_COMMENT_LENGTH = 150;

export const MAIL_TO = "mailto:nikolaiwaerpen@gmail.com?subject=Hei Nikolai!";

export const NAVIGATION = [
  { name: "Home", href: "/" },
  { name: "Greeting", href: "/greeting" },
  { name: "NFT", href: "/nft" },
];

export const CONTRACT_ADDRESS = "0x1797Ada57B236452830A08c50ea19DaaDE32db4b",
  CONTRACT_ABI = plantGrower.abi;
