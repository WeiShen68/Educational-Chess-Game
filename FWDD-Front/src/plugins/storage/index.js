class AppStorage {
    constructor() {
        this.appKey = 'vue3';
    }
    getKey(key) {
        return `${this.appKey}-${key}`;
    }
}

class LocalStorage extends AppStorage {
    constructor() {
        super();
    }
    getKey(key) {
        return `${this.appKey}-${key}`;
    }
    get(key) {
        return localStorage.getItem(this.getKey(key));
    }
    set(key, value) {
        return localStorage.setItem(this.getKey(key), value);
    }
    remove(key) {
        return localStorage.removeItem(this.getKey(key));
    }
}

class SessionStorage extends AppStorage {
    constructor() {
        super();
    }
    getKey(key) {
        return `${this.appKey}-${key}`;
    }
    get(key) {
        return sessionStorage.getItem(this.getKey(key));
    }
    set(key, value) {
        return sessionStorage.setItem(this.getKey(key), value);
    }
    remove(key) {
        return sessionStorage.removeItem(this.getKey(key));
    }
}

const data = {
    local: new LocalStorage(),
    session: new SessionStorage(),
};

export default data;