<template>
    <div>
        <svg :width="totalWidth" :height="totalHeight">
            <template v-for="i in size">
                <polygon v-for="j in size"
                         :points="pointsOfOrigin(...origin(i - 1, j - 1))"
                         :key="'pg' + i + '-' + j"
                         stroke="red"
                         class="grid"
                         :fill="gridColor(i - 1, j - 1)"
                         @mouseenter="$set(hover[i - 1], j - 1, true)"
                         @mouseleave="$set(hover[i - 1], j - 1, false)"
                         @click="play(i - 1, j - 1)"
                >
                </polygon>
            </template>

            <polyline :points="linePointsRed1"
                      :stroke="redColor"
                      fill="none"
                      stroke-width="5"
            ></polyline>
            <polyline :points="linePointsRed2"
                      :stroke="redColor"
                      fill="none"
                      stroke-width="5"
            ></polyline>
            <polyline :points="linePointsBlue1"
                      :stroke="blueColor"
                      fill="none"
                      stroke-width="5"
            ></polyline>
            <polyline :points="linePointsBlue2"
                      :stroke="blueColor"
                      fill="none"
                      stroke-width="5"
            ></polyline>
        </svg>

    </div>
</template>

<script>
    export default {
        name: "HexBoard",
        props: {
            size: {
                type: Number,
                default: 11
            },
            r: {
                type: Number,
                default: 20
            },
            value: {
                type: Array,
                default: function () {
                    return Array.apply(null, { length: this.size }).map(() => {
                        return Array.apply(null, { length: this.size }).map(() => {
                            return 0;
                        })
                    });
                }
            }
        },
        data: function () {
            return {
                state: Array.apply(null, { length: this.size }).map(() => {
                    return Array.apply(null, { length: this.size }).map(() => {
                        return 0;
                    })
                }),
                hover: Array.apply(null, { length: this.size }).map(() => {
                    return Array.apply(null, { length: this.size }).map(() => {
                        return false;
                    })
                }),
                redColor: "#ff123455",
                blueColor: "#1234ff55",
                toPlay: 1,
            }
        },
        methods: {
            origin: function (i, j) {
                // i -= 1;
                // j -= 1;
                let originX = (1.5 * i + 1) * this.r + 24;
                let originY = this.totalHeight / 2 + 0.866 * i * this.r;

                return [
                    originX + 1.5 * j * this.r,
                    originY - 0.866 * j * this.r
                ];
            },
            pointsOfOrigin: function (x, y) {
                let r2 = this.r / 2;
                let r3 = this.r * 0.866;
                let ret = "";
                ret += `${x - this.r} ${y},`;
                ret += `${x - r2} ${y - r3},`;
                ret += `${x + r2} ${y - r3},`;
                ret += `${x + this.r} ${y},`;
                ret += `${x + r2} ${y + r3},`;
                ret += `${x - r2} ${y + r3}`;

                return ret;
            },
            gridColor: function (i, j) {
                if (this.state[i][j] === 1) {
                    return this.redColor;
                } else if (this.state[i][j] === 2) {
                    return this.blueColor;
                } else {
                    if (this.hover[i][j]) {
                        return this.toPlay === 1 ? this.redColor : this.blueColor
                    } else {
                        return "white";
                    }
                }
            },
            play: function (i, j) {
                if (this.state[i][j] === 0) {
                    this.$set(this.state[i], j, this.toPlay);
                    this.toPlay = 3 - this.toPlay;
                }
            }
        },
        computed: {
            totalHeight: function () {
                return this.size * 2 * this.r * 0.866 + 48;
            },
            totalWidth: function () {
                return (3 * this.size - 1) * this.r + 48;
            },
            linePointsRed1: function () {
                let y = this.totalHeight / 2;
                let x = 24;
                let ret = "";
                for (let i = 0; i < this.size; i++) {
                    ret += `${(1.5 * i) * this.r + x} ${y - 0.866 * i * this.r},`;
                    ret += `${(1.5 * i + 0.5) * this.r + x} ${y - 0.866 * (i + 1) * this.r},`;
                }
                ret += `${(1.5 * this.size - 0.5) * this.r + x} ${y - 0.866 * this.size * this.r}`;
                return ret;
            },
            linePointsRed2: function () {
                let x = this.totalWidth - 24;
                let y = this.totalHeight / 2;
                let ret = "";
                for (let i = 0; i < this.size; i++) {
                    ret += `${x - (1.5 * i) * this.r} ${y + 0.866 * i * this.r},`;
                    ret += `${x - (1.5 * i + 0.5) * this.r} ${y + 0.866 * (i + 1) * this.r},`;
                }
                ret += `${x - (1.5 * this.size - 0.5) * this.r} ${y + 0.866 * this.size * this.r}`;
                return ret;
            },
            linePointsBlue1: function () {
                let y = this.totalHeight / 2;
                let x = 24;
                let ret = "";
                for (let i = 0; i < this.size; i++) {
                    ret += `${(1.5 * i) * this.r + x} ${y + 0.866 * i * this.r},`;
                    ret += `${(1.5 * i + 0.5) * this.r + x} ${y + 0.866 * (i + 1) * this.r},`;
                }
                ret += `${(1.5 * this.size - 0.5) * this.r + x} ${y + 0.866 * this.size * this.r}`;
                return ret;
            },
            linePointsBlue2: function () {
                let x = this.totalWidth - 24;
                let y = this.totalHeight / 2;
                let ret = "";
                for (let i = 0; i < this.size; i++) {
                    ret += `${x - (1.5 * i) * this.r} ${y - 0.866 * i * this.r},`;
                    ret += `${x - (1.5 * i + 0.5) * this.r} ${y - 0.866 * (i + 1) * this.r},`;
                }
                ret += `${x - (1.5 * this.size - 0.5) * this.r} ${y - 0.866 * this.size * this.r}`;
                return ret;
            }
        }
    }
</script>

<style scoped>
    .grid {
        stroke: #00000022;
        cursor: pointer;
    }
</style>