class Buffer {
    constructor() {
        this.buf = {}
    }

    get(k) {
        return this.buf[k];
    }

    set(k, v) {
        this.buf[k] = v;
    }

    containsKey(k) {
        return this.buf[k] !== undefined
    }

    remove(k) {
        this.buf[k] = undefined;
    }
}

export default new Buffer();