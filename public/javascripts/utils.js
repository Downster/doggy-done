

export const extractCSRFToken = () => document.cookie
  .split(";")
  .find(token => token.includes("CSRF-Token"))
  .split("=")[1];

  export const fetchWithToken = async (endpoint, method, body) => {
      const token = extractCSRFToken();
      const headers = {
          "Content-Type": "application/json",
          "CSRF-Token": token,
      };
      const requestParams = {
          method,
          credentials: "same-origin",
          headers,
          body,
      };
      return await fetch(endpoint, requestParams);
  }
