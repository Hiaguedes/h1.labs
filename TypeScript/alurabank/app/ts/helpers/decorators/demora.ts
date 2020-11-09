export function demora(ms = 500){

    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const metodoOriginal = descriptor.value;
        let timer: NodeJS.Timer;
        descriptor.value = function(...args: any[]) {
            clearInterval(timer);
            timer = setTimeout(() => metodoOriginal.apply(this, args), ms);


        }

        return descriptor;
    }
};