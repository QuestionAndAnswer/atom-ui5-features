'use babel';

import AtomUi5FeaturesView from './atom-ui5-features-view';
import * as find from "find";
import {shell} from "electron";
import * as i18nTypesData from "./i18n-types-data";
import * as fs from "fs";

import {
	CompositeDisposable
} from 'atom';

export default {

	atomUi5FeaturesView: null,
	modalPanel: null,
	subscriptions: null,

	activate(state) {
		this.atomUi5FeaturesView = new AtomUi5FeaturesView(state.atomUi5FeaturesViewState);
		this.atomUi5FeaturesView.setController(this);
		this.modalPanel = atom.workspace.addModalPanel({
			item: this.atomUi5FeaturesView.getElement(),
			visible: false
		});

		// Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
		this.subscriptions = new CompositeDisposable();

		// Register command that toggles this view
		this.subscriptions.add(atom.commands.add('atom-text-editor', {
			"atom-ui5-features:openExtractToI18nDialog": () => this.openExtractToI18nDialog(),
			"atom-ui5-features:findOnHana": () => this.findOnHana(),
			"atom-ui5-features:findOnExplored": () => this.findOnExplored()
		}));
	},

	deactivate() {
		this.modalPanel.destroy();
		this.subscriptions.dispose();
		this.atomUi5FeaturesView.destroy();
	},

	serialize() {
		return {
			atomUi5FeaturesViewState: this.atomUi5FeaturesView.serialize()
		};
	},

	extractToI18n(oExtractionData) {
		let editor = atom.workspace.getActiveTextEditor();

		//replacing current selection
		editor.insertText("{" + oExtractionData.modelName + ">" + oExtractionData.stringKey + "}");

		//writing to i18n
		let sToWrite = "";
		if(oExtractionData.comments) {
			sToWrite += "#" + oExtractionData.comments + "\r\n";
		}
		sToWrite += oExtractionData.stringKey + "=" + oExtractionData.value;

		fs.writeFile(oExtractionData.filePath, sToWrite, { flag: "a" });
	},

	_populateView() {
		atom.project.getDirectories()
			.forEach( (rootDir) => {
				find.file(/.+\.properties/g, rootDir.getPath(), (files) => {
					this.atomUi5FeaturesView.setFilesList(files);
				});
			});

		this.atomUi5FeaturesView.modelNameEditor.setText("i18n");

		let sCurrentSelection = this._getCurrentSelection();
		this.atomUi5FeaturesView.valueEditor.setText(sCurrentSelection);

		this.atomUi5FeaturesView.setTypesList(i18nTypesData.data);
	},

	openExtractToI18nDialog() {
		this.atomUi5FeaturesView.clear();
		this._populateView();
		this.modalPanel.show();
		this.atomUi5FeaturesView.focus();
	},

	closeI18nExtractionDialog() {
		this.modalPanel.hide();
	},

	_getCurrentSelection() {
		const editor = atom.workspace.getActiveTextEditor();

		if(!editor) {
			return;
		}

		return editor.getSelectedText() || "";
	},

	findOnHana() {
		const text = this._getCurrentSelection();
		if(text) {
			const link = "https://sapui5.hana.ondemand.com/search.html?q=" + encodeURIComponent(text);
			shell.openExternal(link);
		}
	},

	findOnExplored() {
		const text = this._getCurrentSelection();
		if(text) {
			const link = "https://sapui5.hana.ondemand.com/explored.html#/entity/" + text + "/samples";
			shell.openExternal(link);
		} else {

		}
	}

};
