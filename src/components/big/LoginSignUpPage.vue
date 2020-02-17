<template>
    <v-content style="padding: 64px 0" >
        <v-snackbar v-model="showSnackbar">{{ snackbarText }}</v-snackbar>
        <v-row justify="center">
            <v-card width="400px" v-show="which === 'login'">
                <v-card-title>登录</v-card-title>
                <v-card-text>
                    <v-text-field label="用户名"
                                  prepend-icon="mdi-account"
                                  v-model="loginUsername"
                    ></v-text-field>
                    <v-text-field label="密码"
                                  prepend-icon="mdi-lock"
                                  v-model="loginPassword"
                                  type="password"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="login" :loading="loginLoading">登录</v-btn>
                    <v-btn color="primary" text @click="sw">去注册</v-btn>
                </v-card-actions>
            </v-card>

            <v-card width="400px" v-show="which === 'signUp'">
                <v-card-title>注册</v-card-title>
                <v-card-text>
                    <v-text-field label="用户名"
                                  prepend-icon="mdi-account"
                                  v-model="signUpUsername"
                    ></v-text-field>
                    <v-text-field label="密码"
                                  prepend-icon="mdi-lock"
                                  v-model="signUpPassword"
                                  type="password"
                    ></v-text-field>
                    <v-text-field label="确认密码"
                                  prepend-icon="mdi-lock"
                                  v-model="signUpConfirmPassword"
                                  type="password"
                    ></v-text-field>
                    <v-checkbox label="直接登录" v-model="signUpLogin"></v-checkbox>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="signUp" :loading="signUpLoading">注册</v-btn>
                    <v-btn color="primary" text @click="sw">去登录</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-content>
</template>

<script>
    import axios from "axios"
    import consts from "@/consts"
    import buffer from "@/buf"

    export default {
        name: "LoginSignUpPage",
        data: function () {
            return {
                which: "login",

                loginUsername: "",
                loginPassword: "",

                signUpUsername: "",
                signUpPassword: "",
                signUpConfirmPassword: "",
                signUpLogin: false,

                loginLoading: false,
                signUpLoading: false,

                showSnackbar: false,
                snackbarText: "",
            }
        },
        methods: {
            sw: function () {
                if (this.which === "login") {
                    this.which = "signUp";
                } else {
                    this.which = "login";
                }
            },

            displaySnackbar: function (text) {
                this.snackbarText = text;
                this.showSnackbar = true;
            },

            login: function () {
                let data = {
                    username: this.loginUsername,
                    password: this.loginPassword
                };

                this.loginLoading = true;

                axios.post(`${consts.url}api/user/login`, data).then(res => {
                    // window.console.log(res);
                    if (res.status === 200 && res.data.status === 200) {
                        // 登录成功
                        let auth = res.headers.authorization;
                        // localStorage.setItem("authorization", auth);
                        // localStorage.setItem("username", this.loginUsername);
                        buffer.set("auth", auth);
                        buffer.set("username", this.loginUsername);

                        this.$router.replace(this.$route.params.redirect || "/");
                    } else {
                        this.displaySnackbar(res.data.message || "错误");
                    }

                    this.loginLoading = false;
                })
            },

            signUp: function () {
                let data = {
                    username: this.signUpUsername,
                    password: this.signUpPassword,
                    confirmPassword: this.signUpConfirmPassword
                };

                this.signUpLoading = true;

                axios.post(`${consts.url}api/user/sign-up?login=${this.signUpLogin}`, data).then(res => {
                    if (res.status === 200 && res.data.status === 200) {
                        // 注册成功
                        if (this.signUpLogin) {
                            let auth = res.headers.authorization;
                            buffer.set("auth", auth);
                            buffer.set("username", this.signUpUsername);

                            this.$router.replace(this.$route.params.redirect || "/");
                        } else {
                            this.displaySnackbar("注册成功");
                            this.sw();
                        }
                    } else {
                        this.displaySnackbar(res.data.message || "错误");
                    }

                    this.signUpLoading = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>