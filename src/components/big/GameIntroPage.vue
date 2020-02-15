<template>
    <v-content style="padding: 64px 300px">
        <v-btn color="primary" text @click="toHome">
            <v-icon>mdi-keyboard-backspace</v-icon>
            返回
        </v-btn>
        <component :is="comp" class="mb-4 mt-4"></component>
        <v-btn color="primary" @click="beginGame">
            开始游戏
        </v-btn>
    </v-content>
</template>

<script>
    import HexIntro from "@/components/big/intro/HexIntro";
    import buffer from "@/buf";

    export default {
        name: "GameIntroPage",
        components: {
            HexIntro
        },
        data: function () {
            return {
                type: "",
                comp: "",
            }
        },
        created: function () {
            this.type = this.$route.params.type;
            this.comp = this.type.charAt(0).toUpperCase() + this.type.slice(1) + "Intro";
        },
        methods: {
            beginGame: function () {
                if (!buffer.containsKey("auth")) {
                    this.$router.push({
                        name: "los",
                        params: {
                            redirect: "/intro/" + this.type
                        }
                    })
                } else {
                    this.$router.replace({
                        name: "starting",
                        params: {
                            type: this.type
                        }
                    })
                }
            },

            toHome: function () {
                this.$router.replace("/");
            }
        }
    }
</script>

<style scoped>

</style>