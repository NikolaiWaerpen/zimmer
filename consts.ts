export const URL =
  process.env.NODE_ENV === "production"
    ? "INPUT CORRECT URL WHEN PRODUCTION BACKEND IS UP" // TODO: this
    : "http://localhost:8080";

export const MAX_TODO_CHARACTER_INPUT = 25;
