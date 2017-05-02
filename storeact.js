import {Component} from 'react';

export default class Storeact extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.stores = [];

        // wrap the optional mount / unmount functions with stores
        this.componentWillMount = doMount.bind(this)(this.componentWillMount);
        this.componentWillUnmount = doUnmount.bind(this)(this.componentWillUnmount);
    }

    bindStores(stores) {
        this.stores = stores;
    }
}

function doMount(callAfter) {
    return () => {
        if (this.UpdateStore) {
            this.UpdateStore = this.UpdateStore.bind(this);
            this.stores.map((item) => {
                item.connect(this.UpdateStore);
            });
        }
        if (callAfter) {
            callAfter.bind(this)();
        }
    }
}

function doUnmount(callAfter) {
    return () => {
        if (this.UpdateStore) {
            this.stores.map((item) => {
                item.disconnect(this.UpdateStore);
            });
        }
        if (callAfter) {
            callAfter.bind(this)();
        }
    }
}
