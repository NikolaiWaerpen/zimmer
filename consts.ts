import {
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const { NODE_ENV } = process.env;

export const URL = {
  BACKEND:
    NODE_ENV === "production"
      ? "https://keller-fffdb.ondigitalocean.app"
      : "http://localhost:4000",
  FRONTEND:
    NODE_ENV === "production"
      ? "https://www.nikolaiwaerpen.com"
      : "http://localhost:3000",
};

export const MAX_GREETING_TITLE_LENGTH = 30,
  MAX_GREETING_COMMENT_LENGTH = 150;

export const MAIL_TO = "mailto:nikolaiwaerpen@gmail.com?subject=Hi Nikolai!";

export const WPM = 250;

export const NAVIGATION = {
  main: [
    { name: "Home", href: "/" },
    { name: "Guest Book", href: "/greeting" },
    { name: "Articles", href: "/article" },
    { name: "Bot", href: "/bot" },
  ],
  social: [
    {
      name: "Github",
      href: "https://github.com/NikolaiWaerpen/",
      icon: faGithub,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/waerpen/",
      icon: faTwitter,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/nikolai-w%C3%A6rpen-035273154/",
      icon: faLinkedin,
    },
    {
      name: "Discord",
      href: "https://discordapp.com/users/Nikolai#1691",
      icon: faDiscord,
    },
  ],
};

export const TEST_STATE_PATH = "tests/testState.json";

// To whomever is sifting through my code: don't steal the password to my test account, thanks <3
export const TEST_EMAIL = "nikolaiendtoend@gmail.com";
export const TEST_PASSWORD = "WFiha2t7QwTqCTj";

export const TYPE_SPEED = 400;

export const OPENSEA_API_URL = "https://api.opensea.io/api/v1";
