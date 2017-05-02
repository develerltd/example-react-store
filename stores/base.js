export default class StoreBase {
    constructor() {
        this.connections = [];
        if (this.setDefaultState) {
            this.state = this.setDefaultState();
        } else {
            this.state = {};
        }

        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.update = this.update.bind(this);
        this.callUpdateFn = this.callUpdateFn.bind(this);
        //optional peristent load code could go here
    }

    // connect to the store
    connect (UpdateFn, initialRun = true) {
        this.connections.push(UpdateFn);
        if (initialRun) {
            this.callUpdateFn(UpdateFn);
        }
    }

    // disconnect from the store
    disconnect (UpdateFn) {
        this.connections = this.connections.filter(item => item !== UpdateFn);
    }

    // called internally by any store's functions
    update (state, updateCallbacks = true) {
        this.state = state;

        // optional persistent save code could go here
        if (updateCallbacks) {
            this.connections.map((item) => {
                this.callUpdateFn(item);
            });
        }
    }

    callUpdateFn (fn) {
        fn(this, this.state);
    }
}
