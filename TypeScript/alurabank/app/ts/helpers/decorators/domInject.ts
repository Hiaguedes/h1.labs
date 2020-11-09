export function domInject(selector: string){

    return (target: any, key: string) => {
        let elemento: Element;

        const getter = () => {
            if(!elemento){
                elemento = document.querySelector(selector)!;
            }
            return elemento;
        }

        Object.defineProperty(target, key, {
            get: getter
        });

    }
};