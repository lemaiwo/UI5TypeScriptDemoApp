import Dialog from "sap/m/Dialog";
import Popover from "sap/m/Popover";
import UI5Element from "sap/ui/core/Element";
import Fragment from "sap/ui/core/Fragment";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import History from "sap/ui/core/routing/History";
import Router from "sap/ui/core/routing/Router";
import UIComponent from "sap/ui/core/UIComponent";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import DialogController from "./DialogController";
export type frag = {
	controller: DialogController,
	fragment: Fragment
};
type frags = Record<string, frag>;
let _fragments: frags = {};
/**
 * @namespace be.wl.TypeScriptDemo.controller
 */
export default class BaseController extends Controller {
	protected viewController: Controller;
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
	public getMainView(): View {
		return this.getView() || this.viewController.getView();
	}
	public onExit(): void {
		_fragments = {};
	}
	public async openFragment(config: { name: string, data?: unknown, popoverSource?: Popover }): Promise<unknown> {
		let viewName: string[];
		if (config.name.indexOf(".") > 0) {//full path
			viewName = config.name.split(".");
			config.name = config.name.substr(config.name.lastIndexOf(".") + 1);
		} else { //current folder
			viewName = this.getMainView().getViewName().split(".");
		}
		viewName.pop();
		const viewPath = viewName.join(".") + ".",
			controllerPath = viewPath.replace("view", "controller"),
			id = this.getMainView().getId() + "--" + config.name;
		if (!_fragments[id]) {
			let newController: Controller;
			try {
				newController = (await Controller.create({
					name: controllerPath + config.name
				}) as Controller);
			} catch (error) {
				console.log("Dialog without controller. Just continue with the current controller for the dialog")
				newController = this;
			}
			const newFragment = (await Fragment.load({
				id: id,
				name: viewPath + config.name,
				controller: newController
			}) as Fragment);
			_fragments[id] = { controller: (newController as DialogController), fragment: newFragment };
			this.getMainView().addDependent((_fragments[id].fragment as unknown as UI5Element));
		}
		const closedPromise = new Promise((resolve, reject) => {
			if (_fragments[id].controller && (_fragments[id].controller as Controller) !== this) {
				if ("onBeforeShow" in _fragments[id].controller) {
					_fragments[id].controller.onBeforeShow(this, _fragments[id], resolve, config.data, config.popoverSource);
				}
			}
		});
		if (config.popoverSource) {
			(_fragments[id].fragment as unknown as Popover).openBy(config.popoverSource, false);
		} else {
			(_fragments[id].fragment as Dialog).open();
		}
		return closedPromise;//_fragments[id].fragment;
	}
}
