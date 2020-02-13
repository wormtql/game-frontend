import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/components/big/HomePage";
import LoginSignUpPage from "@/components/big/LoginSignUpPage";

Vue.use(VueRouter);

const routes = [
    { path: "/", component: HomePage },
    { path: "/login-or-sign-up", component: LoginSignUpPage }
];

const router = new VueRouter({
    routes
});

export default router;