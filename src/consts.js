export default {
    url: process.env.NODE_ENV === "development" ? "http://localhost:8080/" : "http://118.178.121.25:8080/",
    wsUrl: process.env.NODE_ENV === "development" ? "ws://localhost:8080/" : "ws://118.178.121.25:8080/",
}