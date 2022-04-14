

export const extractCSRFToken = () => document.cookie
  .split(";")
  .find(token => token.includes("CSRF-Token"))
  .split("=")[1];

  export const fetchWithToken = async (endpoint, method = "GET", body) => {
      const token = extractCSRFToken();
      const headers = {
          "Content-Type": "application/json",
          "CSRF-Token": token,
      };
      const requestParams = {
          method,
          credentials: "same-origin",
          headers,
      };
      if (body && method.toLowerCase() !== 'get') {
          requestParams.body = body;
      }
      return await fetch(endpoint, requestParams);
  }
