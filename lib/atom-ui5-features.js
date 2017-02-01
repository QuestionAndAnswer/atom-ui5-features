'use babel';

import AtomUi5FeaturesView from './atom-ui5-features-view';
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
			'atom-ui5-features:openExtractToI18nDialog': () => this.openExtractToI18nDialog()
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

	extractToI18n() {
		let editor = atom.workspace.getActiveTextEditor();
		let selection = editor.getSelectedText();

		editor.insertText("{i18n>" + selection + "}");
	},

	openExtractToI18nDialog() {
		this.modalPanel.show();
	},

	closeI18nExtractionDialog() {
		this.modalPanel.hide();
	},

};
