export function tempoExecucao(){

    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[]) {
            console.log(`parametros passos no método ${propertyKey}: ${JSON.stringify(args)}`);
            const t1= performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`O retorno é ${JSON.stringify(retorno)}`);
            console.log(`O método ${propertyKey} demorou ${t2-t1} ms para ser executado`)
            return retorno;
        }

        return descriptor;
    }
};