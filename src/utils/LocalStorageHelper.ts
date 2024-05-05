export function removeLocalStoreItem(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        // pass
    }
}

export function getLocalStoreItem(key: string, defaultValue: string | null = null): string | null {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        // pass
    }
    return defaultValue;
}

export function setLocalStoreItem(key: string, value: string | null): void {
    try {
        if (value === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, value);
        }
    } catch (e) {
        // pass
    }
}
