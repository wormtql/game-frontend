<template>
    <v-content>
        <v-snackbar v-model="showSnackbar">
            {{ snackbarText }}
        </v-snackbar>
        <v-row justify="center">
            <div style="width: 400px; padding: 64px 0">
                <h1>开始</h1>
                <v-combobox label="类型" v-model="type" :items="items"></v-combobox>
                <v-radio-group row v-model="select">
                    <v-radio label="加入房间" :value="0"></v-radio>
                    <v-radio label="创建房间" :value="1"></v-radio>
                </v-radio-group>
                <div v-show="select === 1">
                    <v-checkbox label="使用密码" v-model="usePassword"></v-checkbox>
                    <v-text-field label="密码" :disabled="!usePassword"
                                  v-model="createPassword"
                    ></v-text-field>
                </div>
                <div v-show="select === 0">
                    <v-text-field label="房间号" v-model.number="roomId"></v-text-field>
                    <v-text-field label="密码" hint="如果没有密码,该项不填"
                                  v-model="joinPassword"
                    ></v-text-field>
                </div>
                <v-btn color="primary" class="mt-4" @click="confirm" :loading="loading">
                    确定
                </v-btn>
            </div>
        </v-row>
    </v-content>
</template>

<script>
    // import SockJS from "sockjs-client"
    // import Stomp from "stompjs"
    // import axios from "axios"
    // import consts from "@/consts";
    import buffer from "@/buf";

    export default {
        name: "BeginGamePage",
        data: function () {
            return {
                select: 0,
                usePassword: false,
                joinPassword: "",
                createPassword: "",
                roomId: 0,

                type: "hex",
                items: [
                    "hex",
                    "five_in_a_row"
                ],

                loading: false,
                showSnackbar: false,
                snackbarText: ""
            }
        },
        created: function () {
            this.type = this.$route.params.type;
        },
        methods: {
            displayError: function (message) {
                this.snackbarText = message;
                this.showSnackbar = true;
                setTimeout(() => {
                    this.showSnackbar = false;
                }, 3000);
            },
            confirm: function () {
                this.loading = true;
                if (this.select === 0) {
                    // join room
                    let vm = this;
                    let sock = new WebSocket("ws://localhost:8080/websocket");
                    sock.onopen = function () {
                        sock.send(JSON.stringify({
                            command: "join",
                            roomId: vm.roomId,
                            token: buffer.get("auth"),
                            password: vm.joinPassword
                        }));
                    };
                    sock.onmessage = function (e) {
                        window.console.log(e);

                        let data = JSON.parse(e.data);

                        if (data.command === "room_id") {
                            buffer.set("roomId", data.id);
                            buffer.set("sock", sock);
                            vm.$router.replace("/play/hex");
                        } else if (data.command === "error") {
                            vm.loading = false;
                            sock.close();
                            vm.displayError(data.message);
                        }
                    };
                    sock.onclose = function () {
                        window.console.log("close");
                    }
                } else if (this.select === 1) {
                    // create room
                    let sock = new WebSocket("ws://localhost:8080/websocket");
                    let vm = this;
                    sock.onopen = function () {
                        sock.send(JSON.stringify({
                            command: "create",
                            token: buffer.get("auth"),
                            type: vm.type,
                            password: vm.usePassword ? vm.createPassword : ""
                        }));
                    };
                    sock.onmessage = function (e) {
                        window.console.log(e);

                        let data = JSON.parse(e.data);

                        if (data.command === "room_id") {
                            buffer.set("roomId", data.id);
                            buffer.set("sock", sock);
                            vm.$router.replace("/play/hex");
                        } else if (data.command === "error") {
                            vm.loading = false;
                            sock.close();
                            vm.displayError(data.message);
                        }
                    };
                    sock.onclose = function () {
                        window.console.log("socket close");
                    };
                }

            }
        }
    }
</script>

<style scoped>

</style>