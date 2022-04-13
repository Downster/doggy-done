

export const extractCSRFToken = () => document.cookie
  .split(";")
  .find(token => token.includes("CSRF-Token"))
  .split("=")[1];
