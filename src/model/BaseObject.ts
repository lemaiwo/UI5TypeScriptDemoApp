import Object from "sap/ui/base/Object";
/**
 * @namespace be.wl.TypeScriptDemo.model
 */
export default abstract class BaseObject<T> extends Object {
    private busy = false;
    constructor() {
        super();
        this.busy = false;
    }

    public setBusy(busy: boolean): void {
        this.busy = busy;
    }
    public zeroPad(num: number, places: number): string {
        const zero = places - num.toString().length + 1;
        return `${Array(+(zero > 0 && zero)).join("0")}${num}`;
    }
    public abstract getJSON():T;
}