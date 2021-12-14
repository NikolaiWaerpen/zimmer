export const URL =
  process.env.NODE_ENV === "production"
    ? process.env.BACKEND_URL ?? "https://keller-fffdb.ondigitalocean.app/"
    : "http://localhost:4000";

export const MAX_GREETING_TITLE_LENGTH = 25,
  MAX_GREETING_COMMENT_LENGTH = 150;
