<template>
    <v-content>
        <v-snackbar v-model="showSnackbar">
            {{ snackbarText }}
        </v-snackbar>
        <div style="position: fixed; left: 64px; top: 64px">
            <h2 :style="style2">{{ anotherPlayer === "" ? "等待玩家" : anotherPlayer }}</h2>
            <span>{{ ready2 ? "已准备" : "未准备" }}</span>
        </div>
        <div style="position: fixed; left: 64px; bottom: 64px">
            <h2 :style="style1">{{ username + "(自己)" }}</h2>
            <span>{{ ready1 ? "已准备" : "未准备" }}</span>
        </div>
        <div style="position: fixed; right: 64px; top: 64px" class="myclass">
            <h2 style="color: gray">房间号:{{ roomId }}</h2>

        </div>
        <div style="position: fixed; bottom: 64px; left: 50%; transform: translateX(-50%)">
            <v-btn color="primary" text :disabled="!enabledExit" @click="onExit">
                <v-icon>mdi-exit-to-app</v-icon>
                退出
            </v-btn>
            <v-btn color="primary" text :disabled="!enabledSurrender" @click="onSurrender">
                <v-icon>mdi-flag</v-icon>
                投降
            </v-btn>
            <v-btn color="primary" text @click="ready" :disabled="!enabledReady">
                <v-icon>mdi-check</v-icon>
                准备
            </v-btn>
        </div>
        <div v-show="gameOverMessage !== ''"
             style="position: fixed; top: 64px; left: 50%; transform: translateX(-50%)"
        >
            <h2>{{ gameOverMessage === "win" ? "你赢了" : "你输了" }}</h2>
        </div>
        <v-container class="fill-height" fluid>

            <v-row class="fill-height" align="center" justify="center" no-gutters>
<!--                <v-col :cols="9">-->
                    <hex-board :enabled="enabled" :single="role" ref="board" @play="onPlay"></hex-board>
<!--                </v-col>-->
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
    import HexBoard from "@/components/board/HexBoard";
    import buf from "@/buf";
    export default {
        name: "HexPlay",
        components: {HexBoard},
        data: function () {
            return {
                anotherPlayer: "",
                ready1: false,
                ready2: false,
                username: buf.get("username"),

                sock: {},

                enabled: false,
                role: 1,

                showSnackbar: false,
                snackbarText: "",

                started: false,

                roomId: 0,

                gameOverMessage: "",

                enabledExit: true,
                enabledSurrender: false,
                enabledReady: true
            }
        },
        methods: {
            onPlay: function (i, j) {
                if (this.enabled) {
                    if (this.sock) {
                        this.sock.send(JSON.stringify({
                            command: "play",
                            play: {
                                x: i,
                                y: j,
                                role: this.role
                            }
                        }));
                        this.enabled = false;
                    }
                }
            },
            onExit: function () {
                if (this.sock) {
                    this.sock.close();
                }
                this.$router.replace("/");
            },
            onSurrender: function () {
                if (this.sock) {
                    this.sock.send(JSON.stringify({
                        command: "surrender",
                        role: this.role,
                    }));
                }
                this.gameOverMessage = "lose";
                this.gameOverCleanUp();
            },
            displaySnackbar: function (message) {
                this.snackbarText = message;
                this.showSnackbar = true;
                setTimeout(() => {
                    this.showSnackbar = false;
                }, 3000);
            },
            ready: function () {
                this.ready1 = true;
                if (this.sock) {
                    this.sock.send(JSON.stringify({
                        command: "ready",
                        value: true
                    }));
                }

                this.enabledReady = false;
            },
            gameOverCleanUp: function () {
                this.enabled = false;
                this.enabledExit = true;
                this.enabledReady = true;
                this.enabledSurrender = false;
                this.ready1 = false;
                this.ready2 = false;
            }
        },
        computed: {
            style1: function () {
                return {
                    color: this.role === 1 ? "red" : "blue"
                };
            },
            style2: function () {
                return {
                    color: this.role === 1 ? "blue" : "red"
                };
            }
        },
        created: function () {
            this.sock = buf.get("sock");

            if (!this.sock) {
                return;
            }

            this.roomId = buf.get("roomId");

            this.sock.onmessage = (e) => {
                let data = JSON.parse(e.data);

                window.console.log(e);

                if (data.command === "update") {
                    this.anotherPlayer = "";
                    for (let i = 0; i < data.data.length; i++) {
                        let user = data.data[i];
                        if (user.name !== this.username) {
                            this.anotherPlayer = user.name;
                            this.ready2 = user.status;
                        }
                    }
                } else if (data.command === "start") {
                    this.started = true;
                    this.displaySnackbar("游戏开始");
                    this.role = data.role;
                    this.enabledExit = false;
                    this.enabledSurrender = true;
                    this.gameOverMessage = "";
                    this.$refs["board"].clear();
                } else if (data.command === "your_turn") {
                    this.enabled = true;
                } else if (data.command === "play") {
                    let x = data.play.x;
                    let y = data.play.y;
                    let oppo_role = data.play.role;

                    this.$refs["board"].setGrid(x, y, oppo_role);
                } else if (data.command === "over") {
                    if (data.role === this.role) {
                        this.gameOverMessage = "win";
                    } else {
                        this.gameOverMessage = "lose";
                    }
                    this.gameOverCleanUp();
                }
            }
        }
    }
</script>

<style scoped>
    .myclass {
        background: #00000011;
        padding: 8px 16px;
        /*height: 300px;*/
        width: 200px;
    }
</style>