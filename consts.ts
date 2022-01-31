import {
  faGithub,
  faInstagram,
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
      ? "https://www.waerpen.com"
      : "http://localhost:3000",
};

export const MAX_GREETING_TITLE_LENGTH = 30,
  MAX_GREETING_COMMENT_LENGTH = 150;

export const MAIL_TO = "mailto:nikolaiwaerpen@gmail.com?subject=Hi Nikolai!";

export const NAVIGATION = {
  main: [
    { name: "Home", href: "/" },
    { name: "Guest Book", href: "/greeting" },
    { name: "Blog", href: "/blog" },
  ],
  social: [
    {
      name: "Github",
      href: "https://github.com/NikolaiWaerpen/",
      icon: faGithub,
    },
    // {
    //   name: "Facebook",
    //   href: "",
    //   icon: faFacebookF,
    // },
    // {
    //   name: "Instagram",
    //   href: "https://www.instagram.com/nikolaiwaerpen/",
    //   icon: faInstagram,
    // },
    // {
    //   name: "Twitter",
    //   href: "https://twitter.com/waerpen",
    //   icon: faTwitter,
    // },
  ],
};
