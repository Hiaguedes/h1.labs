export function domInject(selector) {
    return (target, key) => {
        let elemento;
        const getter = () => {
            if (!elemento) {
                elemento = document.querySelector(selector);
            }
            return elemento;
        };
        Object.defineProperty(target, key, {
            get: getter
        });
    };
}
;
