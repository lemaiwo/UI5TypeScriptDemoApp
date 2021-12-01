import { AddressEntity } from "../service/NorthwindService";
import BaseObject from "./BaseObject";
/**
 * @namespace be.wl.TypeScriptDemo.model
 */
export default class Address extends BaseObject<AddressEntity>{
    private street:string;
    private city:string;
    private state:string;
    private zipCode:string;
    private country:string;
    constructor(data?:AddressEntity){
        super();
        if(data){
            this.street = data.Street;
            this.city = data.City;
            this.state = data.State;
            this.zipCode = data.ZipCode;
            this.country = data.Country;
        }
    }
    public getJSON(): AddressEntity {
        return{
            City:this.city,
            State:this.state,
            Country:this.country,
            Street:this.street,
            ZipCode:this.zipCode
        };
    }
}