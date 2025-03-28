const EDITOR_SERVICE_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000" : "https://lu-lang-editor-service.onrender.com";
// const BLOG_SERVICE_URL = "https://lu-lang-blog-service.onrender.com";

export { EDITOR_SERVICE_URL };