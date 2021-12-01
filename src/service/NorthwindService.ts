import Filter from "sap/ui/model/Filter";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Sorter from "sap/ui/model/Sorter";
import BaseService from "./BaseService";

export type ProductEntity = {
    ID:number;
    Name:string;
    Description:string;
    ReleaseDate:Date;
    DiscontinuedDate:Date;
    Rating:number;
    Price:number;
};
export type AddressEntity = {
    Street:string;
    City:string;
    State:string;
    ZipCode:string;
    Country:string;
};
export type SuppliersEntity = {
    ID:number;
    Name:string;
    Address?:AddressEntity;
    Concurrency:number;
    Products?:{ results: Array<ProductEntity> } | Array<ProductEntity>; 
};
export type SuppliersEntitySet = { results: Array<SuppliersEntity> }; 
/**
 * @namespace be.wl.TypeScriptDemo.service
 */
export default class NorthwindService extends BaseService{
    constructor(model:ODataModel){
        super(model);
    }
    /**
     * getSuppliers
     */
    public getSuppliers() {
        return this.odata("/Suppliers").get<SuppliersEntitySet>();
    }
    
    public getSuppliersWithFilter(filters:Array<Filter>) {
        return this.odata("/Suppliers").get<SuppliersEntitySet>({filters:filters});
    }
    public getSupplierById(id:number) {
        const supplierPath = this.model.createKey("/Suppliers", {
            ID: id
        });
        return this.odata(supplierPath).get<SuppliersEntity>();
    }
    public async getSupplierNextID(){
        var mParameters = {
            sorters:[new Sorter("ID",true)],
            urlParameters:"$top=1"
        };
        const response = await this.odata("/Suppliers").get<SuppliersEntitySet>({sorters:[new Sorter("ID",true)],urlParameters:{"$top":"1"}});
        return response.data && response.data.results.length > 0 ? response.data.results[0].ID + 1:0;
    }
    public createSupplier(supplier:SuppliersEntity){
        return this.odata("/Suppliers").post<SuppliersEntity>(supplier);
    }
    public updateSupplier(supplier:SuppliersEntity){
        const supplierPath = this.model.createKey("/Suppliers", {
            ID: supplier.ID
        });
        return this.odata(supplierPath).put<SuppliersEntity>(supplier);
    }
}