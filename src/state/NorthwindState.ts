import Supplier from "../model/Supplier";
import NorthwindService from "../service/NorthwindService";
import BaseState from "./BaseState";

export type nwdata = {
    supplier:Supplier
};

/**
 * @namespace be.wl.TypeScriptDemo.state
 */
export default class NorthwindState extends BaseState<NorthwindService,nwdata>{
    constructor(service:NorthwindService){
        super(service);
        this.data = {
            supplier: new Supplier()
        }
    }
    /**
     * getSupplier
     */
    public async getSupplier(id:number) {
        const supplierEntity = await this.getService().getSupplierById(id);
        this.getData().supplier = new Supplier(supplierEntity.data);
        this.updateModel();
        return this.getData().supplier;
    }

    /**
     * saveSupplier
     */
    public async saveSupplier() {
        const supplier = this.getData().supplier;
        if(!supplier.isValid()){
            this.updateModel();
            throw Error("Name is not valid!");
        }
        await this.getService().updateSupplier(supplier.getJSON());

        return this.getSupplier(supplier.getId());
    }
}