import Object from "sap/ui/base/Object";
import JSONModel from "sap/ui/model/json/JSONModel";
import BaseService from "../service/BaseService";

/**
 * @namespace be.wl.TypeScriptDemo.state
 */
export default abstract class BaseState<T extends BaseService,R extends object> extends Object {
    protected service: T;
    protected data: R;
    private model: JSONModel;
    constructor(service:T) {
        super();        
        this.service = service;
    }
    public getModel(): JSONModel {
        if (!this.model) {
            this.model = new JSONModel(this.data)
        }
        return this.model;
    }
    public updateModel(hardRefresh?: boolean): void {
        if (this.model) {
            this.model.refresh(hardRefresh ? true : false);
        }
    }
    protected getService(): T {
        return this.service;
    }
    protected getData(): R {
        return this.data;
    }
}