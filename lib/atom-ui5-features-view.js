'use babel';

export default class AtomUi5FeaturesView {

    constructor(serializedState) {
        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('atom-ui5-features');

        // Create message element
        const message = document.createElement('div');
        message.textContent = 'The AtomUi5Features package is Alive! It\'s ALIVE!';
        message.classList.add('message');


		const filesContainer = document.createElement("div");
		const filesSelectLabel = document.createElement("label");
		filesSelectLabel.textContent = "File path";
		this.filesSelect = document.createElement("select");

		filesContainer.appendChild(filesSelectLabel);
		filesContainer.appendChild(this.filesSelect);


		const buttonsContainer = document.createElement("div");
		const okButton = document.createElement("button");
		okButton.textContent = "OK";
		okButton.classList.add("btn");
		okButton.addEventListener("click", () => {
			this._controller.extractToI18n();
			this._controller.closeI18nExtractionDialog();
		})
		const cancelButton = document.createElement("button");
		cancelButton.textContent = "Cancel";
		cancelButton.classList.add("btn");
		cancelButton.addEventListener("click", () => {
			this._controller.closeI18nExtractionDialog();
		})

		buttonsContainer.appendChild(okButton);
		buttonsContainer.appendChild(cancelButton);

		


        this.element.appendChild(message);
		this.element.appendChild(filesContainer);
		this.element.appendChild(buttonsContainer);
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
		aFiles.forEach( oFile => {
			const option = document.createElement("option");
			option.value.setAttribute("value", oFile.key);
			option.textContent = oFile.text;
			this.filesSelect.appendChild(option)
		});
	}

}
