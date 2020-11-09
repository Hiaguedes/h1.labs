export function demora(ms = 500) {
    return (target, propertyKey, descriptor) => {
        const metodoOriginal = descriptor.value;
        let timer;
        descriptor.value = function (...args) {
            clearInterval(timer);
            timer = setTimeout(() => metodoOriginal.apply(this, args), ms);
        };
        return descriptor;
    };
}
;
