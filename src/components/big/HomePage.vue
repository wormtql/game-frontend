<template>
    <div>
        <v-app-bar :height="96" color="primary" dark>
<!--            <v-img src="@/assets/logo.svg" height="64px" width="64px"></v-img>-->
            <v-spacer></v-spacer>
            <span class="me-4">未登录</span>
            <v-btn color="accent" @click="loginOrSignUp">去登录/注册</v-btn>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-content style="padding: 24px 96px">
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>Hex</v-card-title>
                        <v-card-subtitle>海克斯</v-card-subtitle>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn icon color="primary">
                                <v-icon>mdi-launch</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card>
                        <v-card-title>Five In a Row</v-card-title>
                        <v-card-subtitle>五子棋</v-card-subtitle>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn icon color="primary">
                                <v-icon>mdi-launch</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card>
                        <v-card-title>Hex</v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-content>
    </div>
</template>

<script>
    export default {
        name: "HomePage",
        methods: {
            loginOrSignUp: function () {
                this.$router.push("/login-or-sign-up");
            }
        }
    }
</script>

<style scoped>

</style>