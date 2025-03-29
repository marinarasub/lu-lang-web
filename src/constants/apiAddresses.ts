const EDITOR_SERVICE_URL =
    process.env.REACT_APP_EDITOR_SERVICE_URL || "http://localhost:3000";

console.log("EDITOR_SERVICE_URL: ", EDITOR_SERVICE_URL);

export { EDITOR_SERVICE_URL };