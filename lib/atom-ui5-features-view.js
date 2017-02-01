'use babel';

import {TextEditor} from "atom";

export default class AtomUi5FeaturesView {

    constructor(serializedState) {
        // Create root element
        this.element = document.createElement("div");
        this.element.classList.add("atom-ui5-features");
		this.element.classList.add("atom-ui5-features");

		this.modelNameEditor = new TextEditor({ mini: true });
		this.stringKeyEditor = new TextEditor({ mini: true });
		this.valueEditor = new TextEditor({ mini: true });
		this.commentsEditor = new TextEditor({ mini: true });

		this.element.innerHTML = `
			<section class="section-container">
				<section calss="section-body">

					<div class="control-group">
						<div class="controls">
							<label class="control-label">
								<div class="setting-title">File path</div>
							</label>
							<select id="filePathSelect" class="form-control"></select>
						</div>
				  	</div>

				  	<div class="control-group">
						<div id="modelNameControls" class="controls">
							<label class="control-label">
								<div class="setting-title">Model Name</div>
							</label>

						</div>
				  	</div>

					<div class="control-group">
						<div id="stringKeyControls" class="controls">
							<label class="control-label">
								<div class="setting-title">String Key</div>
							</label>

						</div>
				  	</div>

					<div class="control-group">
						<div id="valueControls" class="controls">
							<label class="control-label">
								<div class="setting-title">Value</div>
							</label>

						</div>
				  	</div>

					<div class="control-group">
						<div id="typeControls" class="controls">
							<label class="control-label">
								<div class="setting-title">Type</div>
							</label>
							<select id="typeSelect" class="form-control"></select>
						</div>
				  	</div>

					<div class="control-group">
						<div id="commentsControls" class="controls">
							<label class="control-label">
								<div class="setting-title">Comments</div>
							</label>

						</div>
				  	</div>

				  	<div class="control-group">
						<button id="okBtn" class="btn">OK</button>
						<button id="cancelBtn" class="btn">Cancel</button>
				  	</div>

				</section>
			</section>
	    `;

		this.filesSelect = this.element.querySelector(".atom-ui5-features #filePathSelect");

		this.element.querySelector(".atom-ui5-features #modelNameControls")
			.appendChild(this.modelNameEditor.element);

		this.element.querySelector(".atom-ui5-features #stringKeyControls")
			.appendChild(this.stringKeyEditor.element);

		this.element.querySelector(".atom-ui5-features #valueControls")
			.appendChild(this.valueEditor.element);

		this.element.querySelector(".atom-ui5-features #commentsControls")
			.appendChild(this.commentsEditor.element);

		this.element.querySelector(".atom-ui5-features #okBtn")
			.addEventListener("click", () => {
				this._controller.extractToI18n();
				this._controller.closeI18nExtractionDialog();
			});
		this.element.querySelector(".atom-ui5-features #cancelBtn")
			.addEventListener("click", () => {
				this._controller.closeI18nExtractionDialog();
			});
    }

	setController (oController) {
		this._controller = oController;
	}

    // Returns an object that can be retrieved when package is activated
    serialize() {}

    // Tear down any state and detach
    destroy() {
        this.element.remove();
    }

    getElement() {
        return this.element;
    }

	clearFilesList() {
		this.filesSelect.textContent = "";
	}

	setFilesList(aFiles) {
		this.clearFilesList();
		aFiles.forEach( sFile => {
			const option = document.createElement("option");
			option.setAttribute("value", sFile);
			option.textContent = sFile;
			this.filesSelect.appendChild(option)
		});
	}

}
