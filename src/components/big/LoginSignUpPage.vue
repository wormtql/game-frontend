<template>
    <v-content style="padding: 64px 0" >
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
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text>登录</v-btn>
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
                                  v-model="signUpUsername"
                    ></v-text-field>
                    <v-text-field label="确认密码"
                                  prepend-icon="mdi-lock"
                                  v-model="signUpConfirmPassword"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text>注册</v-btn>
                    <v-btn color="primary" text @click="sw">去登录</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-content>
</template>

<script>
    export default {
        name: "LoginSignUpPage",
        data: function () {
            return {
                which: "login",

                loginUsername: "",
                loginPassword: "",

                signUpUsername: "",
                signUpPassword: "",
                signUpConfirmPassword: ""
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

            login: function () {

            }
        }
    }
</script>

<style scoped>

</style>