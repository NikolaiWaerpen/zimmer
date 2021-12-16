export const URL =
  process.env.NODE_ENV === "production"
    ? "https://keller-fffdb.ondigitalocean.app"
    : "http://localhost:4000";

export const MAX_GREETING_TITLE_LENGTH = 30,
  MAX_GREETING_COMMENT_LENGTH = 150;
