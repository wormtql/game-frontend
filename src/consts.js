export default {
    url: process.env.NODE_ENV === "development" ? "http://localhost:8080/" : "http://39.107.68.17/8080",
    wsUrl: process.env.NODE_ENV === "development" ? "ws://localhost:8080/" : "ws://39.107.68.17/8080",
}