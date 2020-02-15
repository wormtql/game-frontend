<template>
    <div>
        <v-app-bar :height="96" color="primary" dark>
<!--            <v-img src="@/assets/logo.svg" height="64px" width="64px"></v-img>-->
            <v-spacer></v-spacer>
            <span class="me-4">{{ live ? "Hello, " + username : "未登录" }}</span>
            <v-btn color="accent" @click="loginOrSignUp" v-if="!live">去登录/注册</v-btn>
            <v-btn color="accent" @click="logout" v-if="live">退出登录</v-btn>
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
                            <v-btn icon color="primary" @click="navigateTo('/intro/hex')">
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
    import buffer from "@/buf"

    export default {
        name: "HomePage",
        data: function () {
            return {
                live: false,
                username: ""
            }
        },
        created: function () {
            if (buffer.containsKey("auth")) {
                this.live = true;
                this.username = buffer.get("username");
            } else {
                this.live = false;
            }
        },
        methods: {
            loginOrSignUp: function () {
                this.$router.push({
                    name: "los",
                    params: {
                        redirect: "/"
                    }
                });
            },

            logout: function () {
                localStorage.removeItem("authorization");
                localStorage.removeItem("username");

                this.live = false;
                this.username = "";
            },

            navigateTo: function (destination) {
                this.$router.push(destination);
            }
        }
    }
</script>

<style scoped>

</style>