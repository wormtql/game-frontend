<template>
    <v-content>
        <v-container>
            <v-row>
                <v-col :cols="3">
                    <h2>{{ anotherPlayer === "" ? "等待玩家" : anotherPlayer }}</h2>
                    <p>{{ ready2 ? "已准备" : "未准备" }}</p>

                    <v-spacer></v-spacer>

                    <h2>{{ username + "(自己)" }}</h2>
                    <p>{{ ready1 ? "已准备" : "未准备" }}</p>
                    <v-btn color="primary" @click="ready" :disabled="ready1">
                        准备
                    </v-btn>
                </v-col>
                <v-col :cols="9">
                    <hex-board></hex-board>
                </v-col>
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
                sock: {}
            }
        },
        methods: {
            ready: function () {
                this.ready1 = true;
                this.sock.send(JSON.stringify({
                    command: "ready",
                    value: true
                }))
            }
        },
        created: function () {
            this.sock = buf.get("sock");

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
                }
            }
        }
    }
</script>

<style scoped>

</style>