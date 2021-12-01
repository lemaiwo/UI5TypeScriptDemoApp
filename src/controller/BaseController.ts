import Controller from "sap/ui/core/mvc/Controller";
import History from "sap/ui/core/routing/History";
import Router from "sap/ui/core/routing/Router";
import UIComponent from "sap/ui/core/UIComponent";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace be.wl.TypeScriptDemo.controller
 */
export default class BaseController extends Controller {
    /**
     * getRouter
     */
    public getRouter() {
        return (this.getOwnerComponent() as UIComponent).getRouter();
    }
    /**
     * getModel
     */
    public getModel(name?: string) {
        return this.getView().getModel(name);
    }
    /**
     * name
     */
    public setModel(model: Model, name?: string) {
        return this.getView().setModel(model, name);
    }
    /**
     * getResourceBundle
     */
    public getResourceBundle() {
        return ((this.getOwnerComponent() as UIComponent).getModel("i18n") as ResourceModel).getResourceBundle();
    }
    /**
     * onNavBack
     */
    public onNavBack() {

        var sPreviousHash = History.getInstance().getPreviousHash();

        if (sPreviousHash !== undefined) {
            // eslint-disable-next-line sap-no-history-manipulation
            history.go(-1);
        } else {
            this.getRouter().navTo("master", {}, {}, true);
        }
    }
}
