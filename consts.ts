export const URL =
  process.env.NODE_ENV === "production"
    ? "INPUT CORRECT URL WHEN PRODUCTION BACKEND IS UP" // TODO: this
    : "http://localhost:4000";

export const MAX_GREETING_TITLE_LENGTH = 25,
  MAX_GREETING_COMMENT_LENGTH = 150;
