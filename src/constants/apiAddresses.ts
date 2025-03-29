const EDITOR_SERVICE_URL =
    process.env.REACT_APP_EDITOR_SERVICE_URL || "http://localhost:3000"; //"https://lu-lang-editor-service.onrender.com";
// const BLOG_SERVICE_URL = "https://lu-lang-blog-service.onrender.com";

console.log("EDITOR_SERVICE_URL: ", EDITOR_SERVICE_URL);

export { EDITOR_SERVICE_URL };