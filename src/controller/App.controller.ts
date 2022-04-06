import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";
import BusyIndicator from "sap/ui/core/BusyIndicator";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import AppComponent from "../Component";
import NorthwindService, { SuppliersEntity } from "../service/NorthwindService";
import NorthwindState from "../state/NorthwindState";
import BaseController from "./BaseController";

/**
 * @namespace be.wl.TypeScriptDemo.controller
 */
export default class AppController extends BaseController {
	private northwindState: NorthwindState;

	public onInit(): void {
		// apply content density mode to root view
		this.getView().addStyleClass((this.getOwnerComponent() as AppComponent).getContentDensityClass());

		this.northwindState = (this.getOwnerComponent() as AppComponent).northwindState;
		this.setModel(this.northwindState.getModel(), "state");

		this.northwindState.getSupplier(0);
	}

	public sayHello(): void {
		MessageBox.show("Hello World!");
	}
	public async openDialog(): Promise<void> {
		const closeResult = (await this.openFragment({
			name: "be.wl.TypeScriptDemo.view.dialog.About",
			data: { param: "demo dialog" }
		}) as string);
		MessageToast.show(closeResult);
	}

	public async onSaveSupplier() {
		BusyIndicator.show(0);
		try {
			await this.northwindState.saveSupplier();
		} catch (error) {
			let e = (error as Error);
			if(e.message !== undefined){
				MessageBox.show(e.message);
			}
			console.error(error);
		} finally {
			BusyIndicator.hide();
		}
	}
}