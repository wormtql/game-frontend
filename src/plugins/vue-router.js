import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/components/big/HomePage";
import LoginSignUpPage from "@/components/big/LoginSignUpPage";
import GameIntroPage from "@/components/big/GameIntroPage";
import BeginGamePage from "@/components/big/BeginGamePage";
import HexPlay from "@/components/big/play/HexPlay";
// import HexIntro from "@/components/big/intro/HexIntro";

Vue.use(VueRouter);

const routes = [
    { path: "/", component: HomePage },
    { path: "/login-or-sign-up", component: LoginSignUpPage, name: "los" },
    {
        path: "/intro/:type", component: GameIntroPage,
    },
    { path: "/starting-game", component: BeginGamePage, name: "starting" },
    { path: "/play/hex", component: HexPlay }
];

const router = new VueRouter({
    routes
});

export default router;